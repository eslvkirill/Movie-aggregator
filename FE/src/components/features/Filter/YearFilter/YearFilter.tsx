import Button from 'components/shared/form-controls/Button/Button';
import './YearFilter.scss';

const YearFilter = ({ yearControls, setYearControls, filterContent, setFilterContent, setCurrentPage, paginate, setLoading, setFetch, sortValue, arrowDirection, renderSelects }: any) => {
  const onChangeSelectHandler = (event: any, controlName: string) => {
    const control = yearControls[controlName];
    control.value = event;

    if (control.isMulti === false && control.value !== null) {
      filterContent[controlName] = Object.values(control)
        .map((selectValue: any) => selectValue.label && selectValue.label)
        .filter(Boolean);
    }

    yearControls[controlName] = control;

    setYearControls((prev: any) => ({...prev, ...yearControls}));

    if (control.value === null) {
      filterContent[controlName] = undefined;
    }
  };

  const yearFilterClick = () => {
    if (filterContent.to && filterContent.from) {
      setFilterContent(filterContent);
      setCurrentPage(1);
      paginate(
        1,
        sortValue === undefined ? '' : sortValue,
        arrowDirection
      );
      setLoading(true);
      setFetch(true);
    }
  }

  return (
    <div className="year-filter">
      <div className="year-filter__label">Год: </div>
      <div className="year-filter__controls">
        {renderSelects(onChangeSelectHandler, yearControls)}
      </div>
      <Button 
        type="year-filter__button submit"
        onClick={yearFilterClick}
      >
        Применить
      </Button>
    </div>
  )
}

export default YearFilter;