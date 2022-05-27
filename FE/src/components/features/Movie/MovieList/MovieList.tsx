import selectStyles from 'shared/form-controls/select/styles';
import Select from 'components/shared/form-controls/Select/Select';
import Button from 'components/shared/form-controls/Button/Button';
import ContentLoader from 'components/shared/loaders/ContentLoader/ContentLoader';
import PaginateLoader from 'components/shared/loaders/PaginateLoader/PaginateLoader';
import MovieCard from '../MovieCard/MovieCard';
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

  const options = [
    { value: 'loved', label: 'Любимые фильмы' },
    { value: 'watchList', label: 'Буду смотреть' },
    { value: 'favourite', label: 'Избранное' },
  ];

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
                <div>
                  
<Select
          isMulti
          isSearchable={false}
          options={options}
          defaultValue={options[0]}
          closeMenuOnSelect={false}
          onChange={(event: any) => {
            // props.setCurrentPage(1);
            // props.paginate(1, event, props.arrowDirection);
            // props.setFetch(true);
            // props.setLoading(true);
          }}
          noOptionsMessage={() => 'Выберите категорию'}
          styles={selectStyles(
            '#b3752f81',
            'relative',
            -2,
            'pointer',
            385,
            15,
            '#fceddcd8',
            '#995506',
            '#995506',
            20,
            '#995506',
            '#b3752f81',
            '#4d0477b9',
            380,
            '#4d0477b9',
            15,
            4,
            '85%',
            3.35,
            'solid',
            '#b3752f81',
            '#4d0477b9',
            '#b3752f81',
            '#4d0477b9',
            '17px',
            230,
            '12%',
            -8,
            'hidden'
          )}
        />
        </div>
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
