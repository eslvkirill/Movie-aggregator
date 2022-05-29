import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import selectStyles from 'shared/form-controls/select/styles';
import Select from 'components/shared/form-controls/Select/Select';
import Button from 'components/shared/form-controls/Button/Button';
import { getCategoriesCreator, getCategoryMoviesCreator } from 'redux/creators/categoryCreator';
import './CollectionPage.scss';
import MovieList from 'components/features/Movie/MovieList/MovieList';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import { resetCalegoriesList, resetMovies } from 'redux/reducers/categoryReducer';

const CollectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector(state => state.userReducer);
  const { categoryList, movies } = useAppSelector(state => state.categoryReducer);

  useEffect(() => {
    if (!movies.length || id) {
      dispatch(resetCalegoriesList());
      dispatch(resetMovies());
      dispatch(getCategoriesCreator(id || user.id));
      dispatch(getCategoryMoviesCreator(categoryList.length && categoryList[0].value));
    }
  }, []);

  const updateCollection = () => navigate('/my-collection/categories');

  const onChangeHandler = (category: any) => {
    dispatch(resetMovies());
    dispatch(getCategoryMoviesCreator(category.value));
  }

  // TODO: Добавить имя пользователя - (иконку критика)
  return (
    <main className="filmCatalog">
      <Link 
        className="grade" 
        to={id ? `/profile/grade-histroy/${id}` : '/my-collection/grade-histroy'}
      >
        Оценки
      </Link>
      <div className="collection">
        <div className="selectWrapper">
          <div className="category">{id ? 'Коллекция:' : 'Моя коллекция:'}</div>
          <div className="action-buttons">
            <Select
              isMulti={false}
              isSearchable={false}
              options={categoryList.length && categoryList}
              defaultValue={categoryList.length && categoryList[0]}
              onChange={(category: any) => onChangeHandler(category)}
              noOptionsMessage={() => 'Список пуст'}
              styles={selectStyles(
                '#b3752f81',
                'relative',
                -2,
                'pointer',
                272,
                15,
                '#fceddcd8',
                '#995506',
                '#995506',
                20,
                '#995506',
                '#b3752f81',
                '#4d0477b9',
                270,
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
                '#b3752f81',
              )}
            />
            {!id &&
              (
                <div className="action-buttons__update-icon">
                  <Button
                    type="action-buttons__update-icon_submit update submit" 
                    onClick={updateCollection}
                    title="Редактирование"
                  >
                    &#9998;
                  </Button>
                </div>
              )
            }
          </div>
        </div>
        <div className="CardWrapper myFilms">
          {movies.length 
            ? <MovieList movies={movies} />  
            : <ContentLoader />
          }
        </div>
      </div>
    </main>
  );
};

export default CollectionPage;
