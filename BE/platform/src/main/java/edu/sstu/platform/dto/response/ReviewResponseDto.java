package edu.sstu.platform.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {

  private UUID id;
  private String title;
  private String body;

  @JsonFormat(pattern = "dd MMM yyyy г., HH:mm")
  private LocalDateTime creationDate;

  // TODO: wrap with UserResponseDto
  private UUID userId;
  private String username;
  private float userRating;
  private boolean critic;
}
