package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.model.Role;
import edu.sstu.platform.model.User;
import edu.sstu.platform.model.UserRole;
import java.util.Set;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(uses = {RoleMapper.class}, imports = {Set.class, Role.class, UserRole.class})
public interface UserMapper {

  UserInfoResponseDto toInfoDto(User user);

  @Mappings({
      @Mapping(target = "active", constant = "true"),
      @Mapping(target = "roles", expression = "java(Set.of(new Role(UserRole.USER)))"),
      @Mapping(target = "id", ignore = true)
  })
  User toEntity(UserRequestDto userRequestDto);
}
