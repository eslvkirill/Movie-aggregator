import { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { getMovieCategoriesCreator } from 'redux/creators/movieCreator';
import selectStyles from 'shared/form-controls/select/styles';
import Select from 'components/shared/form-controls/Select/Select';
import Button from 'components/shared/form-controls/Button/Button';
import './MovieCategories.scss';

const options = [
  { value: 'loved', label: 'Любимые фильмы' },
  { value: 'watchList', label: 'Буду смотреть' },
  { value: 'favourite', label: 'Избранное' },
];

const MovieCategories = ({ movieId }: any) => {
  const dispatch = useAppDispatch();
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean | undefined>(true);

  useEffect(() => {
    setCategoriesOpen(false);
    setMenuOpen(true);
  }, [])

  const onShowCategoriesClick = () => {
    setCategoriesOpen(!isCategoriesOpen)
    dispatch(getMovieCategoriesCreator(movieId));
  }
  
  return (
    <div className="movie-categories">
      <Button 
        type="submit movie-categories__btn"
        onClick={onShowCategoriesClick}
        style={{ display: isCategoriesOpen ? 'none' : 'block' }}
      >
        Добавить в коллекцию
      </Button>
      <div 
        style={{ display: !isCategoriesOpen ? 'none' : 'initial' }}
        onClick={() => setMenuOpen(undefined)}
      >
        <Select
          isMulti
          isSearchable
          options={options}
          defaultValue={options[0]}
          isClearable={false}
          // value={option.value}
          menuIsOpen={isMenuOpen}
          closeMenuOnSelect={false}
          placeholder='Выберите категорию'
          onChange={(event: any) => {
            // props.setCurrentPage(1);
            // props.paginate(1, event, props.arrowDirection);
            // props.setFetch(true);
            // props.setLoading(true);
            setMenuOpen(false);
          }}
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
    </div>
  )
}

export default MovieCategories;