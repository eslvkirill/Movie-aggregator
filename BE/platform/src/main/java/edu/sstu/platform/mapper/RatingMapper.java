package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.CreateRatingRequestDto;
import edu.sstu.platform.dto.request.UpdateRatingRequestDto;
import edu.sstu.platform.dto.response.AverageRatingResponseDto;
import edu.sstu.platform.dto.response.RatingResponseDto;
import edu.sstu.platform.model.Rating;
import edu.sstu.platform.model.projection.RatingMapping;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper
public interface RatingMapper {

  @Mappings({
      @Mapping(target = "rank", source = "ratingRequestDto.ratingType.rank"),
      @Mapping(target = "id", ignore = true)
  })
  Rating toEntity(CreateRatingRequestDto ratingRequestDto, UUID movieId, UUID userId);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "movieId", ignore = true),
      @Mapping(target = "userId", ignore = true),
      @Mapping(target = "ratingType", ignore = true),
      @Mapping(target = "rank", ignore = true)
  })
  void update(UpdateRatingRequestDto ratingRequestDto, @MappingTarget Rating rating);

  AverageRatingResponseDto toDto(RatingMapping rating);

  RatingResponseDto toDto(Rating rating);
}
