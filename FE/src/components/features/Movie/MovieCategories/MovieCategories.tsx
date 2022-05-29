import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getMovieCategoriesCreator } from 'redux/creators/movieCreator';
import selectStyles from 'shared/form-controls/select/styles';
import Select from 'components/shared/form-controls/Select/Select';
import Button from 'components/shared/form-controls/Button/Button';
import './MovieCategories.scss';
import { addMovieIntoCategoryCreator, deleteMovieInCategoryCreator } from 'redux/creators/categoryCreator';
import { resetCategories } from 'redux/reducers/movieReducer';

const MovieCategories = ({ movieId }: any) => {
  const dispatch = useAppDispatch();
  const { categories, containsCategories } = useAppSelector(state => state.movieReducer);

  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean | undefined>(true);

  useEffect(() => {
    setCategoriesOpen(false);
    setMenuOpen(true);
  }, [])

  const onShowCategoriesClick = () => {
    setCategoriesOpen(!isCategoriesOpen);
    dispatch(resetCategories());
    dispatch(getMovieCategoriesCreator(movieId));
  }

  const onSelectClick = () => {
    setMenuOpen(undefined);
    // dispatch(resetCategories());
    // dispatch(getMovieCategoriesCreator(movieId));
  }

  const onChangeSelectHandler = (selectedCategories: any, type: any) => {
    console.log(selectedCategories, type);

    if (type.action === 'select-option') {
      dispatch(addMovieIntoCategoryCreator({category: type.option, movieId: type.name}))
    } else if (type.action === 'remove-value') {
      dispatch(deleteMovieInCategoryCreator({categoryId: type.option.value, movieId: type.name}))
    } else if (type.action === 'deselect-option') {
      dispatch(deleteMovieInCategoryCreator({categoryId: type.option.value, movieId: type.name}))
    };

    setMenuOpen(false);
  }
  
  return (
    <div className="movie-categories">
      {!isCategoriesOpen || !categories.length
      ? (
        <Button 
          type="submit movie-categories__btn"
          onClick={onShowCategoriesClick}
        >
          Добавить в коллекцию
        </Button>
      ) : (
        <div onClick={onSelectClick}>
          <Select
            isMulti
            isSearchable
            name={movieId}
            options={!!categories.length && categories}
            // defaultValue={[options[0], options[1]]}
            isClearable={false}
            value={!!containsCategories.length && containsCategories}
            menuIsOpen={isMenuOpen}
            closeMenuOnSelect={false}
            placeholder='Выберите категорию'
            onChange={(selectedCategories: any, type: any) => onChangeSelectHandler(selectedCategories, type)}
            styles={selectStyles(
              '#b3752f81',
              'relative',
              -2,
              'pointer',
              320,
              15,
              '#fceddcd8',
              '#995506',
              '#995506',
              20,
              '#995506',
              '#b3752f81',
              '#4d0477b9',
              315,
              '#4d0477b9',
              15,
              4,
              '85%',
              3.35,
              'solid',
              '#b3752f81',
              '#4d0477b9',
              '#b3752f81',
              '#4d0477b9',
              '17px',
              230,
              '12%',
              -8,
              'hidden',
              '#363507'
            )}
          />
        </div>
      )}
    </div>
  )
}

export default MovieCategories;