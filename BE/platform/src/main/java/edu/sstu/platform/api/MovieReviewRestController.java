package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.MovieReviewRequestDto;
import edu.sstu.platform.dto.response.ReviewResponseDto;
import edu.sstu.platform.service.ReviewService;
import edu.sstu.platform.service.UserPrincipalService;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/movies/{movieId}/reviews")
@RequiredArgsConstructor
public class MovieReviewRestController {

  private final ReviewService reviewService;
  private final UserPrincipalService userPrincipalService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public UUID createReview(@PathVariable UUID movieId, @RequestBody @Valid MovieReviewRequestDto reviewRequestDto) {
    return reviewService.createReview(reviewRequestDto, movieId,
        userPrincipalService.getCurrentUserOrElseThrow().getId());
  }

  @PutMapping("/{reviewId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateReview(@PathVariable UUID movieId, @RequestBody @Valid MovieReviewRequestDto reviewRequestDto,
      @PathVariable UUID reviewId) {
      reviewService.updateReview(reviewRequestDto, movieId, reviewId);
  }

  @DeleteMapping("/{reviewId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteReview(@PathVariable UUID movieId, @PathVariable UUID reviewId) {
    reviewService.deleteReview(movieId, reviewId);
  }

  @GetMapping
  public Page<ReviewResponseDto> getReviews(@PathVariable UUID movieId, Pageable pageable) {
    return reviewService.getReviews(movieId, pageable);
  }
}
