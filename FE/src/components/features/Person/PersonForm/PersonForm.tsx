import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { onChangeTextareaEvent, reset } from 'redux/reducers/personReducer';
import { addPersonCreator, onChangeEventCreator, prefillPersonFormCreator, updatePersonCreator } from 'redux/creators/personCreator';
import Input from 'components/shared/form-controls/Input/Input';
import Button from 'components/shared/form-controls/Button/Button';
import Textarea from 'components/shared/form-controls/Textarea/Textarea';
import './PersonForm.scss';

const PersonList = () => {
  const dispatch = useAppDispatch();
  const { person, formControls, isFormValid, isEdit } = useAppSelector(state => state.personReducer);
  
  useEffect(() => {
    if (isEdit) {
      dispatch(prefillPersonFormCreator());
    } else {
      dispatch(reset());
    }
  }, []);

  const personSubmitHandler = (event: any) => {
    event.preventDefault();
    dispatch(reset());
  };

  const updatePerson = () => dispatch(updatePersonCreator(person.id));

  const onTextareaChangeHandler = (event: any, controlName: string) => 
    dispatch(onChangeTextareaEvent({ value: event.target.value, controlName }));
  
  const onInputChangeHandler = (event: any, controlName: string) => {
    const isInputFileField = controlName === 'image';
    const value = isInputFileField ? event.target.files[0] : event.target.value;

    dispatch(onChangeEventCreator({ value, controlName, isInputFileField }));
  };
  
  const renderInputs = (inputControls: any, onInputChangeHandler: any) => {
    const onAddFileClickHandler = (controlName: string) => {
      (document.getElementById(controlName) as HTMLElement).click();
    };

    return Object.keys(inputControls).map((controlName) => {
      const control = inputControls[controlName];
      const { id, type, placeholder, value, accept, valid, touched, label, autoComplete, validation, errorMessage, title } = control;

      return (
        <Input
          key={controlName }
          id={controlName}
          idSpan={controlName + id}
          type={type}
          placeholder={placeholder}
          value={value}
          accept={accept}
          label={label}
          valid={valid}
          title={title}
          touched={touched}
          autoComplete={autoComplete}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChangeHandler(event, controlName)}
          onClick={() => onAddFileClickHandler(controlName)}
        />
      );
    });
  };

  const renderTextarea = (textareaControls: any, onTextareaChangeHandler: any) => {    
    return Object.keys(textareaControls).map((controlName) => {
      const control = textareaControls[controlName];
      const { valid, type, touched, validation, errorMessage, placeholder, value } = control;

      return (
        <Textarea
          key={controlName}
          id={controlName}
          type={type}
          placeholder={placeholder}
          value={value}
          valid={valid}
          touched={touched}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={(event: any) => onTextareaChangeHandler(event, controlName)}
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
            {renderInputs(formControls.inputControls, onInputChangeHandler)}
          </div>
            {renderTextarea(formControls.textareaControls, onTextareaChangeHandler)}
          </div>
        <Button
          onClick={() => isEdit ? updatePerson() : dispatch(addPersonCreator())}
          type="addPerson"
          disabled={!isFormValid}
        >
          {isEdit ? 'Редактировать' : 'Добавить'}
        </Button>
      </form>
    </div>
  );
}

export default PersonList;
