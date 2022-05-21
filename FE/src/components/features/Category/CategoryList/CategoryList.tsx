import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { editCategory, onChangeEvent } from 'redux/reducers/categoryReducer';
import {
	addCategoryCreator,
	deleteCategoryCreator,
	editCategoryCreator,
	getCategoriesCreator,
} from 'redux/creators/categoryCreator';
import { validateInputs, validate } from 'shared/utils/validation';
import PaginateLoader from 'components/shared/loaders/PaginateLoader/PaginateLoader';
import Input from 'components/shared/form-controls/Input/Input';
import Button from 'components/shared/form-controls/Button/Button';
import { inputState } from 'redux/initial-state/categoryState';
import CategoryItem from '../CategoryItem/CategoryItem';
import './CategoryList.scss';

const CategoryList = () => {
  const [formControls, setFormControls] = useState<any>(inputState);
  const [categoryName, setCategoryName] = useState('');
  const [isFormValid, setFormValid] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { categories, isLoading, error } = useAppSelector(state => state.categoryReducer);
  const { user } = useAppSelector(state => state.authReducer);

  useEffect(() => {
    dispatch(getCategoriesCreator(user.id))
  }, [dispatch]);

  const addCategory = () => categoryName.trim().length && dispatch(addCategoryCreator(categoryName));

  const updateCategory = (event: React.ChangeEvent<HTMLInputElement>, categoryId: string): any =>
    dispatch(onChangeEvent({ name: event.target.value, id: categoryId }));

  const deleteCategory = (categoryId: string) => dispatch(deleteCategoryCreator(categoryId));

  const onEditAction = (categoryId: string) => dispatch(editCategory(categoryId));

  const onSaveAction = async (categoryId: string) => {
    dispatch(editCategory(categoryId));
    dispatch(editCategoryCreator(categoryId));
  }

  const onSubmitAction = (event: React.FormEvent) => {
    event.preventDefault();
    setCategoryName('');
    setFormValid(false);
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
    const controls = controlName;
    const control = { ...formControls[controls] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controls] = control;
    
    setCategoryName(control.value);
    setFormControls((prev: any) => ({ ...prev, ...formControls }));
    setFormValid(validateInputs(formControls));
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName) => {
      const control = formControls[controlName];
      const { type, placeholder, valid, touched, label, validation, errorMessage } = control;
      
      return (
        <Input
          key={controlName}
          type={type}
          placeholder={placeholder}
          value={categoryName}
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
    <div className="category-list">
      <form onSubmit={(event) => onSubmitAction(event)}>
        {renderInputs()}
        <Button
          type="add"
          onClick={addCategory}
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
            Развернуть список категорий
            <span className={isDropdownOpen ? 'down' : 'up'}>➤</span>
          </Button>
          <CategoryItem
            categories={categories}
            editAction={onEditAction}
            saveAction={onSaveAction}
            updateCategory={updateCategory}
            deleteCategory={(deleteCategory)}
            dropdown={isDropdownOpen}
          />
        </>
      )}
    </div>
  )
}

export default CategoryList;
