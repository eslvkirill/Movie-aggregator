import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKickstarterK, faImdb } from '@fortawesome/free-brands-svg-icons';
import { faM } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { deleteMovieCreator, getMovieByIdCreator } from 'redux/creators/movieCreator';
import { setBackgroundAction } from 'redux/actions/movie/appearanceActions';
import { makeMovieEditable, reset } from 'redux/reducers/movieReducer';
import { openModal } from 'redux/reducers/backdropReducer';
import { renderPersons } from 'shared/utils/render';
import { isUserLoggIn } from 'shared/utils/common';
import { USER_ROLES } from 'shared/constants/common';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';
import Backdrop from 'components/shared/pop-ups/Backdrop/Backdrop';
import Button from 'components/shared/form-controls/Button/Button';
import Login from 'components/features/User/Auth/Login/Login';
import RatingList from 'components/features/Rating/RatingList/RatingList';
import RatingItem from 'components/features/Rating/RatingItem/RatingItem';
import ReviewList from 'components/features/Review/ReviewList/ReviewList';
import './MoviePage.scss';

const MoviePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const { movie, isLoading } = useAppSelector(state => state.movieReducer);
  const { ratings } = useAppSelector(state => state.ratingReducer);
  const { isModalOpen } = useAppSelector(state => state.backdropReducer);
  const { user } = useAppSelector(state => state.userReducer);
  const authUser = isUserLoggIn(user);

  useEffect(() => {
    dispatch(reset());
    dispatch(getMovieByIdCreator(id));
  }, []);

  const prefillMovieFormData = () => {
    navigate('/admin-panel/movies');
    dispatch(makeMovieEditable());
  }

  const deleteMovie = () => {
    dispatch(deleteMovieCreator(id));
    navigate('/');
  }

  const renderIcons = () =>
    movie && movie.externalAggregatorsInfo.map((agregator: any) => {
      let icon!: IconProp;

      if (agregator.name === 'Metacritic') {
        icon = faM;
      } else if (agregator.name === 'Kinopoisk') {
        icon = faKickstarterK;
      } else if (agregator.name === 'Imdb') {
        icon = faImdb;
      }
      
      return (
        <li key={agregator.name}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={agregator.url}
            className={agregator.name}
          >
            <div className="Front">
              <FontAwesomeIcon icon={icon} title={agregator.url} />
            </div>
            <div className="Back">
              <FontAwesomeIcon icon={icon} title={agregator.url} />
            </div>
          </a>
        </li>
      );
    });

    const renderImages = (value: number, isOscarImage: boolean, alt: string) => {
      const images = [];

      const src = isOscarImage
        ? require('../../images/awardOscar.png')
        : require('../../images/star.png');

      for (let i = 0; i < Math.round(value); i++) {
        images.push(
          <img key={i} src={src} alt={alt} />
        );
      }
      return images;
    };

    const renderRatings = () =>
      (movie) && movie.externalAggregatorsInfo.map((aggregator: any) => (
        <div key={aggregator.name} className={`${aggregator.name}Stars`}>
          <div className="Rating">
            {aggregator.name} {aggregator.rating}
          </div>
          <div className="StarsWrapper">
            <div className="Star">
              {renderImages(aggregator.rating, false, 'Звезда рейтинга')}
            </div>
          </div>
        </div>
      ));

    const renderOscars = () =>
      renderImages(movie.oscars, true, 'Оскаровская статуэтка');

  const {
    engTitle,
    rusTitle,
    ageRating,
    year,
    duration,
    description,
    displayGenres,
    totalRatingCount,
    reviewedByUser,
    originCountries,
    audioLanguages,
    subtitleLanguages,
    primaryPageColor,
    secondaryPageColor,
    trailerUrl,
    tagline,
  } = movie;

  return (
    <div
      key={movie.id}
      className="MoviePage"
      // style={authForm ? { position: "absolute" } : {}}
    >
      {isLoading ? (
        <ContentLoader className="Loader" />
      ) : (
        <>
          <section
            className="FirstSection"
            style={setBackgroundAction(movie[MovieFormFileds.BACKGROUND])}
          >
            {!!(authUser && user.roles.includes(USER_ROLES.ADMIN)) &&
              <div className="general-info__action-buttons action-buttons">
                <div className="action-buttons__update-icon">
                  <Button
                    type="action-buttons__update-icon_submit update submit" 
                    onClick={prefillMovieFormData}
                    title="Редактирование"
                  >
                    &#9998;
                  </Button>
                </div>
                <div className="action-buttons__delete-icon">
                  <Button 
                    type="action-buttons__delete-icon_submit delete submit" 
                    onClick={deleteMovie}
                    title="Удалить"
                  >
                    &times;
                  </Button>
                </div>
              </div>
            }
            <div className="Wrapper">
              <div className="Genres">
                <p>{displayGenres}</p>
              </div>
              <div className="Title">
                <p>
                  &nbsp;{engTitle}
                  <span>&nbsp;{rusTitle}</span>
                </p>
                <div className="RightSideOfTitle">
                  <div className="AgeRating">
                    <span>{ageRating}</span>
                  </div>
                  <div className="Year">
                    {year}
                    <span> г.</span>
                  </div>
                </div>
              </div>
              {isModalOpen &&
                <Backdrop>
                  { authUser ? <RatingList movieId={id} /> : <Login /> }
                </Backdrop>
              }
              <div className="total-rating">
                <div className="caption">{authUser ? 'Ваше общее впечатление:' : 'Оцените фильм:' }</div>
                <RatingItem 
                  movieId={id} 
                  score={ratings[0].score}
                  ratingId={ratings[0].id}
                  type={ratings[0].type}
                />
              </div>
              <div className="Time">{duration}</div>
              <div className="Plot">{description}</div>
              <div className="AfterPlotBlock">
              <div className="Cast">
                Режиссёр:&nbsp;
                <span className="People">
                  {renderPersons(movie.directors)}
                </span>
                <br />В главных ролях:&nbsp;
                <span className="People">
                  {renderPersons(movie.actors)}
                </span>
              </div>
                <div className="Details">
                  <div>
                    Страна: <span>{originCountries}</span>
                  </div>
                  <div>
                    Языки аудиодорожек: <span>{audioLanguages}</span>
                  </div>
                  <div>
                    Языки субтитров: <span>{subtitleLanguages}</span>
                  </div>
                </div>
              </div>

              <div className="BottomOfSection">
                <div className="Links">
                  <ScrollLink
                    className="TrailerButton"
                    activeClass="active"
                    to="trailer"
                    spy
                    smooth
                    hashSpy
                    offset={0}
                    duration={900}
                    isDynamic
                  >
                    Посмотреть трейлер
                  </ScrollLink>
                  <ScrollLink
                    className="TrailerButton ReviewButton"
                    activeClass="active"
                    to="reviews"
                    spy
                    smooth
                    hashSpy
                    offset={0}
                    duration={900}
                    isDynamic
                  >
                    Прочитать отзывы
                  </ScrollLink>
                </div>
                <div className="detail-scores">
                  <Button 
                    type="submit"
                    onClick={() => dispatch(openModal())}
                  >
                    Детальная оценка &#9734;
                  </Button>
                </div>
              </div>
            </div>
            <div className="totalRatingBlock">
              <div className="totalRating" title="Общий рейтинг">
                {ratings[0].averageScore.toFixed(2)}
              </div>
              <div className="numberOfRatings" title="Количество пользователей">
                {totalRatingCount} оценок
              </div>
            </div>
          </section>

          <section
            className="SecondSection"
            style={{
              width: '100vw',
              height: '105vh',
              background: `linear-gradient(105deg, ${primaryPageColor} 50%, ${secondaryPageColor} 50%)`,
            }}
          >
            <div className="Block">
              <div className="LeftSide">
                <div
                  id="trailer"
                  className="Trailer"
                  style={{ color: secondaryPageColor }}
                >
                  Официальный трейлер
                </div>
                <div className="VideoContainer">
                  <div className="Video">
                    <iframe
                      title="Movie Trailer"
                      width="710"
                      height="445"
                      src={trailerUrl}
                      // controls="0"
                      frameBorder="0px"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="Oscars">{renderOscars()}</div>
              </div>
            </div>
            <div className="Block">
              <div className="RightSide">
                <div className="Title" style={{ color: primaryPageColor }}>
                  {engTitle}
                </div>
                <br />
                <div className="Tagline">&lt;&lt;{tagline}&gt;&gt;</div>
                <div className="RatingsWrapper">
                  <div className="RatingsContainer">{renderRatings()}</div>
                  <ul className="Icons">{renderIcons()}</ul>
                </div>
              </div>
            </div>
          </section>
          <ReviewList
            movieId={id}
            rusTitle={rusTitle}
            engTitle={engTitle}
            reviewedByUser={reviewedByUser}
            primaryPageColor={primaryPageColor}
            secondaryPageColor={secondaryPageColor}
          />
        </>
      )}
    </div>
  );
}

export default MoviePage;
