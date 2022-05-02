import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { onChangeSelectEvent } from 'redux/reducers/filmFormReducer';
import { resetCreator , onChangeEventCreator, getFilmFormDataCreator, addFilmCreator } from 'redux/creators/filmFormCreator';
import Notification from 'components/shared/pop-ups/Notification/Notification';
import Button from 'components/shared/form-controls/Button/Button';
import { renderInputs } from './form-controls/input-render';
import { renderSelects } from './form-controls/select-render';
import { FilmFormFileds } from './filmForm.enum';
import './FilmForm.scss';

const FilmForm = () => {
  const dispatch = useAppDispatch();
  const { formControls, isFormValid, notificationMessage } = useAppSelector(state => state.filmFormReducer);

  useEffect(() => {
    dispatch(getFilmFormDataCreator());
  }, []);

  const onResetHandlerClick = () => {
    dispatch(resetCreator());
    dispatch(getFilmFormDataCreator());
  };

  const submitNewFilm = (event: any) => {
    event.preventDefault();
    dispatch(resetCreator());
    dispatch(getFilmFormDataCreator());
  };

  const onInputChangeHandler = (event: any, controlName: string) => {
    const isInputFileField = ([FilmFormFileds.poster, FilmFormFileds.background] as string[]).includes(controlName);
    const value = isInputFileField ? event.target.files[0] : event.target.value;

    dispatch(onChangeEventCreator({ value, controlName, isInputFileField }));
  };

  const onSelectChangeHandler = (event: any, controlName: string) =>
    dispatch(onChangeSelectEvent({ value: event, controlName }));

  return (
    <div className="film-wrapper">
      <Notification
        showBlock={!!notificationMessage}
        rusTitle={notificationMessage}
        // rusTitle={film.rusTitle}
      />
      {/* <h2>Создание фильма</h2> */}
      <form
        className="film-form"
        onSubmit={(event) => submitNewFilm(event)}
      >
        <div className="film-form__creation-title">Создание фильма</div>
        <div className="film-form__controls">
          {renderInputs(formControls.inputControls, onInputChangeHandler)}
          {renderSelects(formControls.selectControls, onSelectChangeHandler)}
        </div>
        <div className="film-form__buttons">
          <Button
            onClick={() => dispatch(addFilmCreator())}
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

export default FilmForm;
