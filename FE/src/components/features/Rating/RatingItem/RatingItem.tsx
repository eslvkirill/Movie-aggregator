import { Rating as MaterialUIRating } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { deleteRatingCreator, setRatingCreator, updateRatingCreator } from 'redux/creators/ratingCreation';
import { isUserLoggIn } from 'shared/utils/common';
import './RatingItem.scss';
import { getMovieByIdCreator } from 'redux/creators/movieCreator';
import { openModal } from 'redux/reducers/backdropReducer';

const RatingItem = (props: any) => {
  const { movieId, type, score, ratingId } = props;

  const { user } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();
  const authUser = isUserLoggIn(user);

  const StyledRating = withStyles({
    icon: {
      color: score ? '#fff4e8c9' : '#fff4e894',
      transition: '0.25s',
      fontSize: 38,
    },
    iconFilled: {
      color: '#ffbb00',
    },
    iconHover: {
      color: '#ffd000',
    },
  })(MaterialUIRating);

  const setNewRating = (newValue: number) => {
    if (authUser && newValue) {
      if (!score) {
        const data = {
          movieId,
          rating: {
            ratingType: type,
            score: newValue
          }
        }

        dispatch(setRatingCreator(data));
        dispatch(getMovieByIdCreator(movieId));
        setTimeout(() => dispatch(openModal()), 800);
      } else {
        dispatch(updateRatingCreator({ movieId, ratingId, score: newValue }));
        dispatch(getMovieByIdCreator(movieId));
      }
    }
  }

  const deleteRating = () => {
    if (score) {
      dispatch(deleteRatingCreator({ movieId, ratingId }));
      dispatch(getMovieByIdCreator(movieId))
    }
  }

  return (
    <div className="rating">
      <StyledRating
        className="styledRating"
        name={type}
        size="large"
        max={10}
        precision={1}
        value={score}
        onChange={(_, newValue: any) => setNewRating(newValue)}
        style={!score ? { order: 2 } : {}}
      />
      <div
        className="ratingSection"
        style={!score
          ? { marginRight: '0.4rem', marginTop: '24px', order: 1, width: '130px' }
          : {}
        }
      >
        {authUser ? (
          <div
            className="removeRating"
            title={score ? 'Удалить оценку' : ''}
            style={
              !score
                ? {
                    cursor: 'default',
                    fontSize: '1.5rem',
                    textShadow:
                      '0px 2px 1px #9b4724, 0px 2px 3px #9b4724, 0px 1px 3px #9b4724',
                    margin: '-0.3rem 0 0 -0.6rem',
                  }
                : {}
            }
            onClick={deleteRating}
        >
          {!score ? 'Оценить ➤' : '✖'}
        </div>
        ) : ''} 
        {authUser ? (
          <div
            className="rating"
            title={`Ваша оценка: ${score}`}
            style={!score ? { width: 0, border: 'none' } : {}}
          >
            {score || ''}
          </div>
        ) : ''}
       
      </div>
    </div>
  );
};

export default RatingItem;
