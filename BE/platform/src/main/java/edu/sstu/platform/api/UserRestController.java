package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.dto.request.UserRoleManagementRequestDto;
import edu.sstu.platform.dto.response.RatingHistoryItemResponseDto;
import edu.sstu.platform.dto.response.RoleManagementUserSummaryResponseDto;
import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.service.RatingService;
import edu.sstu.platform.service.UserPrincipalService;
import edu.sstu.platform.service.UserService;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserRestController {

  private final UserService userService;
  private final RatingService ratingService;
  private final UserPrincipalService userPrincipalService;

  @GetMapping("/info")
  public UserInfoResponseDto getUserInfo() {
    return userService.findUserInfo(userPrincipalService.getCurrentUserOrElseThrow().getId());
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public void createUser(@RequestBody @Valid UserRequestDto userRequestDto) {
    userService.createUser(userRequestDto);
  }

  @PostMapping("/{id}/roles")
  @PreAuthorize("hasRole('ADMIN')")
  public void manageRole(@PathVariable UUID id, @RequestBody @Valid UserRoleManagementRequestDto dto) {
    userService.manageRole(id, dto);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public RoleManagementUserSummaryResponseDto getUserById(@PathVariable UUID id) {
    return userService.findUserById(id);
  }

  @GetMapping("/{id}/ratings")
  public List<RatingHistoryItemResponseDto> getUserRatingHistory(@PathVariable UUID id) {
    return ratingService.findUserRatingHistory(id);
  }
}
