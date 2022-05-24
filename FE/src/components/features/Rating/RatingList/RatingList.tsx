import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { RATING } from 'redux/initial-state/ratingState/rating.enum';
import { closeModal } from 'redux/reducers/backdropReducer';
import Button from 'components/shared/form-controls/Button/Button';
import RatingItem from '../RatingItem/RatingItem';
import './RatingList.scss'

const RatingList = (props: any) => {
  const { movieId } = props;

  const dispatch = useAppDispatch();
  const { ratings } = useAppSelector(state => state.ratingReducer);

  const renderRatings = () => {
    return ratings.filter(rating => rating.type !== RATING.TOTAL)
      .map(rating => {
        const { id, type, score, averageScore, name, description } = rating;

        return (
          <div key={type} className="rating-form__line line">
            <div className="line__left-section left-section">
              <div 
                className="average-rating" 
                title="Средняя оценка"
              >
                {averageScore.toFixed(2)}
              </div>
              <div className="line__name">{name}: </div>
              <RatingItem
                movieId={movieId}
                score={score}
                type={type}
                ratingId={id}
              />
            </div>
            <div className="line__description">{description}</div>
          </div>
        );
      })
  }

  return (
    <div className="rating-form-wrapper">
      <div className="rating-form">
        {renderRatings()}
      </div>
    <div className="button-close">
      <Button 
        type="icon-close submit" 
        onClick={() => dispatch(closeModal())}
      >
        &times;
      </Button>
    </div>
  </div>
  );
}

export default RatingList;