package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.dto.response.UserSearchBasicResultResponseDto;
import edu.sstu.platform.dto.response.RoleManagementUserSummaryResponseDto;
import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.model.User;
import edu.sstu.platform.model.UserRole;
import java.util.List;
import java.util.Set;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(imports = {Set.class, UserRole.class})
public interface UserMapper {

  UserInfoResponseDto toInfoDto(User user);

  @Mappings({
      @Mapping(target = "active", constant = "true"),
      @Mapping(target = "roles", expression = "java(Set.of(UserRole.USER))"),
      @Mapping(target = "id", ignore = true)
  })
  User toEntity(UserRequestDto userRequestDto);

  UserSearchBasicResultResponseDto toSearchBasicResultDto(User user);

  List<UserSearchBasicResultResponseDto> toSearchBasicResultDto(List<User> users);

  RoleManagementUserSummaryResponseDto toRoleManagementSummaryDto(User user);
}
