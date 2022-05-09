import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setMoviesByType } from 'redux/reducers/personReducer';
import { deletePersonCreator, getPersonCreator } from 'redux/creators/personCreator';
import Button from 'components/shared/form-controls/Button/Button';
import MovieList from 'components/features/Movie/MovieList/MovieList';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import './PersonPage.scss';

const PersonPage = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { person, movies, visibleMovies, isLoading } = useAppSelector(state => state.personReducer);

  useEffect(() => {
    dispatch(getPersonCreator(id));
  }, [])

  const deletePerson = () => {
    dispatch(deletePersonCreator(id));
    // <Navigate to="/admin-panel/persons" />
  }

  const renderTypeButtons = () =>
    Object.keys(movies).map(type => 
      movies[type].length ? (
        <Button
          key={type}
          type={`movies-section__role_${type}`}
          onClick={() => dispatch(setMoviesByType(type))}
          disabled={!movies[type].length}
        >
          { type === 'director' ? 'Срежиссировал' : 'Снимался в' }
        </Button>
      ) : ''
    )

  return (
    isLoading ? (
      <ContentLoader />
    ) : (
      <div className="person">
        <div className="person__general-info general-info">
          <div className="general-info__delete-icon">
            <Button 
              type="general-info__delete-icon_submit submit" 
              onClick={deletePerson}
            >
              &times;
            </Button>
          </div>
          <div className="general-info__person-bio person-bio">
            <img
              src={`data:image/*;base64,${person.image}`}
              alt="Фото актёра/режиссёра"
              className="person-bio__photo"
            />
            <div className="person-bio__name">{person.name}</div>
            <div className="person-bio__biography">{person.biography}</div>
          </div>
        </div>
        <div className="person__movies-section movies-section">
          <div className="movies-section__buttons buttons">
            {renderTypeButtons()}
          </div>
          <div className='movies-section__movies'>
            <MovieList movies={visibleMovies} />
          </div>
        </div>
      </div>
  ));
}

export default PersonPage;