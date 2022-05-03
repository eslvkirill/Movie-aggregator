import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMediumM, faKickstarterK, faImdb } from '@fortawesome/free-brands-svg-icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getMovieByIdCreator } from 'redux/creators/movieCreator';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import { setBackgroundAction } from 'redux/actions/movie/appearanceActions';
import { MovieFormFileds } from 'components/feature/Movie/movie.enum';
import './MoviePage.scss';

const MoviePage = (props: any) => {
  const dispatch = useAppDispatch();
  const { movie, loading } = useAppSelector(state => state.movieReducer);

  useEffect(() => {
    console.log(props);
    dispatch(getMovieByIdCreator('3d802a7e-5218-4f80-8379-6daa0aaed62e'));
  }, []);
  
  const renderIcons = () =>
    movie.externalAggregatorsInfo.map((agregator: any) => {
      let icon!: IconProp;

      if (agregator.name === 'Metacritic') {
        icon = faMediumM;
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
    // actors,
    // directors,
    originCountries,
    audioLanguages,
    subtitleLanguages,
    primaryPageColor,
    secondaryPageColor,
    trailerUrl,
    tagline,
    // reviews,
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
            style={setBackgroundAction(MovieFormFileds.background)}
          >
            <div className="Wrapper">
              <div className="Genres">
                <p>{genres}</p>
              </div>
              <div className="Title">
                <p>
                  {' '}
                  {engTitle}
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
              {/* <MovieRating
                user={user}
                setAuthForm={setAuthForm}
                movieId={props.match.params.id}
                userRating={userRating}
                setUserRating={setUserRating}
                setTotalRating={setTotalRating}
                totalRating={props.totalRating}
                setNumberOfRatings={setNumberOfRatings}
              /> */}
              <div className="Time">{duration}</div>
              <div className="Plot">{description}</div>
              <div className="AfterPlotBlock">
                <div className="Cast">
                  Режиссёр: 
                  <span className="People">
                    {/* {directors} */}directors
                  </span>
                  <br />В главных ролях:{' '}
                  <span className="People">
                    {/* {actors} */}actors
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
                  <Link
                    className="TrailerButton"
                    // activeClass="active"
                    to="trailer"
                    // spy
                    // smooth
                    // hashSpy
                    // offset={0}
                    // duration={900}
                    // isDynamic
                  >
                    Посмотреть трейлер
                  </Link>
                  <Link
                    className="TrailerButton ReviewButton"
                    // activeClass="active"
                    to="ReviewSection"
                    // spy
                    // smooth
                    // hashSpy
                    // offset={0}
                    // duration={900}
                    // isDynamic
                  >
                    Прочитать отзывы
                  </Link>
                </div>
                {/* {renderBuyButton()} */}
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
                  Official Trailer
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
          {/* <ReviewSection
            movieId={props.match.params.id}
            user={user}
            reviews={reviews}
            rusTitle={rusTitle}
            engTitle={engTitle}
            primaryPageColor={primaryPageColor}
            secondaryPageColor={secondaryPageColor}
            reviewButtonActive={reviewButtonActive}
            setReviewButtonActive={setReviewButtonActive}
          /> */}
        </>
      )}
    </div>
  );
}

export default MoviePage;
