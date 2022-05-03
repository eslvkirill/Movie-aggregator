package edu.sstu.platform.service;

import static edu.sstu.platform.util.QuerydslUtils.preparePath;

import edu.sstu.platform.dto.request.CategoryRequestDto;
import edu.sstu.platform.dto.response.CategoryItemResponseDto;
import edu.sstu.platform.dto.response.CategoryResponseDto;
import edu.sstu.platform.mapper.CategoryItemMapper;
import edu.sstu.platform.mapper.CategoryMapper;
import edu.sstu.platform.model.QCategory;
import edu.sstu.platform.model.QCategoryItem;
import edu.sstu.platform.repo.CategoryItemRepo;
import edu.sstu.platform.repo.CategoryRepo;
import edu.sstu.platform.validator.CategoryItemValidator;
import edu.sstu.platform.validator.CategoryValidator;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryService {

  private final CategoryRepo categoryRepo;
  private final CategoryItemRepo categoryItemRepo;
  private final CategoryMapper categoryMapper;
  private final CategoryItemMapper categoryItemMapper;
  private final CategoryValidator categoryValidator;
  private final CategoryItemValidator categoryItemValidator;
  private final QCategory qCategory = QCategory.category;
  private final QCategoryItem qCategoryItem = QCategoryItem.categoryItem;

  @Transactional
  public UUID createCategory(CategoryRequestDto categoryRequestDto, UUID userId) {
    categoryValidator.validate(categoryRequestDto, userId);

    var category = categoryMapper.toEntity(categoryRequestDto, userId);

    return categoryRepo.save(category).getId();
  }

  @Transactional
  public void updateCategory(CategoryRequestDto categoryRequestDto, UUID id) {
    var category = categoryRepo.findById(id)
        .orElseThrow(() -> entityNotFoundException(id));

    categoryValidator.validate(categoryRequestDto, category);
    categoryMapper.update(categoryRequestDto, category);
  }

  private EntityNotFoundException entityNotFoundException(UUID id) {
    return new EntityNotFoundException("Category by id: " + id + " doesn't exist");
  }

  @Transactional
  public void deleteCategory(UUID id) {
    var category = categoryRepo.findById(id)
        .orElseThrow(() -> entityNotFoundException(id));

    categoryRepo.delete(category);
  }

  @Transactional(readOnly = true)
  public List<CategoryResponseDto> findCategories(UUID userId) {
    var sort = Sort.by(Order.by(preparePath(qCategory.custom)), Order.desc(preparePath(qCategory.creationDate)));
    var categories = categoryRepo.findBy(qCategory.userId.eq(userId), ffq -> ffq.sortBy(sort).all());

    return categoryMapper.toDto(categories);
  }

  @Transactional
  public UUID createCategoryItem(UUID categoryId, UUID movieId) {
    categoryItemValidator.validate(movieId);

    var categoryItem = categoryItemMapper.toEntity(categoryId, movieId);

    return categoryItemRepo.save(categoryItem).getId();
  }

  @Transactional
  public void deleteCategoryItem(UUID categoryId, UUID itemId) {
    var categoryItem = categoryItemRepo.findById(itemId)
        .orElseThrow(() -> entityNotFoundException(categoryId, itemId));

    categoryItemRepo.delete(categoryItem);
  }

  private EntityNotFoundException entityNotFoundException(UUID categoryId, UUID itemId) {
    return new EntityNotFoundException("Category by id: " + categoryId + " doesn't contain item with id: " + itemId);
  }

  @Transactional(readOnly = true)
  public List<CategoryItemResponseDto> findCategoryItems(UUID categoryId) {
    var sort = Sort.by(preparePath(qCategoryItem.creationDate)).descending();
    var categoryItems = categoryItemRepo.findBy(qCategoryItem.categoryId.eq(categoryId),
        ffq -> ffq.project(preparePath(qCategoryItem.movie)).sortBy(sort).all());

    return categoryItemMapper.toDto(categoryItems);
  }
}
