import MovieGradeList from 'components/features/Movie/MovieGradeList/MovieGradeList';
import Button from 'components/shared/form-controls/Button/Button';
import { useNavigate } from 'react-router-dom';
import './GradeHistoryPage.scss';

const GradeHistoryPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grade-history-page">
      <Button 
        type="submit grade-history-page__button"
        onClick={() => navigate('/my-collection')}
      >
        {'<- Назад'}
      </Button>
      <MovieGradeList movies={[]}/>
    </div>
  )
}

export default GradeHistoryPage;