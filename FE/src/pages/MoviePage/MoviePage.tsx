import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKickstarterK, faImdb } from '@fortawesome/free-brands-svg-icons';
import { faM } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getMovieByIdCreator } from 'redux/creators/movieCreator';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import { setBackgroundAction } from 'redux/actions/movie/appearanceActions';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';
import ReviewList from 'components/features/Review/ReviewList/ReviewList';
import './MoviePage.scss';
import Rating from '../../components/features/Rating/Rating';

const MoviePage = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { movie, loading } = useAppSelector(state => state.movieReducer);

  const [userRating, setUserRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);

  useEffect(() => {
    dispatch(getMovieByIdCreator(id));
  }, []);


  const renderPersons = (people: string) => 
    movie[people].map((person: any) => (
      <span key={person.name}>
        <Link to={`/person/${person.id}`}>
          {person.name}
        </Link>
        {!(movie[people][movie[people].length - 1] === person) && (<span>,&nbsp;</span>)}
      </span>
    ));
  
  const renderIcons = () =>
    movie.externalAggregatorsInfo.map((agregator: any) => {
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
      movie.externalAggregatorsInfo.map((aggregator: any) => (
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
    genres,
    engTitle,
    rusTitle,
    ageRating,
    year,
    duration,
    description,
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
      className="MoviePage"
      // style={authForm ? { position: "absolute" } : {}}
    >
      {loading ? (
        <ContentLoader className="Loader" />
      ) : (
        <>
          <section
            className="FirstSection"
            style={setBackgroundAction(movie[MovieFormFileds.background])}
          >
            <div className="Wrapper">
              <div className="Genres">
                <p>{genres}</p>
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
              {/* {authForm ? (
                <Backdrop authForm={authForm} setAuthForm={setAuthForm} />
              ) : null} */}
              <Rating
                movieId={id}
                userRating={userRating}
                setUserRating={setUserRating}
                setTotalRating={setTotalRating}
                totalRating={totalRating}
                setNumberOfRatings={setNumberOfRatings}
              />
              <div className="Time">{duration}</div>
              <div className="Plot">{description}</div>
              <div className="AfterPlotBlock">
              <div className="Cast">
                Режиссёр:&nbsp;
                <span className="People">
                  {renderPersons('directors')}
                </span>
                <br />В главных ролях:&nbsp;
                <span className="People">
                  {renderPersons('actors')}
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
              </div>
            </div>
            <div className="totalRatingBlock">
              <div className="totalRating" title="Общий рейтинг">
                {/* {totalRating.toFixed(2)} */}
              </div>
              <div className="numberOfRatings" title="Количество пользователей">
                {/* {numberOfRatings} оценок */}
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
            primaryPageColor={primaryPageColor}
            secondaryPageColor={secondaryPageColor}
          />
        </>
      )}
    </div>
  );
}

export default MoviePage;
