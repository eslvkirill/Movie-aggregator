import { ReactNode } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { isInvalid } from 'shared/utils/validation';
import './Select.scss';

interface SelectControl {
  type?: any;
  styles?: {};
  options?: any;
  isMulti: boolean;
  value?: string | number;
  isSearchable?: boolean | undefined;
  placeholder?: string | undefined;
  closeMenuOnSelect?: boolean;
  valid?: boolean;
  touched?: boolean;
  shouldValidate?: boolean;
  noOptionsMessage?: (obj: { inputValue: string }) => ReactNode;
  isClearable?: boolean;
  defaultValue?: any;
  errorMessage?: string;
  onChange?: any;
  menuIsOpen?: boolean;
}

const CustomSelect = (props: SelectControl) => {
  const { type, styles, options, onChange, isMulti, value, isSearchable, placeholder, closeMenuOnSelect, isClearable, defaultValue, errorMessage, menuIsOpen } = props;

  const selectType = type || 'Select';
  const noOptionsMessage = () => 'Список пуст';

  return (
    <div className="select">
      <Select
        // type={selectType}
        components={makeAnimated()}
        styles={styles}
        options={options}
        onChange={onChange}
        isMulti={isMulti}
        value={value}
        isSearchable={isSearchable}
        placeholder={placeholder}
        closeMenuOnSelect={closeMenuOnSelect}
        noOptionsMessage={noOptionsMessage}
        isClearable={isClearable}
        defaultValue={defaultValue}
        hideSelectedOptions={false}
        menuIsOpen={menuIsOpen}
      />
      {isInvalid(props as any) && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default CustomSelect;
