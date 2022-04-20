package edu.sstu.platform.mapper;

import edu.sstu.platform.dto.request.GenreRequestDto;
import edu.sstu.platform.dto.response.GenreResponseDto;
import edu.sstu.platform.model.Genre;
import java.util.List;
import java.util.UUID;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface GenreMapper {

  List<GenreResponseDto> toDto(List<Genre> genres);

  @Mapping(target = "id", ignore = true)
  Genre toEntity(GenreRequestDto genreRequestDto);

  Genre toEntity(GenreRequestDto genreRequestDto, UUID id);
}
