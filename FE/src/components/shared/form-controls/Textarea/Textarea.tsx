import { isInvalid } from 'shared/utils/validation';
import './Textarea.scss';

const Textarea = (props: any) => {
  const { id, name, placeholder, autoComplete, value, disabled, onChange, errorMessage } = props;

  return (
    <div className="textarea">
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
    {isInvalid(props) && <span className="error">{errorMessage}</span>}
  </div>
  )
}

export default Textarea;
