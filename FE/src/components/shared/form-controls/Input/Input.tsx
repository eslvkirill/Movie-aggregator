import { ChangeEventHandler, MouseEventHandler, KeyboardEventHandler } from 'react';
import { isInvalid } from 'shared/utils/validation';
import classes from './Input.module.scss';

interface InputControl {
  type?: string;
  placeholder?: string;
  id?: string;
  accept?: string;
  value?: string | number;
  disabled?: boolean | undefined;
  autoComplete?: string | undefined;
  idSpan?: string;
  title?: string;
  errorMessage?: string;
  label?: string;
  valid?: boolean;
  touched?: boolean;
  shouldValidate?: boolean;
  className?: string;
  onChange?: ChangeEventHandler<Element> | undefined;
  onKeyDown?: KeyboardEventHandler<Element> | undefined;
  onClick?: MouseEventHandler<Element> | undefined;
}

const Input = (props: InputControl) => {
  const { id, type, placeholder, accept, value, onChange, onKeyDown, onClick, disabled, autoComplete, idSpan, title, errorMessage } = props;


  const inputType = type || 'text';
  const cls = type && [classes.Input, classes[type]];

  return (
    <div
      className={
        inputType === 'file'
          ? classes.InputFile.concat(` ${inputType}`)
          : inputType
      }
    >
      {(inputType === 'color' || inputType === 'time') && 
        <div className={inputType === 'color' ? classes.Color : classes.Time}>
          {placeholder}
        </div>
      }
      <input
        placeholder={placeholder}
        type={inputType}
        id={id}
        accept={accept}
        className={cls && cls.join(' ')}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {inputType === 'file' &&
        <>
          <span
            id={idSpan}
            onClick={onClick}
            className="placeholder"
            style={{
              width: 352,
              marginTop: -61,
              marginRight: -12,
              color: 'rgb(168, 145, 118)',
              fontSize: 16,
              height: 10,
              cursor: 'default',
              textAlign: 'left',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            {title}
          </span>

          <span onClick={onClick} 
                className={classes.Choice}
          >
            Выберите файл
          </span>

          {isInvalid(props as any) && 
            <span className={`${classes.FileError} fileError`}>
              {errorMessage}
            </span>
          }
        </>
      }

      {(isInvalid(props as any) && inputType !== 'file')
        && <span>{errorMessage}</span>
      }
    </div>
  );
};

export default Input;
