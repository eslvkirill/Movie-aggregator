import { useEffect, useState } from 'react';
import { validate, validateForm } from 'shared/utils/validation';
import Notification from 'components/shared/pop-ups/Notification/Notification';
import Button from 'components/shared/form-controls/Button/Button';
import { inputState } from './form-controls/input/state';
import { renderInputs } from './form-controls/input/render';
import { selectState } from './form-controls/select/state';
import './FilmForm.scss';
import { renderSelects } from './form-controls/select/render';

const FilmForm = () => {
  const [film, setFilm] = useState({});
  const [formControls, setFormControls] = useState<any>({
    inputControls: inputState,
    selectControls: selectState,
  });
  const [isFormValid, setFormValid] = useState(false);
  const [isNotificationShow, setNotificationShow] = useState(false);

  useEffect(() => {
    // dispatch(getGenresCreator())
  }, []);

  const onInputChangeHandler = (event: any, controlName: string) => {
    const { inputControls } = formControls;
    const control = { ...inputControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    console.log(event.target.value);

    let { idSpan } = control;
    idSpan = controlName + control.id;

    const span = document.getElementById(idSpan);

    // if (control.type === 'file') {
    //   const filename = event.target.files[0];

    //   if (filename === undefined) {
    //     control.valid = false;
    //     span.textContent = control.title;
    //     span.style.right = '19%';
    //     span.style.color = 'rgb(168, 145, 118)';
    //   }

    //   if (filename) {
    //     control.valid = validate(filename, control.validation);
    //     span.textContent = filename.name;
    //     span.style.color = '#c76c04';
    //     span.style.right = '17%';
    //   }

    //   film[controlName] = filename;
    //   console.log(film[controlName]);
    //   console.log(this.state);
    // } else film[controlName] = control.value;

    // if (controlName === 'trailerUrl') {
    //   film[controlName] = control.value.replace(/watch\?v=/g, 'embed/');
    //   console.log(film[controlName]);
    // }

    inputControls[controlName] = control;

    setFormControls(formControls);
    setFormValid(validateForm(formControls));
  };

  const onSelectChangeHandler = (event: any, controlName: string) => {
    const { selectControls } = formControls;
    const control = { ...selectControls[controlName] };

    console.log(event);

    control.value = event;

    if (control.value === '') {
      control.errorMessage = '';
    }

    control.valid = validate(control.value, control.validation);
    control.touched = true;

    // if (control.isMulti === false && control.value !== null) {
    //   if (controlName) {
    //     film[controlName] = Object.values(control.value)[0];
    //   }
    // }

    // if (control.isMulti === true && control.value !== null) {
    //   if (controlName)
    //     film[controlName] = control.value.map(
    //       (selectValue) => selectValue.label
    //     );
    //   if (
    //     controlName === 'genres' ||
    //     controlName === 'actors' ||
    //     controlName === 'directors'
    //   )
    //     film[controlName] = control.value.map(
    //       (selectValue) => selectValue.value
    //     );
    // }

    selectControls[controlName] = control;
    
    setFormControls(formControls);
    setFormValid(validateForm(formControls));
  };

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
        // onSubmit={(event) => submitNewFilm(event)}
      >
        <div className="film-form__creation-title">Создание фильма</div>
        <div className="film-form__inputs">
          {renderInputs(onInputChangeHandler)}
          {renderSelects(onSelectChangeHandler)}
        </div>
        <div className="film-form__buttons">
          <Button
            // onClick={() => filmAddHandler()}
            disabled={!isFormValid}
            type="success"
          >
            Создать фильм
          </Button>
          <Button 
            // onClick={() => filmResetHandler()} 
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
