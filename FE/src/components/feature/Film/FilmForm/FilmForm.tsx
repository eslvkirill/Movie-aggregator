import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { onChangeSelectEvent } from 'redux/reducers/filmFormReducer';
import { resetCreator , onChangeEventCreator } from 'redux/creators/filmFormCreator';
import Notification from 'components/shared/pop-ups/Notification/Notification';
import Button from 'components/shared/form-controls/Button/Button';
import { renderInputs } from './form-controls/input-render';
import { renderSelects } from './form-controls/select-render';
import { FilmFormFileds } from './filmForm.enum';
import './FilmForm.scss';

const FilmForm = () => {
  const dispatch = useAppDispatch();
  const { formControls, film, isFormValid } = useAppSelector(state => state.filmFormReducer);
  const [isNotificationShow, setNotificationShow] = useState(false);

  useEffect(() => {
    try {
      console.log(formControls);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onResetHandlerClick = () => dispatch(resetCreator());
  // setNotificationShow(false);

  const submitNewFilm = (event: any) => {
    event.preventDefault();
    dispatch(resetCreator());
    // setNotificationShow(true);
  };


  const onInputChangeHandler = (event: any, controlName: string) => {
    const isInputFileField = ([FilmFormFileds.poster, FilmFormFileds.background] as string[]).includes(controlName);
    const value = isInputFileField ? event.target.files[0] : event.target.value;

    dispatch(onChangeEventCreator({ value, controlName, isInputFileField }));
  };

  const onSelectChangeHandler = (event: any, controlName: string) => 
    dispatch(onChangeSelectEvent({ value: event.target.value, controlName }));

  return (
    <div className="film-wrapper">
      <Notification
        showBlock={isNotificationShow}
        rusTitle='film'
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
            // onClick={filmAddHandler}
            disabled={!isFormValid}
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
