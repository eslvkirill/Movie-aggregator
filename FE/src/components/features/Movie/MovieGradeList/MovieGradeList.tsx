import RatingItem from 'components/features/Rating/RatingItem/RatingItem';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import { Link } from 'react-router-dom';
import { dateConverter } from 'shared/utils/common';
import { renderPersons } from 'shared/utils/render';
import './MovieGradeList.scss';

const MovieGradeList = ({ movies }: any) => (
  <div className="movie-grade-list">
    {!movies.length ? (
      <ContentLoader />
    ) : (
      <div className="list-wrapper">
        {movies.map((movie: any) => {
          const genresValue = Array.isArray(movie.genres) && movie.genres.map((field: any) => field.name).join(', ');
          
          return (
            <div
              className="grade-row"
              key={movie.id}
              id={movie.id}
            >
              <Link
                to={`/movies/${movie.id}`}
                className="grade-row__poster"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1)),
                                    url("data:image/*;base64,${movie.poster}")`,
                  backgroundSize: 'cover',
                  backgroundPositionX: 'center',
                  backgroundPositionY: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="movie-info">
                <Link to={`/movies/${movie.id}`} className="movie-info__titles titles">
                  <div className="titles__engTitle">
                    {movie.engTitle}
                  </div>
                  <div className="titles__rusTitle">
                    {movie.rusTitle}
                  </div>
                </Link>
                <div className="movie-info__other-info other-info">
                  <div className="other-info__genres">
                    {genresValue}
                  </div>
                  <div className="other-info__bootom-block bottom-block">
                    реж. 
                    <span className="bottom-block__directors">
                      &nbsp;{renderPersons(movie.directors)}&nbsp;
                    </span> 
                    ({movie.year} г.)
                  </div>
                </div>
              </div>
              <div 
                className="movie-info__userRating"
                title={`Рейтинг равен ${movie.userRating}`}
              >
                <RatingItem score={movie.userRating} disabled />
                <div className="movie-rating">{movie.userRating}</div>
              </div>
              <div className="movie-info__ratingDate">Дата: {dateConverter(movie.ratingDate)}</div>
            </div>
        )})}
      </div>
    )}
  </div>
)

export default MovieGradeList;
