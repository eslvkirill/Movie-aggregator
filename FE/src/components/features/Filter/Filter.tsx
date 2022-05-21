import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { createDefaultSelect } from 'shared/form-controls/select/defaultSelect';
import selectStyles from 'shared/form-controls/select/styles';
import { getAllMovieYears } from 'shared/utils/common';
import GenreService from 'components/features/Genre/genre.service';
import YearFilter from 'components/features/Filter/YearFilter/YearFilter';
import Button from 'components/shared/form-controls/Button/Button';
import Select from 'components/shared/form-controls/Select/Select';
import PersonService from '../Person/person.service';
import { MovieFormFileds } from '../Movie/movie.enum';
import MovieService from '../Movie/movie.service';
import './Filter.scss';

const createSelectControls = {
  [MovieFormFileds.GENRES]: createDefaultSelect('По жанрам'),
  [MovieFormFileds.ORIGIN_COUNTRIES]: createDefaultSelect('По странам'),
  [MovieFormFileds.ACTORS]: createDefaultSelect('По aктёру'),
  [MovieFormFileds.DIRECTORS]: createDefaultSelect('По режиссёру', '', false, true),
}

const yearSelectControls: any = {
  from: createDefaultSelect('C ....', '', false, true),
  to: createDefaultSelect('По ....', '', false, true),
}

const Filter = ({ isFetch, sortValue, filterContent, setFilterContent, currentPage, setCurrentPage, arrowDirection, paginate, setLoading, setFetch }: any) => {
  const [dropup, setDropup] = useState<any>(false);
  const [selectControls, setSelectControls] = useState<any>(createSelectControls);
  const [yearControls, setYearControls] = useState<any>(yearSelectControls);

  const personService = PersonService;
  const genreService = GenreService;
  const movieService = MovieService;

  useEffect(() => {
    const loadSelectContent = async () => {
      try {
        const persons = await personService.getAllPersons();
        const genres = await genreService.getGenres();
        const originCountries = await movieService.getOriginCountries();
        const years = getAllMovieYears(2023);
        
        const response: any = { 
          actors: persons, 
          directors: persons,
          to: years, 
          from: years,
          genres,
          originCountries 
        };

          Object.keys(response).map((dataName) => {
            const data = response[dataName];
            const customMovieFields: string[] = [
              MovieFormFileds.GENRES, 
              MovieFormFileds.ACTORS, 
              MovieFormFileds.DIRECTORS
            ];

            let initialState = data.map((data: any, index: number) => ({
              label: data,
              value: index,
            }));

            if (customMovieFields.includes(dataName)) {
              initialState = response[dataName].map((content: any) => ({
                label: content.name,
                value: content.id,
              }));
            }

            Object.keys(selectControls).map((controlName) => {
              const control = selectControls[controlName];

              if (dataName === controlName) {
                control.options = initialState
              };

              return selectControls;
            });

            Object.keys(yearControls).map((controlName) => {
              const control = yearControls[controlName];

              if (dataName === controlName) {
                control.options = initialState
              };

              return yearControls;
            });

            return initialState;
          });

          setSelectControls(selectControls);
          setYearControls(yearControls);
      } catch (e) {
        console.log(e);
      }
    };

    loadSelectContent();
  }, []);

  const resetFilters = () => {
    setDropup(!dropup)
    setFilterContent({});
    Object.values(selectControls).map((fieldName: any) => fieldName.value = '');
    Object.values(yearControls).map((fieldName: any) => fieldName.value = '');
  }

  const onChangeSelectHandler = (event: any, controlName: string) => {
    const control = { ...selectControls[controlName] };
    control.value = event;

    if (control.isMulti === false && control.value !== null) {
      // eslint-disable-next-line prefer-destructuring
      filterContent[controlName] = Object.values(control.value)[1];
    } else if (control.isMulti === true && control.value !== null) {
      filterContent[controlName] = control.value.map((selectValue: any) =>
        controlName === MovieFormFileds.ORIGIN_COUNTRIES ? selectValue.label : selectValue.value
      );
    }

    selectControls[controlName] = control;

    setFilterContent(filterContent);
    setSelectControls(selectControls);

    if (control.value === null) {
      filterContent[controlName] = undefined;
    }

    setCurrentPage(1);
    paginate(
      1,
      sortValue === undefined ? '' : sortValue,
      arrowDirection
    );
    setLoading(true);
    setFetch(true);
  };

  const renderSelects = (onChangeFunction: any, selectControls: any) => {
    return Object.keys(selectControls).map((controlName) => {
      const control = selectControls[controlName];
      
      return (
        <Select
          key={controlName}
          options={control.options}
          onChange={(event: any) => onChangeFunction(event, controlName)}
          isMulti={control.isMulti}
          isSearchable={control.isSearchable}
          isClearable={control.isClearable}
          placeholder={control.placeholder}
          closeMenuOnSelect={control.closeMenuOnSelect}
          noOptionsMessage={control.noOptionsMessage}
          value={control.value}
          styles={selectStyles(
            '#fceddcd8',
            'relative',
            0,
            'pointer',
            272,
            15,
            '#4d0477b9',
            '#fceddcd8',
            '#fceddcd8',
            20,
            '#fceddcd8',
            '#fceddcd8',
            '#d67506af',
            270,
            '#d67506af',
            15,
            4,
            '85%',
            3.35,
            'solid',
            '#fceddcd8',
            '#995506',
            '#fceddcd8',
            '#d67506af',
            '17px',
            180,
            '75%',
            2
          )}
        />
      );
    });
  };


  return (
    <div
      className="filtersWrapper"
      style={
        isFetch
          ? {
              opacity: '0.85',
              transition: '0.3s',
              pointerEvents: 'none',
            }
          : {}
      }
    >
      <div className="filterText">
        <Button type="success" onClick={() => setDropup(!dropup)}>
          Фильтрация
          <span className={dropup ? 'up' : 'down'}>➤</span>
        </Button>
      </div>
      <CSSTransition
        in={dropup}
        appear
        exit
        unmountOnExit
        classNames="dropup"
        timeout={{
          enter: 300,
          exit: 200,
        }}
      >
        <div className="dropupBlock">
          {renderSelects(onChangeSelectHandler, selectControls)}
          <YearFilter 
            yearControls={yearControls}
            setYearControls={setYearControls}
            renderSelects={renderSelects}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
            setLoading={setLoading}
            setFetch={setFetch}
            sortValue={sortValue}
            arrowDirection={arrowDirection}
            filterContent={filterContent} 
            setFilterContent={setFilterContent} 
          />
          <div
            className="closeDropup"
            onClick={resetFilters}
          >
            ✖
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Filter;
