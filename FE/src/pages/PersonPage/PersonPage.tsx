import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { makePersonEditable, setMoviesByType } from 'redux/reducers/personReducer';
import { deletePersonCreator, getPersonCreator } from 'redux/creators/personCreator';
import { USER_ROLES } from 'shared/constants/common';
import { isUserLoggIn } from 'shared/utils/common';
import Button from 'components/shared/form-controls/Button/Button';
import MovieList from 'components/features/Movie/MovieList/MovieList';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import './PersonPage.scss';

const PersonPage = () => {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { person, movies, visibleMovies, isLoading, isRedirect } = useAppSelector(state => state.personReducer);
  const { user } = useAppSelector(state => state.authReducer);
  const authUser = isUserLoggIn(user);

  useEffect(() => {
    dispatch(getPersonCreator(id));
  }, [])

  const redirectToAdminPanel = () => navigate('/admin-panel/persons');

  const deletePerson = () => dispatch(deletePersonCreator(id));

  const prefillPersonFormData = () => {
    redirectToAdminPanel();
    dispatch(makePersonEditable());
  }

  const renderTypeButtons = () =>
    Object.keys(movies).map(type => 
      movies[type].length ? (
        <Button
          key={type}
          type={`movies-section__role movies-section__role_${type}`}
          onClick={() => dispatch(setMoviesByType(type))}
          disabled={!movies[type].length}
        >
          { type === 'director' ? 'Режиссёр' : 'Актёр / Актриса в' }
        </Button>
      ) : ''
    )

  if (isRedirect && !isLoading) {
    redirectToAdminPanel();
  }

  return (
    isLoading ? (
      <div className="person-loader">
        <ContentLoader />
      </div>
    ) : (
      <div className="person">
        <div className="person__general-info general-info">
          {authUser && user.roles.includes(USER_ROLES.ADMIN) &&
            <div className="general-info__action-buttons action-buttons">
              <div className="action-buttons__update-icon">
                <Button
                  type="action-buttons__update-icon_submit update submit" 
                  onClick={prefillPersonFormData}
                  title="Редактирование"
                >
                  &#9998;
                </Button>
              </div>
              <div className="action-buttons__delete-icon">
                <Button 
                  type="action-buttons__delete-icon_submit delete submit" 
                  onClick={deletePerson}
                  title="Удалить"
                >
                  &times;
                </Button>
              </div>
            </div>
          }
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