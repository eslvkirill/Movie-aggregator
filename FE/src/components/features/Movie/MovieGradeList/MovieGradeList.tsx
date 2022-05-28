import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import { Link } from 'react-router-dom';
import './MovieGradeList.scss';

const MovieGradeList = ({ movies }: any) => {

  return (
    <div className="movie-grade-list">
      {!movies.length ? (
        <ContentLoader />
      ) : (
        <div className="orderDetails basket">
          <div className="reviewWrapper myFilmsWrapper">
            <div className="content">
              {movies.map((movie: any) => (
                <div
                  className="reviewCard myFilmsCard"
                  key={movie.id}
                  id={movie.id}
                >
                  <div className="myFilmsParts">
                    <Link
                      to={`/movies/${movie.id}`}
                      style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1)),
                                          url("data:image/*;base64,${movie.poster}")`,
                        backgroundSize: 'cover',
                        backgroundPositionX: 'center',
                        backgroundPositionY: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <div className="InfoWrapper">
                      <div className="filmsInfo">
                        <div className="reviewElement reviewsTitle filmsTitle">
                          {movie.engTitle}
                        </div>
                        <div className="reviewElement reviewsTitle filmsTitle">
                          {movie.rusTitle}
                        </div>
                      </div>
                      <div className="filmsInfo">
                        <div className="reviewElement filmGenre">
                          {movie.genres}
                        </div>
                        <div className="reviewElement reviewText myFilmsText">
                          реж. {movie.directors} ({movie.year} г.)
                        </div>
                      </div>
                    </div>
                    <div className="filmPrice">{movie.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default MovieGradeList;
