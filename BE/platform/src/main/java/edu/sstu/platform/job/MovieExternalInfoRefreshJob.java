package edu.sstu.platform.job;

import edu.sstu.platform.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(value = "job.movie-external-info-refresh.enabled", havingValue = "true")
public class MovieExternalInfoRefreshJob {

  private final MovieService movieService;

  @Scheduled(cron = "${job.movie-external-info-refresh.cron}")
  @Transactional
  public void run() {
    movieService.refreshMoviesExternalInfo();
  }
}
