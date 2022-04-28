package edu.sstu.platform.service;

import static edu.sstu.platform.util.QuerydslUtils.preparePaths;

import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.mapper.UserMapper;
import edu.sstu.platform.model.QUser;
import edu.sstu.platform.repo.UserRepo;
import edu.sstu.platform.validator.UserValidator;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserPrincipalService userPrincipalService;
  private final UserRepo userRepo;
  private final UserMapper userMapper;
  private final UserValidator userValidator;
  private final QUser qUser = QUser.user;

  @Transactional(readOnly = true)
  public UserInfoResponseDto findUserInfo(UUID id) {
    var user = userRepo.findBy(qUser.id.eq(id), ffq -> ffq.project(preparePaths(qUser.roles)).all().get(0));

    return userMapper.toInfoDto(user);
  }

  @Transactional
  public void createUser(UserRequestDto userRequestDto) {
    userValidator.validate(userRequestDto);

    var user = userMapper.toEntity(userRequestDto);
    var rawPassword = user.getPassword();

    user.setPassword(userPrincipalService.encryptPassword(rawPassword));
    userRepo.save(user);
    userPrincipalService.autoLogin(user, rawPassword);
  }
}
