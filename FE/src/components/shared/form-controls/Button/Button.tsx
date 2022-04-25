import { MouseEventHandler } from 'react';
import classes from './Button.module.scss';

interface ButtonControl {
  type?: any;
  id?: string;
  disabled?: boolean | undefined;
  children?: any;
  onClick?: MouseEventHandler<Element> | undefined;
}

const Button = (props: ButtonControl) => {
  const { id, type, onClick, disabled, children } = props;

  const buttonType = type || 'success';
  const cls = type && [classes.Button, classes[type], buttonType];

  return (
    <button
      id={id}
      onClick={onClick}
      type={buttonType}
      className={cls && cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
