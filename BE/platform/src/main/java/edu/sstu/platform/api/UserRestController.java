package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.UserRequestDto;
import edu.sstu.platform.dto.response.UserInfoResponseDto;
import edu.sstu.platform.service.UserPrincipalService;
import edu.sstu.platform.service.UserService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
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
}
