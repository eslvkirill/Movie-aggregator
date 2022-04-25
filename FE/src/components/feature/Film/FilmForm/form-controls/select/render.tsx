import Select from 'components/shared/form-controls/Select/Select';
import selectStyles from 'shared/form-controls/select/styles';
import { selectState } from './state';

export const renderSelects = (onChangeSelectHandler: any) => {
  const selectControls = selectState;

	console.log(selectControls);

  return Object.keys(selectControls).map((controlName, index) => {
    const control = selectControls[controlName as keyof typeof selectControls];
		const { valid, touched, validation, errorMessage, options, isMulti, isSearchable, isClearable, placeholder, closeMenuOnSelect, noOptionsMessage, value } = control;

    return (
      <Select
        key={controlName}
        valid={valid}
        touched={touched}
        shouldValidate={!!validation}
        errorMessage={errorMessage}
        options={options}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSelectHandler(event, controlName)}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        placeholder={placeholder}
        closeMenuOnSelect={closeMenuOnSelect}
        noOptionsMessage={noOptionsMessage}
        value={value}
        styles={selectStyles()}
      />
    );
  });
}