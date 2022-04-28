package edu.sstu.platform.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieReviewRequestDto {

  @NotBlank
  @Size(max = 255)
  private String title;

  @NotBlank
  private String body;
}
