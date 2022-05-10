import { useEffect, useState } from 'react';
import axios from 'axios';
import { inputState } from 'redux/initial-state/personState/input';
import { textareaState } from 'redux/initial-state/personState/textarea';
import { validate, validateForm } from 'shared/utils/validation';
import Input from 'components/shared/form-controls/Input/Input';
import Button from 'components/shared/form-controls/Button/Button';
import Textarea from 'components/shared/form-controls/Textarea/Textarea';
import './PersonList.scss';

const PersonList = () => {
  const [formControls, setFormControls] = useState<any>({
    inputControls: inputState,
    textareaControls: textareaState,
  });
  const [isFormValid, setFormValid] = useState(false);
  const [person, setPerson] = useState<any>({});
  
  useEffect(() => {
    setFormControls({
      inputControls: inputState,
      textareaControls: textareaState,
    });
  }, []);

  const personAddHandler = async () => {
    try {
      const formData = Object.keys(person).reduce((formData, name) => {
        formData.append(name, person[name as keyof typeof person]);
        return formData;
      }, new FormData());

      await axios({
        method: 'post',
        headers: {
          contentType: 'multipart/form-data',
        },
        url: '/api/v1/people',
        data: formData,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const personSubmitHandler = (event: any) => {
    event.preventDefault();
    clearInputs();
    setFormValid(false);
  };

  const clearInputs = () => {
    const { inputControls, textareaControls } = formControls;

    textareaControls.biography.value = '';

    Object.keys(inputControls).map((controlName) => {
      const control = formControls[controlName];
      control.idSpan = controlName + control.id;
      control.value = '';

      if (control.type === 'file') {
        const span = document.getElementById(control.idSpan) as HTMLElement;
        span.textContent = control.title;
        span.style.right = '19%';
        span.style.color = 'rgb(168, 145, 118)';
      }

      return inputControls;
    });
  };

  const onAddFileClickHandler = (controlName: string) => {
    (document.getElementById(controlName) as HTMLElement).click();
  };

  const onChangeInputHandler = (event: any, controlName: string) => {
    const { inputControls } = formControls;

    const control = { ...inputControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    let { idSpan } = control;
    idSpan = controlName + control.id;
    const span = document.getElementById(idSpan) as HTMLElement;

    if (control.type === 'file') {
      const filename = event.target.files[0];
      if (filename === undefined) {
        control.valid = false;
        span.textContent = control.title;
        span.style.right = '19%';
        span.style.color = 'rgb(168, 145, 118)';
      }

      if (filename) {
        control.valid = validate(filename, control.validation);
        span.textContent = filename.name;
        span.style.color = '#c76c04';
        span.style.right = '17%';
      }
      person[controlName] = filename;
    } else {
      person[controlName] = control.value;
    }

    inputControls[controlName] = control;

    setPerson(person);
    setFormControls((prev: any) => ({ ...prev, ...inputControls }));
    setFormValid(validateForm(formControls));
  };

  const onChangeTextareaHandler = (event: any, controlName: string) => {
    const { textareaControls } = formControls;
    const control = { ... textareaControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation) as boolean;

    textareaControls[controlName] = control;
    person[controlName] = control.value;

    setPerson(person);
    setFormControls((prevState: any) => ({ ...prevState, ...textareaControls }));
    setFormValid(validateForm(formControls));
  };

  const renderInputs = () => {
    const { inputControls } = formControls;

    return Object.keys(inputControls).map((controlName) => {
      const control = inputControls[controlName];

      return (
        <Input
          key={controlName}
          id={controlName}
          idSpan={controlName + control.id}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          accept={control.accept}
          label={control.label}
          valid={control.valid}
          title={control.title}
          touched={control.touched}
          autoComplete={control.autoComplete}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeInputHandler(event, controlName)}
          onClick={() => onAddFileClickHandler(controlName)}
        />
      );
    });
  };

  const renderTextarea = () => {
    const { textareaControls } = formControls;
    
    return Object.keys(textareaControls).map((controlName) => {
      const control = textareaControls[controlName];

      return (
        <Textarea
          key={controlName}
          id={controlName}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event: any) => onChangeTextareaHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className="person-list">
      <form 
        className="person-list__form from"
        onSubmit={(event) => personSubmitHandler(event)}
      >
        <div className="from__controls controls">
          <div className="controls__inputs">
            {renderInputs()}
          </div>
          {renderTextarea()}
          </div>
        <Button
          onClick={personAddHandler}
          type="addPerson"
          disabled={!isFormValid}
        >
          Добавить
        </Button>
      </form>
    </div>
  );
}

export default PersonList;
