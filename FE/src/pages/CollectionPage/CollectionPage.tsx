import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import selectStyles from 'shared/form-controls/select/styles';
import MovieCard from 'components/features/Movie/MovieCard/MovieCard';
import Select from 'components/shared/form-controls/Select/Select';
import Button from 'components/shared/form-controls/Button/Button';
import { getCategoriesCreator } from 'redux/creators/categoryCreator';
import './CollectionPage.scss';

const CollectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const { user } = useAppSelector(state => state.authReducer);
  const { categoryList } = useAppSelector(state => state.categoryReducer);

  useEffect(() => {
    dispatch(getCategoriesCreator(id || user.id));
    console.log(categoryList)
  }, []);

  const updateCollection = () => navigate('/my-collection/categories');

  return (
    <main className="filmCatalog">
      <Link 
        className="grade" 
        to='/my-collection/grade-histroy'
      >
        Оценки
      </Link>
      <div className="collection">
        <div className="selectWrapper">
          <div className="category">Моя коллекция:</div>
          <div className="action-buttons">
            <Select
              isMulti={false}
              isSearchable={false}
              options={categoryList}
              defaultValue={!!categoryList.length && categoryList[0]}
              onChange={(event: any) => {
                // props.setCurrentPage(1);
                // props.paginate(1, event, props.arrowDirection);
                // props.setFetch(true);
                // props.setLoading(true);
              }}
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
                'hidden'
              )}
            />
            <div className="action-buttons__update-icon">
              <Button
                type="action-buttons__update-icon_submit update submit" 
                onClick={updateCollection}
                title="Редактирование"
              >
                &#9998;
              </Button>
            </div>
          </div>
        </div>
        <div className="CardWrapper myFilms">
          <MovieCard
            movieId='movie.id'
            rusTitle='movie.rusTitle'
            engTitle='movie.engTitle'
            // poster='movie.poster'
            duration='01:35:00'
            // genres='movie.genres'
            year={2011}
            // directors='movie.directors'
            totalRating={10}
            backgroundColor='#fafafa'
          />
        </div>
      </div>
    </main>
  );
};

export default CollectionPage;
