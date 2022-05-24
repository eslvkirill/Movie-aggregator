import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from 'hooks/redux';
import { reset } from 'redux/reducers/searchReducer';
import { movieConstructor } from 'shared/utils/common';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';
import MovieList from 'components/features/Movie/MovieList/MovieList';
import Sort from 'components/features/Sort/Sort';
import Filter from 'components/features/Filter/Filter';
import './HomePage.scss';
import { RATING } from 'redux/initial-state/ratingState/rating.enum';

const HomePage = () => {
  const dispatch = useAppDispatch();

  const [movies, setMovies] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(true);
  const [isFetch, setFetch] = useState(true);

  const [arrowDirection, setArrowDirection] = useState<any>(false);
  const [sortValue, setSortValue] = useState<any>();
  const [filterContent, setFilterContent] = useState<any>({});
  
  const sortOptions = [
    { value: `${RATING.TOTAL}_RATING`, label: 'Общему рейтингу (по умолчанию)' },
    { value: `${RATING.SCREENPLAY}_RATING`, label: 'Рейтингу за сценарий' },
    { value: `${RATING.ACTING}_RATING`, label: 'Рейтингу по актёрской игре' },
    { value: `${RATING.SHOOTING}_RATING`, label: 'Рейтингу за операторскую работу' },
    { value: `${RATING.DECORATION}_RATING`, label: 'Рейтингу по худ. оформлению' },
    { value: `${RATING.SOUNDTRACK}_RATING`, label: 'Рейтингу по звуку и музыке' },
    { value: `${RATING.SPECIAL_EFFECTS}_RATING`, label: 'Рейтингу за спецэффекты' },
    { value: `${RATING.ATMOSPHERE}_RATING`, label: 'Рейтингу по атмосферности' },
  ];

  const paginate = async (pageNumber: number, sortFieldName: any, sortDirection: string) => {
    try {
      const paginationSize = 3;

      const filtersQuery = `${filterContent[MovieFormFileds.GENRES] ? `&${MovieFormFileds.GENRES}=${filterContent[MovieFormFileds.GENRES]}` : ''}${filterContent[MovieFormFileds.FILTER_COUNTRIES] ? `&${MovieFormFileds.FILTER_COUNTRIES}=${filterContent[MovieFormFileds.FILTER_COUNTRIES]}` : ''}${filterContent[MovieFormFileds.ACTORS] ? `&${MovieFormFileds.ACTORS}=${filterContent[MovieFormFileds.ACTORS]}` : ''}${filterContent[MovieFormFileds.DIRECTORS] ? `&${MovieFormFileds.DIRECTORS}=${filterContent[MovieFormFileds.DIRECTORS]}` : ''}${filterContent.fromYear && filterContent.toYear ? `&fromYear=${filterContent.fromYear}&toYear=${filterContent.toYear}` : ''}`;

      const sortQuery = sortFieldName && `sort=${sortFieldName.value},${sortDirection ? 'ASC' : 'DESC'}`;

      await axios
        .get(`/api/v1/movies?size=${paginationSize}&page=${pageNumber - 1}&${sortQuery}${filtersQuery}`)
          .then((response) => {
            if (sortFieldName === undefined) {
              if (response.data.last === false) setActiveButton(false);
              else setActiveButton(true);

              setCurrentPage(() => currentPage + 1);
              setNumberOfElements(
                (prevNumber: number) => prevNumber + response.data.numberOfElements
              );
              setTotalElements(response.data.totalElements);
              setMovies((movies: any) => [
                ...movies,
                ...movieConstructor(response.data.content),
              ]);
              setLoading(false);
              setFetch(false);
            }

            if (sortFieldName !== undefined) {
              setSortValue(sortFieldName);
              setNumberOfElements(response.data.numberOfElements);
              setTotalElements(response.data.totalElements);
              setMovies(movieConstructor(response.data.content));
              setCurrentPage((currentPage: number) => currentPage + 1);
              setLoading(false);
              setFetch(false);

              if (!response.data.first) {
                setNumberOfElements((prev: number) => prev + numberOfElements);
              } else setNumberOfElements(response.data.numberOfElements);

              if (response.data.totalPages > 1 && !response.data.first) {
                setTotalElements(response.data.totalElements);

                setMovies(() => [
                  ...movies,
                  ...movieConstructor(response.data.content),
                ]);

                if (response.data.last) {
                  setActiveButton(true);
                  setFetch(false);
                }
              }
            }

            if (
              (response.data.first && !response.data.last) ||
              (!response.data.first && !response.data.last)
            ) {
              setActiveButton(false);
            }

            if (response.data.first && response.data.last) setActiveButton(true);
          });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(reset());
    paginate(currentPage, sortOptions[0], arrowDirection);
  }, []);
  
  return (
    <main className="home-page">
      <div className="home-page__description-wrapper description-wrapper">
        <hr className="description-wrapper_first-line hr-line" />
        <div className="description-wrapper__description description">
          Хотите посмотреть хороший фильм, но не знаете, какой выбрать? На
          данной странице собраны одни из лучших фильмов по различным жанрам, Вы
          сможете выбрать именно ту кинокартину, которая Вам действительно
          понравится и запомнится надолго.
        </div>
        <hr className="description-wrapper_second-line hr-line" />
      </div>

      <section className="operations-section">
        <Filter
          sortValue={sortValue}
          filterContent={filterContent}
          setFilterContent={setFilterContent}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginate={paginate}
          arrowDirection={arrowDirection}
          isFetch={isFetch}
          setFetch={setFetch}
          setLoading={setLoading}
        />
        <Sort
          options={sortOptions}
          sortValue={sortValue}
          arrowDirection={arrowDirection}
          setArrowDirection={setArrowDirection}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginate={paginate}
          isFetch={isFetch}
          setFetch={setFetch}
          setLoading={setLoading}
        />
      </section>
      <MovieList 
        sortValue={sortValue}
        setMovies={setMovies}
        movies={movies}
        isLoading={isLoading}
        numberOfElements={numberOfElements}
        totalElements={totalElements}
        currentPage={currentPage}
        activeButton={activeButton}
        paginate={paginate}
        isFetch={isFetch}
        setFetch={setFetch}
        arrowDirection={arrowDirection}
      />
    </main>
  );
};

export default HomePage;
