import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { onChangeInputEvent, reset } from 'redux/reducers/authReducer';
import Input from 'components/shared/form-controls/Input/Input';
import { Link, Navigate } from 'react-router-dom';
import Button from 'components/shared/form-controls/Button/Button';
import { registrationCreator } from 'redux/creators/authCreator';
import { StateName } from '../auth.enum';

const Registration = () => {
  const dispatch = useAppDispatch();
  const { formControls, isFormValid, user, error } = useAppSelector(state => state.authReducer);
  
  useEffect(() => { 
    dispatch(reset());
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    dispatch(reset());
  };

  const onChangeHandler = (event: any, controlName: any) => 
    dispatch(onChangeInputEvent({event, stateName: StateName.registration, controlName}))

  const renderInputs = () => {
    return Object.keys(formControls[StateName.registration]).map((controlName, index) => {
      const control = formControls[StateName.registration][controlName];

      return (
        <Input
          key={controlName}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  if (Object.keys(user).length) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth auth__registration">
      <h1>Регистрация</h1>
      <form onSubmit={submitHandler} className="registration-form">
        <div className="registration-form__inputs inputs">{renderInputs()}</div>
        {error && (
          <span className="registration-form__error error">*{error}</span>
        )}
        <div className="registration-form__buttons buttons">
          <Link to="/login" className="buttons__back">
            {/* <Button type="primary primaryBack"> */}
              Назад
            {/* </Button> */}
          </Link>
          <Button
            type="buttons__success success"
            onClick={() => dispatch(registrationCreator())}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;