package edu.sstu.platform.service;

import static edu.sstu.platform.util.QuerydslUtils.toDotPath;

import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.mapper.CategoryMapper;
import edu.sstu.platform.mapper.UserMapper;
import edu.sstu.platform.model.QUser;
import edu.sstu.platform.repo.UserRepo;
import edu.sstu.platform.validator.UserValidator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserPrincipalService userPrincipalService;
  private final UserRepo userRepo;
  private final UserMapper userMapper;
  private final CategoryMapper categoryMapper;
  private final UserValidator userValidator;
  private final QUser qUser = QUser.user;

  @Value("${app.default-categories}")
  private List<String> defaultCategories;

  @Transactional(readOnly = true)
  public UserInfoResponseDto findUserInfo(UUID id) {
    var user = userRepo.findBy(qUser.id.eq(id), ffq -> ffq.project(toDotPath(qUser.roles))
        .stream()
        .findFirst()
        .orElseThrow(() -> entityNotFoundException(id)));

    return userMapper.toInfoDto(user);
  }

  private EntityNotFoundException entityNotFoundException(UUID id) {
    return new EntityNotFoundException("User by id: " + id + " doesn't exist");
  }

  @Transactional
  public void createUser(UserRequestDto userRequestDto) {
    userValidator.validate(userRequestDto);

    var user = userMapper.toEntity(userRequestDto);
    var rawPassword = user.getPassword();

    user.setPassword(userPrincipalService.encryptPassword(rawPassword));
    userRepo.save(user);

    var categories = defaultCategories.stream()
        .map(categoryName -> categoryMapper.toEntity(categoryName, user.getId()))
        .collect(Collectors.toSet());

    user.setCategories(categories);
    userPrincipalService.autoLogin(user, rawPassword);
  }
}
