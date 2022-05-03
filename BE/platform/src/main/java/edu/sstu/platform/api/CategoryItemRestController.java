package edu.sstu.platform.api;

import edu.sstu.platform.dto.response.CategoryItemResponseDto;
import edu.sstu.platform.service.CategoryService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories/{categoryId}/items")
public class CategoryItemRestController {

  private final CategoryService categoryService;

  @PostMapping("/{movieId}")
  @ResponseStatus(HttpStatus.CREATED)
  public UUID createCategoryItem(@PathVariable UUID categoryId, @PathVariable UUID movieId) {
    return categoryService.createCategoryItem(categoryId, movieId);
  }

  @DeleteMapping("/{itemId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCategoryItem(@PathVariable UUID categoryId, @PathVariable UUID itemId) {
    categoryService.deleteCategoryItem(categoryId, itemId);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public List<CategoryItemResponseDto> getCategoryItems(@PathVariable UUID categoryId) {
    return categoryService.findCategoryItems(categoryId);
  }
}
