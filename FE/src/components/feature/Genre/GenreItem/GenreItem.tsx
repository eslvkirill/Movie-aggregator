import "./GenreItem.scss";
import { Genre } from '../types/genre.interface';

const GenreItem = (props: { genres: Genre[] }) => (
  <ul className="genre-item">
    {props.genres.map((genre: Genre, index: number) => {
      return (
        <li key={index}>
          <div>{genre.name}</div>
        </li>
      );
    })}
  </ul>
);

export default GenreItem;
