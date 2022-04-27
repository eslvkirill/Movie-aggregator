package edu.sstu.platform.service;

import static edu.sstu.platform.util.QuerydslUtils.preparePaths;

import edu.sstu.platform.exception.AnonymousException;
import edu.sstu.platform.model.QUser;
import edu.sstu.platform.model.User;
import edu.sstu.platform.repo.UserRepo;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserPrincipalService implements UserDetailsService {

  private final UserRepo userRepo;
  private final QUser qUser = QUser.user;

  @Override
  @SneakyThrows
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String login) {
    var predicate = qUser.email.eq(login)
        .or(qUser.username.eq(login));

    return userRepo.findBy(predicate, ffq -> ffq.project(preparePaths(qUser.roles)).stream().findFirst())
        .orElseThrow(() -> new UsernameNotFoundException("Couldn't find user by login: " + login));
  }

  public User getCurrentUser() {
    return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
        .map(Authentication::getPrincipal)
        .filter(User.class::isInstance)
        .map(User.class::cast)
        .orElseThrow(AnonymousException::new);
  }
}
