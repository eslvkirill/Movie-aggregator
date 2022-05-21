import { useNavigate } from 'react-router-dom';
import CategoryList from 'components/features/Category/CategoryList/CategoryList';
import Button from 'components/shared/form-controls/Button/Button';
import './CategoryPage.scss';

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="category-page">
      <Button 
        type="submit category-page__button"
        onClick={() => navigate('/my-collection')}
      >
        {'<- Назад'}
      </Button>
      <CategoryList />
    </div>
  )
};

export default CategoryPage;