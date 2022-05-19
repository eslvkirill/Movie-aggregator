import { Link, useParams } from 'react-router-dom';
import { renderPersons } from 'shared/utils/render';
import './MovieCard.scss';

const MovieCard = ({ movieId, poster, year, totalRating, engTitle, rusTitle, backgroundColor, genres, duration, directors }: any) => {
  const { id } = useParams() as { id: string };
  
  const genresValue = Array.isArray(genres) && genres.map((field: any) => field.name).join(', ');
  const durationParts = duration.split(':');
  const durationValue = Array.isArray(genres) ? `${durationParts[0]}ч ${durationParts[1]}м` : false;

  return (
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
            <div className="rating">{totalRating.toFixed(1)}</div>
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
                жанр: <div>{genresValue || genres}</div>
              </div>
              <div className="time">
                длительность: <div>{ durationValue || duration}</div>
              </div>
              <div className="director-section">
                режиссёр: {renderPersons(directors, id)}
              </div>
            </div>
            <div className="linkToMoviePage">➤ к фильму</div>
          </div>
        </div>
      </div>
    </Link>
  </div>
  );
}

export default MovieCard;
