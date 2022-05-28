package edu.sstu.platform.api;

import edu.sstu.platform.dto.request.CategoryRequestDto;
import edu.sstu.platform.dto.response.CategoryResponseDto;
import edu.sstu.platform.dto.response.CategoryToMovieRelationResponseDto;
import edu.sstu.platform.service.CategoryService;
import edu.sstu.platform.service.UserPrincipalService;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryRestController {

  private final CategoryService categoryService;
  private final UserPrincipalService userPrincipalService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public UUID createCategory(@RequestBody @Valid CategoryRequestDto categoryRequestDto) {
    return categoryService.createCategory(categoryRequestDto,
        userPrincipalService.getCurrentUserOrElseThrow().getId());
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateCategory(@PathVariable UUID id, @RequestBody @Valid CategoryRequestDto categoryRequestDto) {
    categoryService.updateCategory(categoryRequestDto, id);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCategory(@PathVariable UUID id) {
    categoryService.deleteCategory(id);
  }

  @GetMapping("/owner/{userId}")
  public List<CategoryResponseDto> getCategories(@PathVariable UUID userId) {
    return categoryService.findCategories(userId);
  }

  @GetMapping("/check/{movieId}")
  public List<CategoryToMovieRelationResponseDto> getCategoryToMovieRelations(@PathVariable UUID movieId) {
    return categoryService.findCategoryToMovieRelations(movieId,
        userPrincipalService.getCurrentUserOrElseThrow().getId());
  }
}
