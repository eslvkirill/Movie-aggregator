package edu.sstu.platform.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonRequestDto {

  @NotBlank
  @Size(max = 50)
  private String firstName;

  @NotBlank
  @Size(max = 150)
  private String lastName;

  private MultipartFile image;

  @NotBlank
  private String biography;
}
