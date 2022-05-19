import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from 'components/shared/form-controls/Input/Input';
import './Search.scss';

const movies = [
  {id: '1', engTitle: 'qwer', rusTitle: 'qwer', year: 2005, rating: 8.8, poster: ''},
  {id: '2', engTitle: 'qwer', rusTitle: 'qwer', year: 2005, rating: 8.8, poster: ''},
  {id: '3', engTitle: 'qwer', rusTitle: 'qwer', year: 2005, rating: 8.8, poster: ''},
]

const Search = () => {
  const renderMovies = () =>
      movies.map((movie: any) => (
        <div key={movie.id} className="movie">
          <div className="movie-info">
            <img
              src={`data:image/*;base64,${movie.poster}`}
              alt="Постер фильма"
              className="poster"
            />
            <div className="left-section">
              <div className="left-section__english-title english-title">
                {movie.engTitle}
              </div>
              <div className="left-section__bottom">
                <div className="left-section__russian-title russian-title">
                  {movie.rusTitle},
                </div>
                <div className="left-section__year year">
                  {movie.year} г.
                </div>
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="movie-rating">
              {movie.rating}
            </div>
          </div>
        </div>
      ));

  return (
    <div className="search-wrapper">
      <div className="search">
        <Input type="search__input" />
        <div className="search__btn">
          <FontAwesomeIcon icon={faSearch} title="Поиск" />
        </div>
      </div>
      <div className="render-result">
        {renderMovies()}
      </div>
    </div>
  )
}

export default Search;