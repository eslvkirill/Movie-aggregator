import Select from 'components/shared/form-controls/Select/Select';
import selectStyles from 'shared/form-controls/select/styles';

export const renderSelects = (selectControls: any, onChangeSelectHandler: any) => {
  return Object.keys(selectControls).map((controlName, index) => {
    const control = selectControls[controlName as keyof typeof selectControls];
		const { valid, touched, validation, errorMessage, options, isMulti, isSearchable, isClearable, placeholder, closeMenuOnSelect, value } = control;

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
        value={value}
        styles={selectStyles()}
      />
    );
  });
}