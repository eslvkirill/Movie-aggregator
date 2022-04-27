package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.model.User;
import org.mapstruct.Mapper;

@Mapper(uses = {RoleMapper.class})
public interface UserMapper {

  UserInfoResponseDto toInfoDto(User user);
}
