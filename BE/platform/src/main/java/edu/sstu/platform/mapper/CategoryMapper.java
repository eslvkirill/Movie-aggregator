package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.CategoryRequestDto;
import edu.sstu.platform.dto.response.CategoryResponseDto;
import edu.sstu.platform.dto.response.CategoryToMovieRelationResponseDto;
import edu.sstu.platform.model.Category;
import edu.sstu.platform.model.projection.CategoryToMovieRelationMapping;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(imports = {LocalDateTime.class})
public interface CategoryMapper {

  @Mappings({
      @Mapping(target = "custom", constant = "true"),
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "user", ignore = true)
  })
  Category toEntity(CategoryRequestDto categoryRequestDto, UUID userId);

  @Mappings({
      @Mapping(target = "custom", constant = "false"),
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())"),
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "user", ignore = true)
  })
  Category toEntity(String name, UUID userId);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "userId", ignore = true),
      @Mapping(target = "custom", ignore = true),
      @Mapping(target = "creationDate", ignore = true),
      @Mapping(target = "user", ignore = true)
  })
  void update(CategoryRequestDto categoryRequestDto, @MappingTarget Category category);

  List<CategoryResponseDto> toDto(List<Category> categories);

  List<CategoryToMovieRelationResponseDto> toRelationDto(List<CategoryToMovieRelationMapping> mappings);
}
