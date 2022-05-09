import Button from 'components/shared/form-controls/Button/Button';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import PaginateLoader from 'components/shared/loaders/PaginateLoader/PaginateLoader';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';

const MovieList = (props: any) => {
  const { activeButton, isFetch, paginate, currentPage, sortValue, arrowDirection, setFetch, loading, movies, user, setMovies, numberOfElements, totalElements} = props;

  const renderOnLoadButton = () => {
    if (!activeButton && !isFetch) {
      return (
        <Button
          type="success onLoad"
          onClick={() => {
            paginate(
              currentPage,
              sortValue,
              arrowDirection
            );
            setFetch(true);
          }}
        >
          Загрузить ещё
        </Button>
      );
    }
    
    if (isFetch) {
      return <PaginateLoader />;
    }

    return '';
  };

  return (
    <section className="AllMovies">
      {loading ? (
        <ContentLoader className="Loader" />
      ) : (
        <ul>
          {movies.map((movie: any) => {
            const { id, rusTitle, engTitle, poster, price, duration, genres, year, directors, totalRating, primaryPageColor, operation } = movie;

            return (
              <li key={id} id={id}>
                <MovieCard
                  movieId={id}
                  rusTitle={rusTitle}
                  engTitle={engTitle}
                  poster={poster}
                  price={price}
                  duration={duration}
                  genres={genres}
                  year={year}
                  directors={directors}
                  movie={movie}
                  rating={totalRating}
                  backgroundColor={primaryPageColor}
                  operation={operation}
                  user={user}
                  setMovies={setMovies}
                />
              </li>
            );
          })}
          {movies.length !== 0 ? (
            <div className="buttonSection">
              <p>
                Вы просмотрели{' '}
                {!activeButton
                  ? `${numberOfElements} из ${totalElements} фильмов`
                  : 'все фильмы'}
              </p>
              <progress value={numberOfElements} max={totalElements} />
              {renderOnLoadButton()}
            </div>
          ) : (
            <div className="emptyMovies">Ничего не найдено</div>
          )}
        </ul>
      )}
    </section>
  );
};

export default MovieList;
