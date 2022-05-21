import { CSSTransition } from 'react-transition-group';
import Button from 'components/shared/form-controls/Button/Button';
import Input from 'components/shared/form-controls/Input/Input';
import './CategoryItem.scss';

const CategoryItem = (props: any) => {
  const { dropdown, categories, updateCategory, saveAction, editAction, disabled, deleteCategory } = props;

  return (
    <CSSTransition 
      in={dropdown}
      appear
      exit
      unmountOnExit
      classNames="fade"
      timeout={{
        enter: 300,
        exit: 200,
      }}
    >
      <ul className="category-item">
        {categories.map((category: any) => {
          const {id,
            name,
            open} = category;

          return (
            <li key={id}>
              <Input
                id={id}
                value={name}
                onChange={(event) => updateCategory(event, id)}
                disabled={!open}
                // autocomplete="off"
              />
              <Button
                type="submit"
                id={id}
                onClick={() => open ? saveAction(id) : editAction(id)}
                disabled={disabled}
              >
                {open ? 'Сохранить' : 'Редактировать'}
              </Button>
              <Button type="submit" onClick={() => deleteCategory(id)}>
                Удалить
              </Button>
            </li>
          );
        })}
      </ul>
    </CSSTransition>
  )
};

export default CategoryItem;