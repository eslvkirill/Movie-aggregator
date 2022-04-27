package edu.sstu.platform.service;

import static edu.sstu.platform.util.QuerydslUtils.preparePaths;

import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.mapper.UserMapper;
import edu.sstu.platform.model.QUser;
import edu.sstu.platform.repo.UserRepo;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepo userRepo;
  private final UserMapper userMapper;
  private final QUser qUser = QUser.user;

  @Transactional(readOnly = true)
  public UserInfoResponseDto findUserInfo(UUID id) {
    var user = userRepo.findBy(qUser.id.eq(id), ffq -> ffq.project(preparePaths(qUser.roles)).all().get(0));

    return userMapper.toInfoDto(user);
  }
}
