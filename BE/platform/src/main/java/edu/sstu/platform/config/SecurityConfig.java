package edu.sstu.platform.config;

import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  @SneakyThrows
  protected void configure(HttpSecurity http) {
    http
        .csrf()
        .disable()
        .exceptionHandling()
        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
        .and()
        .formLogin()
        .usernameParameter("login")
        .successHandler((request, response, authentication) -> {})
        .failureHandler((request, response, ex) -> response
            .sendError(HttpStatus.NOT_FOUND.value(), ex.getMessage()))
        .and()
        .logout()
        .logoutSuccessHandler((request, response, authentication) -> {});
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @SneakyThrows
  public AuthenticationManager authenticationManager() {
    return super.authenticationManager();
  }
}
