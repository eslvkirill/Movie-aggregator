import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Button from 'components/shared/form-controls/Button/Button';
import MovieGradeList from 'components/features/Movie/MovieGradeList/MovieGradeList';
import './GradeHistoryPage.scss';
import { getUserGradeHistoryCreator } from 'redux/creators/userCreator';

const GradeHistoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const { user, gradeHistoryMovies } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getUserGradeHistoryCreator(id || user.id))
  }, [])
  
  return (
    <div className="grade-history-page">
      <Button 
        type="submit grade-history-page__button"
        onClick={() => navigate('/my-collection')}
      >
        {'<- Назад'}
      </Button>
      <MovieGradeList movies={gradeHistoryMovies}/>
    </div>
  )
}

export default GradeHistoryPage;