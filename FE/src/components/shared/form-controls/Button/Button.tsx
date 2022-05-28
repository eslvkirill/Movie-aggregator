import { MouseEventHandler } from 'react';
import classes from './Button.module.scss';

interface ButtonControl {
  type?: any;
  id?: string;
  disabled?: boolean | undefined;
  children?: any;
  title?: string;
  style?: any;
  onClick?: MouseEventHandler<Element> | undefined | any;
}

const Button = (props: ButtonControl) => {
  const { id, type, onClick, disabled, title, children, style } = props;

  const buttonType = type || 'success';
  const cls = type && [classes.Button, classes[type], buttonType];

  return (
    <button
      id={id}
      onClick={onClick}
      type={buttonType}
      title={title}
      className={cls && cls.join(' ')}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
