import "./GenreItem.scss";

const GenreItem = (props) => (
  <ul className="genre-item">
    {props.genres.map((genre, index) => {
      return (
        <li key={index}>
          <div>{genre.name}</div>
        </li>
      );
    })}
  </ul>
);

export default GenreItem;
