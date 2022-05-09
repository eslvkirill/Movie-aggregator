import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { isUserLoggIn } from 'shared/utils/common';
import PaginateLoader from 'components/shared/loaders/PaginateLoader/PaginateLoader';
import Button from 'components/shared/form-controls/Button/Button';
import Input from 'components/shared/form-controls/Input/Input';
import { onChangeInputEvent } from 'redux/reducers/authReducer';
import { loginCreator } from 'redux/creators/authCreator';
import './Login.scss';
import { StateName } from '../auth.enum';

const Login = () => {
  const dispatch = useAppDispatch();
  const { formControls, isFormValid, isLoading, user, error } = useAppSelector(state => state.authReducer);

  const submitHandler = (event: any) => event.preventDefault();

  const onChangeHandler = (event: any, controlName: any) => 
    dispatch(onChangeInputEvent({event, stateName: StateName.login, controlName}))

  const renderInputs = () => {
    return Object.keys(formControls[StateName.login]).map((controlName, index) => {
      const control = formControls[StateName.login][controlName];

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

  if (isUserLoggIn(user)) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth auth__login">
      <h1>Войти</h1>
      <form onSubmit={submitHandler} className="login">
        <div className="login__inputs inputs">{renderInputs()}</div>

        {error && (
          <span className="login__error error">
            *{error}
          </span>
        )}
        <div className="login__buttons buttons">
          {isLoading 
            ? <div className="buttons__loader">
                <PaginateLoader />
              </div>
            : <Button
                type="buttons__success"
                onClick={() => dispatch(loginCreator())}
                disabled={!isFormValid}
              >
                Войти
              </Button>
          }
          <Link 
            to="/registration" 
            className="buttons__registration-form"
          >
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
