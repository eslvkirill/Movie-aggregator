import { useEffect, useState } from 'react';
import axios from 'axios';
import { movieConstructor } from 'shared/utils/common';
import MovieList from 'components/features/Movie/MovieList/MovieList';
import { MovieFormFileds } from 'components/features/Movie/movie.enum';
import './HomePage.scss';

const HomePage = () => {
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [numberOfElements, setNumberOfElements] = useState<any>(0);
  const [totalElements, setTotalElements] = useState<any>(0);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [activeButton, setActiveButton] = useState<any>(true);
  const [isFetch, setFetch] = useState<any>(true);

  const [arrowDirection, setArrowDirection] = useState<any>(true);
  const [sortValue, setSortValue] = useState<any>();
  const [filterContent, setFilterContent] = useState<any>({});
  
  const sortOptions = [
    { value: 'id', label: 'Умолчанию' },
    { value: 'rusTitle', label: 'Русскому названию' },
    { value: 'engTitle', label: 'Оригинальному названию' },
    { value: 'year', label: 'Году создания' },
    { value: 'totalRating', label: 'Рейтингу' },
    { value: 'price', label: 'Цене' },
  ];

  const paginate = async (pageNumber: number, sortFieldName: any, sortDirection: string) => {
    try {
      const filtersQuery = `
        ${filterContent[MovieFormFileds.genres] && `&${MovieFormFileds.genres}=${filterContent[MovieFormFileds.genres]}`}
        ${filterContent[MovieFormFileds.originCountries] && `&${MovieFormFileds.originCountries}=${filterContent[MovieFormFileds.originCountries]}`}
        ${filterContent[MovieFormFileds.directors] && `&${MovieFormFileds.directors}=${filterContent[MovieFormFileds.directors]}`}
      `;

      const sortQuery = sortFieldName && `&sort=${sortFieldName.value},${sortDirection ? 'asc' : 'desc'}`;

      await axios
        .get(`/api/v1/movies?page=${pageNumber - 1}${filtersQuery}${sortQuery}`)
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

      <MovieList 
        sortValue={sortValue}
        setMovies={setMovies}
        movies={movies}
        loading={loading}
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
