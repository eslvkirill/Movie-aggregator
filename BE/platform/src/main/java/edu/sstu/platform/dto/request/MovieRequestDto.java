package edu.sstu.platform.dto.request;

import edu.sstu.platform.model.AgeRating;
import edu.sstu.platform.model.Language;
import java.time.LocalTime;
import java.util.Set;
import java.util.UUID;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieRequestDto {

  @NotBlank
  @Size(max = 255)
  private String engTitle;

  @NotBlank
  @Size(max = 255)
  private String rusTitle;

  @Min(1888)
  private int year;

  private MultipartFile poster;
  private MultipartFile background;

  @NotBlank
  @Pattern(regexp = "#[a-z\\d]{3,}")
  @Size(max = 20)
  private String primaryPageColor;

  @NotBlank
  @Pattern(regexp = "#[a-z\\d]{3,}")
  @Size(max = 20)
  private String secondaryPageColor;

  @NotBlank
  @Size(max = 255)
  private String tagline;

  @NotBlank
  private String description;

  @NotNull
  private AgeRating ageRating;

  @NotBlank
  @URL(regexp = "http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/embed\\/)([\\w\\-]*)(&(amp;)?[\\w\\?=]*)?")
  private String trailerUrl;

  @NotBlank
  @URL(regexp = "http(?:s?):\\/\\/(?:www\\.)?kinopoisk.ru\\/film\\/[\\d]+\\/?")
  private String kinopoiskUrl;

  @NotBlank
  @URL(regexp = "http(?:s?):\\/\\/(?:www\\.)?imdb.com\\/title\\/tt[\\d]+\\/?[\\w\\?=\\-&]*")
  private String imdbUrl;

  @NotNull
  @DateTimeFormat(iso = ISO.TIME)
  private LocalTime duration;

  @NotEmpty
  private Set<String> originCountries;

  @NotEmpty
  private Set<Language> audioLanguages;

  @NotEmpty
  private Set<Language> subtitleLanguages;

  @NotEmpty
  private Set<UUID> genres;

  @NotEmpty
  private Set<UUID> actors;

  @NotEmpty
  private Set<UUID> directors;
}
