package edu.sstu.platform.dto.response;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryItemResponseDto {

  private UUID id;
  private MovieViewResponseDto movie;
}
