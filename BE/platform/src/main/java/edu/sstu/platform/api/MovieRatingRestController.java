package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.CreateRatingRequestDto;
import edu.sstu.platform.dto.request.UpdateRatingRequestDto;
import edu.sstu.platform.service.RatingService;
import edu.sstu.platform.service.UserPrincipalService;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/movies/{movieId}/ratings")
public class MovieRatingRestController {

  private final RatingService ratingService;
  private final UserPrincipalService userPrincipalService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasRole('USER')")
  public UUID createRating(@PathVariable UUID movieId, @RequestBody @Valid CreateRatingRequestDto ratingRequestDto) {
    return ratingService.createRating(movieId,
        userPrincipalService.getCurrentUserOrElseThrow().getId(), ratingRequestDto);
  }

  @PutMapping("/{ratingId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasRole('USER')")
  public void updateRating(@PathVariable UUID movieId, @PathVariable UUID ratingId,
      @RequestBody @Valid UpdateRatingRequestDto ratingRequestDto) {
    ratingService.updateRating(movieId, ratingId, ratingRequestDto);
  }

  @DeleteMapping("/{ratingId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PreAuthorize("hasRole('USER')")
  public void deleteRating(@PathVariable UUID movieId, @PathVariable UUID ratingId) {
    ratingService.deleteRating(movieId, ratingId);
  }
}
