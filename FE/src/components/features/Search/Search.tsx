import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setSearchValueCreator } from 'redux/creators/searchCreator';
import { onChange, reset } from 'redux/reducers/searchReducer';
import Input from 'components/shared/form-controls/Input/Input';
import './Search.scss';

const Search = () => {
  const dispatch = useAppDispatch();
  const { movies, value, isLoading, error } = useAppSelector(state => state.searchReducer);

  // TODO: Добавить Debounce
  const onChangeHandler = (event: any) => {
    dispatch(onChange(event.target.value))

    if (event.target.value.length > 1) {
      dispatch(setSearchValueCreator());
    } else if (!event.target.value) {
      dispatch(reset());
    }
  }

  const renderMovies = () =>
    !!movies.length && movies.map((movie: any) => (
      <Link 
        key={movie.id} 
        to={`/movies/${movie.id}`} 
        onClick={() => dispatch(reset())}
        className="movie" 
      >
        <div className="movie-info">
          <div
            title="Постер фильма"
            className="poster"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.2)), 
              url("data:image/*;base64,${movie.poster}")`,
              backgroundSize: 'cover',
              backgroundPositionX: 'center',
              backgroundPositionY: 'center',
              backgroundRepeat: 'no-repeat',
            }}
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
            {movie.totalRating.toFixed(1)}
          </div>
        </div>
      </Link>
    ));

  return (
    <div className="search-wrapper">
      <div className="search">
        <Input 
          type="search__input" 
          value={value}
          onChange={(event) => onChangeHandler(event)} 
        />
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