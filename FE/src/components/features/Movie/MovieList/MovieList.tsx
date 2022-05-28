import Button from 'components/shared/form-controls/Button/Button';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import PaginateLoader from 'components/shared/loaders/PaginateLoader/PaginateLoader';
import MovieCard from '../MovieCard/MovieCard';
import MovieCategories from '../MovieCategories/MovieCategories';
import './MovieList.scss';

const MovieList = (props: any) => {
  const { activeButton, isFetch, paginate, currentPage, sortValue, arrowDirection, setFetch, isLoading, movies, user, setMovies, numberOfElements, totalElements } = props;

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
      {isLoading ? (
        <ContentLoader className="Loader" />
      ) : (
        <ul>
          {movies.length > 0 ? movies.map((movie: any) => {
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
                  totalRating={totalRating}
                  backgroundColor={primaryPageColor}
                  operation={operation}
                  user={user}
                  setMovies={setMovies}
                />
                <MovieCategories movieId={id} />
              </li>
            );
          }) : <div className="emptyMovies">Ничего не найдено</div>}
          {!!(totalElements && movies.length !== 0) && (
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
            // totalElements && <div className="emptyMovies">Ничего не найдено</div>
          )}
        </ul>
      )}
    </section>
  );
};

export default MovieList;
