package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.GenreRequestDto;
import edu.sstu.platform.dto.response.GenreResponseDto;
import edu.sstu.platform.model.Genre;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(imports = LocalDateTime.class)
public interface GenreMapper {

  List<GenreResponseDto> toDto(List<Genre> genres);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())")
  })
  Genre toEntity(GenreRequestDto genreRequestDto);

  @Mapping(target = "creationDate", ignore = true)
  Genre toEntity(GenreRequestDto genreRequestDto, UUID id);
}
