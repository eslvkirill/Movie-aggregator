package edu.sstu.platform.api;

import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.service.UserPrincipalService;
import edu.sstu.platform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserRestController {

  private final UserService userService;
  private final UserPrincipalService userPrincipalService;

  @GetMapping("/info")
  public UserInfoResponseDto getUserInfo() {
    return userService.findUserInfo(userPrincipalService.getCurrentUser().getId());
  }
}
