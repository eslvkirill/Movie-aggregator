package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.CreateRatingRequestDto;
import edu.sstu.platform.dto.request.UpdateRatingRequestDto;
import edu.sstu.platform.dto.response.AverageRatingResponseDto;
import edu.sstu.platform.dto.response.RatingHistoryItemResponseDto;
import edu.sstu.platform.dto.response.RatingResponseDto;
import edu.sstu.platform.model.Rating;
import edu.sstu.platform.model.projection.RatingMapping;
import java.util.List;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

@Mapper
public abstract class RatingMapper {

  @Autowired
  @Lazy
  protected MovieMapper movieMapper;

  @Mappings({
      @Mapping(target = "rank", source = "ratingRequestDto.ratingType.rank"),
      @Mapping(target = "id", ignore = true)
  })
  public abstract Rating toEntity(CreateRatingRequestDto ratingRequestDto, UUID movieId, UUID userId);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "movieId", ignore = true),
      @Mapping(target = "userId", ignore = true),
      @Mapping(target = "ratingType", ignore = true),
      @Mapping(target = "rank", ignore = true)
  })
  public abstract void update(UpdateRatingRequestDto ratingRequestDto, @MappingTarget Rating rating);

  public abstract AverageRatingResponseDto toAverageDto(RatingMapping rating);

  public abstract RatingResponseDto toDto(Rating rating);

  @Mappings({
      @Mapping(target = "ratedMovie", expression = "java(movieMapper.toRatedDto(rating.getMovie()))"),
      @Mapping(target = "userRating", source = "score"),
      @Mapping(target = "ratingDate", source = "modificationDate")
  })
  public abstract RatingHistoryItemResponseDto toHistoryItemDto(Rating rating);

  public abstract List<RatingHistoryItemResponseDto> toHistoryItemDto(List<Rating> ratings);
}
