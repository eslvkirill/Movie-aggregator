import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { createDefaultSelect } from 'shared/form-controls/select/defaultSelect';
import selectStyles from 'shared/form-controls/select/styles';
import Button from 'components/shared/form-controls/Button/Button';
import Select from 'components/shared/form-controls/Select/Select';
import './Filter.scss';

const createSelectControls = {
  genres: createDefaultSelect('По жанрам'),
  countries: createDefaultSelect('По странам'),
  directors: createDefaultSelect('По режиссёру', '', false, true),
}

const Filter = ({ isFetch, sortValue, filterContent, setFilterContent, currentPage, setCurrentPage, arrowDirection, paginate, setLoading, setFetch }: any) => {
  const [dropup, setDropup] = useState<any>(false);

  const [selectControls, setSelectControls] = useState<any>(createSelectControls);

  useEffect(() => {
    const loadSelectContent = async () => {
      try {
        await axios.get('/api/movies/filters').then((response) => {
          Object.keys(response.data).map((dataName) => {
            const data = response.data[dataName];

            let initialState = data.map((data: any, index: number) => ({
              label: data,
              value: index,
            }));

            if (dataName === 'genres' || dataName === 'directors') {
              initialState = response.data[dataName].map((content: any) => ({
                label: content.name,
                value: content.id,
              }));
            }

            Object.keys(selectControls).map((controlName) => {
              const control = selectControls[controlName];
              if (dataName === controlName) control.options = initialState;
              return selectControls;
            });

            return initialState;
          });
          setSelectControls(selectControls);
        });
      } catch (e) {
        console.log(e);
      }
    };

    loadSelectContent();
  }, []);

  const onChangeSelectHandler = (event: any, controlName: string) => {
    const control = { ...selectControls[controlName] };
    control.value = event;

    if (control.isMulti === false && control.value !== null) {
      // eslint-disable-next-line prefer-destructuring
      filterContent[controlName] = Object.values(control.value)[1];
    }
    if (control.isMulti === true && control.value !== null) {
      filterContent[controlName] = control.value.map((selectValue: any) =>
        controlName === 'countries' ? selectValue.label : selectValue.value
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

  
  const renderSelects = () => {
    return Object.keys(selectControls).map((controlName) => {
      const control = selectControls[controlName];
      return (
        <Select
          key={controlName}
          options={control.options}
          onChange={(event: any) => onChangeSelectHandler(event, controlName)}
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
          {renderSelects()}
          <div
            className="closeDropup"
            onClick={() => setDropup(!dropup)}
          >
            ✖
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Filter;
