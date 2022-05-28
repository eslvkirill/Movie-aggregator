package edu.sstu.platform.service;

import static edu.sstu.platform.util.QuerydslUtils.toDotPath;

import edu.sstu.platform.exception.AnonymousException;
import edu.sstu.platform.model.QUser;
import edu.sstu.platform.model.User;
import edu.sstu.platform.repo.UserRepo;
import java.util.Optional;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserPrincipalService implements UserDetailsService {

  private final UserRepo userRepo;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final QUser qUser = QUser.user;

  public UserPrincipalService(UserRepo userRepo, PasswordEncoder passwordEncoder,
      @Lazy AuthenticationManager authenticationManager) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
  }

  @Override
  @SneakyThrows
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String login) {
    var predicate = qUser.email.eq(login)
        .or(qUser.username.eq(login));

    return userRepo.findBy(predicate, query -> query.project(toDotPath(qUser.roles)).stream().findFirst())
        .orElseThrow(() -> new UsernameNotFoundException("Couldn't find user by login: " + login));
  }

  public User getCurrentUserOrElseThrow() {
    return getCurrentUser()
        .orElseThrow(AnonymousException::new);
  }

  private Optional<User> getCurrentUser() {
    return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
        .map(Authentication::getPrincipal)
        .filter(User.class::isInstance)
        .map(User.class::cast);
  }

  public User getCurrentUserOrElse() {
    return getCurrentUser()
        .orElseGet(User::new);
  }

  public String encryptPassword(String rawPassword) {
    return passwordEncoder.encode(rawPassword);
  }

  public void autoLogin(User user, String rawPassword) {
    var authToken = new UsernamePasswordAuthenticationToken(user, rawPassword, user.getAuthorities());

    authenticationManager.authenticate(authToken);
    SecurityContextHolder.getContext().setAuthentication(authToken);
  }
}
