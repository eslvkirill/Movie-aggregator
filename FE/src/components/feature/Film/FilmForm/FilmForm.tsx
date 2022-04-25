import { useState } from 'react';
import Notification from 'components/shared/pop-ups/Notification/Notification';
import Button from 'components/shared/form-controls/Button/Button';
import './FilmForm.scss';
import { createFormInput } from './form-controls/input';
import { createFormSelect } from './form-controls/select';

const FilmForm = () => {
  const [film, setFilm] = useState({});
  const [formControls, setFormControls] = useState<any>({
    formInputsControls: createFormInput(),
    formSelectControls: createFormSelect(),
  });
  const [isFormValid, setFormValid] = useState(false);
  const [isNotificationShow, setNotificationShow] = useState(false);


  return (
    <div className="film-wrapper">
      <Notification
        showBlock={isNotificationShow}
        rusTitle={film.rusTitle}
      />
      {/* <h2>Создание фильма</h2> */}
      <form
        className="film-form"
        onSubmit={(event) => submitNewFilm(event)}
      >
        <div className="film-form__creation-title">Создание фильма</div>
        <div className="film-form__inputs">
          {renderInputs()}
          {renderSelects()}
        </div>
        <div className="film-form__buttons">
          <Button
            onClick={() => filmAddHandler()}
            disabled={!isFormValid}
            type="success"
          >
            Создать фильм
          </Button>
          <Button 
            onClick={() => filmResetHandler()} 
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
