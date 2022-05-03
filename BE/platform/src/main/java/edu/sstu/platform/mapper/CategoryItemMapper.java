package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.response.CategoryItemResponseDto;
import edu.sstu.platform.model.CategoryItem;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(uses = {MovieMapper.class}, imports = {LocalDateTime.class})
public interface CategoryItemMapper {

  List<CategoryItemResponseDto> toDto(List<CategoryItem> categoryItem);

  @Mappings({
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "movie", ignore = true)
  })
  CategoryItem toEntity(UUID categoryId, UUID movieId);
}
