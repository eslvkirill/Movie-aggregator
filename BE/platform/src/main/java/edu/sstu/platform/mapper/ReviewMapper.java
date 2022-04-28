package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.MovieReviewRequestDto;
import edu.sstu.platform.dto.response.ReviewResponseDto;
import edu.sstu.platform.model.Review;
import java.time.LocalDateTime;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Page;

@Mapper(imports = {LocalDateTime.class})
public interface ReviewMapper {

  @Mappings({
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "movie", ignore = true),
      @Mapping(target = "user", ignore = true)
  })
  Review toEntity(MovieReviewRequestDto movieReviewRequestDto, UUID movieId, UUID userId);

  @Mappings({
      @Mapping(target = "userId", ignore = true),
      @Mapping(target = "user", ignore = true),
      @Mapping(target = "movieId", ignore = true),
      @Mapping(target = "movie", ignore = true),
      @Mapping(target = "creationDate", ignore = true),
      @Mapping(target = "id", ignore = true)
  })
  void update(MovieReviewRequestDto movieReviewRequestDto, @MappingTarget Review review);

  @Mapping(target = "username", source = "user.username")
  ReviewResponseDto toDto(Review review);

  default Page<ReviewResponseDto> toDto(Page<Review> reviews) {
    return reviews.map(this::toDto);
  }
}
