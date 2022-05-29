package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.MovieReviewRequestDto;
import edu.sstu.platform.dto.response.ReviewResponseDto;
import edu.sstu.platform.model.Review;
import edu.sstu.platform.model.UserRole;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(imports = {LocalDateTime.class, UserRole.class})
public interface ReviewMapper {

  @Mappings({
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "movie", ignore = true),
      @Mapping(target = "user", ignore = true),
      @Mapping(target = "ratings", ignore = true)
  })
  Review toEntity(MovieReviewRequestDto movieReviewRequestDto, UUID movieId, UUID userId);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "movieId", ignore = true),
      @Mapping(target = "movie", ignore = true),
      @Mapping(target = "userId", ignore = true),
      @Mapping(target = "user", ignore = true),
      @Mapping(target = "creationDate", ignore = true),
      @Mapping(target = "ratings", ignore = true)
  })
  void update(MovieReviewRequestDto movieReviewRequestDto, @MappingTarget Review review);

  @Mappings({
      @Mapping(target = "userId", source = "user.id"),
      @Mapping(target = "username", source = "user.username"),
      @Mapping(target = "userRating", source = "rating.score"),
      @Mapping(target = "critic", expression = "java(review.getUser().getRoles().contains(UserRole.CRITIC))")
  })
  ReviewResponseDto toDto(Review review);

  List<ReviewResponseDto> toDto(List<Review> reviews);
}
