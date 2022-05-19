package edu.sstu.platform.service;

import edu.sstu.platform.dto.request.MovieReviewRequestDto;
import edu.sstu.platform.dto.response.ReviewResponseDto;
import edu.sstu.platform.mapper.ReviewMapper;
import edu.sstu.platform.model.QReview;
import edu.sstu.platform.repo.ReviewRepo;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

  private final ReviewRepo reviewRepo;
  private final ReviewMapper reviewMapper;
  private final QReview qReview = QReview.review;

  public UUID createReview(MovieReviewRequestDto movieReviewRequestDto, UUID movieId, UUID userId) {
    var review = reviewMapper.toEntity(movieReviewRequestDto, movieId, userId);

    return reviewRepo.save(review).getId();
  }

  public void updateReview(MovieReviewRequestDto movieReviewRequestDto, UUID movieId, UUID reviewId) {
    var review = reviewRepo.findById(reviewId)
        .orElseThrow(() -> entityNotFoundException(movieId));

    reviewMapper.update(movieReviewRequestDto, review);
  }

  private EntityNotFoundException entityNotFoundException(UUID movieId) {
    return new EntityNotFoundException("Your review for movie: " + movieId + " doesn't exist");
  }

  public void deleteReview(UUID movieId, UUID reviewId) {
    var review = reviewRepo.findById(reviewId)
        .orElseThrow(() -> entityNotFoundException(movieId));

    reviewRepo.delete(review);
  }

  @Transactional(readOnly = true)
  public Page<ReviewResponseDto> findReviews(UUID movieId, Pageable pageable) {
    var unsortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
    var reviewIdPage = reviewRepo.findReviewIdsByMovieId(movieId, unsortedPageable);
    var reviewIds = reviewIdPage.getContent();
    var reviews = reviewRepo.findByIdIn(reviewIds, pageable.getSort());
    var ReviewDtoList = reviewMapper.toDto(reviews);

    return new PageImpl<>(ReviewDtoList, pageable, reviewIdPage.getTotalElements());
  }
}
