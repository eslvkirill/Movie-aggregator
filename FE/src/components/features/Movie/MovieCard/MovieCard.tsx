import { Link } from 'react-router-dom';
import './MovieCard.scss';

const MovieCard = ({ movieId, poster, year, rating, engTitle, rusTitle, backgroundColor, genres, duration, directors}: any) => (
  <div className="Cards">
    <Link to={`/movies/${movieId}`}>
      <div
        className="FrontSide"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)), 
          url("data:image/*;base64,${poster}")`,
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="contentCard">
          <div className="topOfCardContent">
            <div className="year">{year}г.</div>
            {/* <div className="rating">{rating.toFixed(1)}</div> */}
          </div>
          <div className="titles">
            <div className="engTitle">{engTitle}</div>
            <div className="rusTitle">{rusTitle}</div>
          </div>
          <i>Наведите на фото</i>
        </div>
      </div>
      <div
        className="BackSide"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, 0.5))`,
          backgroundColor: backgroundColor,
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="BackItem">
          <div className="titles">
            <div className="engTitle">{engTitle}</div>
            <div className="rusTitle">{rusTitle}</div>
          </div>
          <div className="bottomOfBackItem">
            <div className="details">
              <div className="genres">
                жанр: <div>{genres}</div>
              </div>
              <div className="time">
                длительность: <div>{duration}</div>
              </div>
              <div className="director">
                режиссёр: <div>{directors}</div>
              </div>
            </div>
            <div className="linkToMoviePage">➤ к фильму</div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default MovieCard;
