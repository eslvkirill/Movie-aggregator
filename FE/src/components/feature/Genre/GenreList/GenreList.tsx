import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { editGenre, onChangeEvent } from 'redux/reducers/genreReducer';
import {
	addGenreCreator,
	deleteGenreCreator,
	editGenreCreator,
	getGenresCreator,
} from 'redux/actions/creators/genreCreator';
import { validateInputs, validate } from 'shared/utils/validation';
import { createDefaultInput } from 'shared/form-controls/input/defaultInput';
import PaginateLoader from 'components/shared/loaders/PaginateLoader/PaginateLoader';
import Input from 'components/shared/form-controls/Input/Input';
import Button from 'components/shared/form-controls/Button/Button';
import { GenreControls } from '../genre.interface';
import GenreItem from '../GenreItem/GenreItem';
import './GenreList.scss';

const createFormInput = () => ({
  genreInput: createDefaultInput(
    'Введите новый жанр',
    'Название жанра должно быть длинее 2-x букв',
    255, 
    3
  ),
});

const GenreList = () => {
  const [formControls, setFormControls] = useState<GenreControls>(createFormInput());
  const [genreName, setGenreName] = useState('');
  const [isFormValid, setFormValid] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { genres, isLoading, error } = useAppSelector(state => state.genreReducer);

  useEffect(() => {
    dispatch(getGenresCreator())
  }, [dispatch]);

  const addGenre = () => genreName.trim().length && dispatch(addGenreCreator(genreName));

  const updateGenre = (event: React.ChangeEvent<HTMLInputElement>, genreId: string): any =>
    dispatch(onChangeEvent({ name: event.target.value, id: genreId }));

  const deleteGenre = (genreId: string) => dispatch(deleteGenreCreator(genreId));

  const onEditAction = (genreId: string) => dispatch(editGenre(genreId));

  const onSaveAction = async (genreId: string) => dispatch(editGenreCreator(genreId));

  const onSubmitAction = (event: React.FormEvent) => {
    event.preventDefault();
    setGenreName('');
    setFormValid(false);
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
    const controls = controlName as keyof GenreControls;
    const control = { ...formControls[controls] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controls] = control;
    
    setGenreName(control.value);
    setFormControls((prev) => ({ ...prev, ...formControls }));
    setFormValid(validateInputs(formControls));
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName as keyof GenreControls];
      const { type, placeholder, valid, touched, label, validation, errorMessage } = control;
      
      return (
        <Input
          key={controlName}
          type={type}
          placeholder={placeholder}
          value={genreName}
          valid={valid}
          touched={touched}
          label={label}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInputHandler(event, controlName)}
        />
      );
    });
  }

  return (
    <div className="genre-list">
      <form onSubmit={(event) => onSubmitAction(event)}>
        {renderInputs()}
        <Button
          type="add"
          onClick={addGenre}
          disabled={!isFormValid}
         >
          Добавить
        </Button>
      </form>
      <hr />
      {isLoading ? (
        <PaginateLoader />
      ) : (
         <>
          <Button
            type="success"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            Развернуть список жанров
            <span className={isDropdownOpen ? 'down' : 'up'}>➤</span>
          </Button>
          <GenreItem
            genres={genres}
            editAction={onEditAction}
            saveAction={onSaveAction}
            updateGenre={updateGenre}
            deleteGenre={(deleteGenre)}
            dropdown={isDropdownOpen}
          />
        </>
      )}
    </div>
  )
}

export default GenreList;
