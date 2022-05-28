package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.response.CategoryItemResponseDto;
import edu.sstu.platform.model.CategoryItem;
import edu.sstu.platform.model.projection.RatingMapping;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(imports = {LocalDateTime.class})
public abstract class CategoryItemMapper {

  @Autowired
  protected MovieMapper movieMapper;

  @Mapping(target = "movie",
      expression = "java(movieMapper.toViewDto(categoryItem.getMovie(), ratingsByMovieId))")
  public abstract CategoryItemResponseDto toDto(CategoryItem categoryItem,
      Map<UUID, List<RatingMapping>> ratingsByMovieId);

  public List<CategoryItemResponseDto> toDto(List<CategoryItem> categoryItem,
      Map<UUID, List<RatingMapping>> ratingsByMovieId) {
    return categoryItem.stream()
        .map(ci -> toDto(ci, ratingsByMovieId))
        .collect(Collectors.toList());
  }

  @Mappings({
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "movie", ignore = true)
  })
  public abstract CategoryItem toEntity(UUID categoryId, UUID movieId);
}
