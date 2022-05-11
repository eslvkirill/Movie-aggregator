import { Rating as MaterialUIRating } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useAppSelector } from 'hooks/redux';
import { isUserLoggIn } from 'shared/utils/common';
import './RatingItem.scss';

const RatingItem = (props: any) => {
  const { userRating, movieId, setUserRating, setTotalRating, setNumberOfRatings, setOpenModal, ratingCategoryType } = props;

  const { user } = useAppSelector(state => state.authReducer);
  const authUser = isUserLoggIn(user);

  const rating = userRating;

  const StyledRating = withStyles({
    icon: {
      color: rating !== 0 ? '#fff4e8c9' : '#fff4e894',
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

  const ratingHandler = (method: any) => async (ratingType: string, newValue: any) => {
    try {
      const response = await axios({
        method: method,
        url: `/api/v1/movies/${movieId}/ratings`,
        data: method !== 'delete' 
        ? { ratingType, score: newValue } 
        : null
      });

      if (method === 'delete') {
        setUserRating(null);
      }
      else {
        setUserRating(newValue);
      }

      setTotalRating(response.data.totalRating);
      setNumberOfRatings(response.data.numberOfRatings);
    } catch (e) {
      console.log(e);
    }
  };

  const addRatingHandler = ratingHandler('post');
  const editRatingHandler = ratingHandler('put');

  return (
    <div className="rating">
      <StyledRating
        className="styledRating"
        name="customized-color half-rating "
        size="large"
        max={10}
        precision={0.5}
        value={rating === null ? rating : rating}
        onChange={(event, newValue) => {
          if (authUser) {
            if (newValue) {
              setUserRating(newValue);

              // if (rating !== null) {
              //   editRatingHandler(newValue);
              // }
              console.log(ratingCategoryType);

              if (rating === null) {
                console.log(ratingCategoryType);
                addRatingHandler(ratingCategoryType, newValue);
              }
            }
            setOpenModal(true);

          } else {
            setOpenModal(false);
          }
        }}
        style={rating === null ? { order: 2 } : {}}
      />
      <div
        className="ratingSection"
        style={
          rating === null
            ? { marginRight: '0.4rem', order: 1, width: 'auto' }
            : {}
        }
      >
        {authUser ? (
          <div
          className="removeRating"
          title={rating === null ? '' : 'Удалить оценку'}
          style={
            rating === null
              ? {
                  cursor: 'default',
                  fontSize: '1.5rem',
                  textShadow:
                    '0px 2px 1px #9b4724, 0px 2px 3px #9b4724, 0px 1px 3px #9b4724',
                  margin: '-0.3rem 0 0 -0.6rem',
                }
              : {}
          }
          onClick={() => {
            if (rating !== null) {
              ratingHandler('delete');
            }
          }}
        >
          {rating !== null ? '✖' : 'Оценить ➤'}
        </div>
        ) : ''} 
        {authUser ? (
          <div
            className="rating"
            title={`Ваша оценка: ${rating}`}
            style={rating === null ? { width: 0, border: 'none' } : {}}
          >
            {rating !== null ? rating : null}
          </div>
        ) : ''}
      </div>
    </div>
  );
};

export default RatingItem;
