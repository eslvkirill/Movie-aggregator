import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { onChangeSelectEvent } from 'redux/reducers/movieReducer';
import { resetCreator , onChangeEventCreator, getMovieFormDataCreator, addMovieCreator } from 'redux/creators/movieCreator';
import selectStyles from 'shared/form-controls/select/styles';
import Notification from 'components/shared/pop-ups/Notification/Notification';
import Button from 'components/shared/form-controls/Button/Button';
import Input from 'components/shared/form-controls//Input/Input';
import Select from 'components/shared/form-controls/Select/Select';
import { MovieFormFileds } from '../movie.enum';
import './MovieForm.scss';

const MovieForm = () => {
  const dispatch = useAppDispatch();
  const { formControls, isFormValid, notificationMessage } = useAppSelector(state => state.movieReducer);

  useEffect(() => {
    dispatch(getMovieFormDataCreator());
  }, []);

  const onResetHandlerClick = () => {
    dispatch(resetCreator());
    dispatch(getMovieFormDataCreator());
  };

  const submitNewMovie = (event: any) => {
    event.preventDefault();
    dispatch(resetCreator());
    dispatch(getMovieFormDataCreator());
  };

  const onInputChangeHandler = (event: any, controlName: string) => {
    const isInputFileField = ([MovieFormFileds.poster, MovieFormFileds.background] as string[]).includes(controlName);
    const value = isInputFileField ? event.target.files[0] : event.target.value;

    dispatch(onChangeEventCreator({ value, controlName, isInputFileField }));
  };

  const onSelectChangeHandler = (event: any, controlName: string) =>
    dispatch(onChangeSelectEvent({ value: event, controlName }));

  const renderInputs = (inputControls: any, onInputChangeHandler: any) => {
    const onAddFileClickHandler = (controlName: string) => 
      (document.getElementById(controlName) as HTMLElement).click();

    return Object.keys(inputControls).map((controlName) => {
      const control = inputControls[controlName as keyof typeof inputControls];
      const { id, type, placeholder, value, accept, valid, touched, label, autoComplete, validation, errorMessage, title } = control;

      return (
        <Input
          key={controlName}
          id={controlName}
          className={controlName}
          idSpan={controlName + id}
          type={type}
          placeholder={placeholder}
          value={value}
          accept={accept}
          valid={valid}
          touched={touched}
          label={label}
          autoComplete={autoComplete}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChangeHandler(event, controlName)}
          onClick={() => onAddFileClickHandler(controlName)}
          title={title}
        />
      );
    });
  };

  const renderSelects = (selectControls: any, onChangeSelectHandler: any) => {
    return Object.keys(selectControls).map((controlName) => {
      const control = selectControls[controlName as keyof typeof selectControls];
      const { valid, touched, validation, errorMessage, options, isMulti, isSearchable, isClearable, placeholder, closeMenuOnSelect, value } = control;
  
      return (
        <Select
          key={controlName}
          valid={valid}
          touched={touched}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          options={options}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSelectHandler(event, controlName)}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          placeholder={placeholder}
          closeMenuOnSelect={closeMenuOnSelect}
          value={value}
          styles={selectStyles()}
        />
      );
    });
  }

  return (
    <div className="movie-wrapper">
      <Notification
        showBlock={!!notificationMessage}
        rusTitle={notificationMessage}
        // rusTitle={movie.rusTitle}
      />
      {/* <h2>Создание фильма</h2> */}
      <form
        className="movie-form"
        onSubmit={(event) => submitNewMovie(event)}
      >
        <div className="movie-form__creation-title">Создание фильма</div>
        <div className="movie-form__controls">
          {renderInputs(formControls.inputControls, onInputChangeHandler)}
          {renderSelects(formControls.selectControls, onSelectChangeHandler)}
        </div>
        <div className="movie-form__buttons">
          <Button
            onClick={() => dispatch(addMovieCreator())}
            disabled={isFormValid}
            type="success"
          >
            Создать фильм
          </Button>
          <Button 
            onClick={onResetHandlerClick} 
            type="reset"
          >
            Сбросить параметры
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
