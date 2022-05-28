import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppSelector } from 'hooks/redux';
import { isUserLoggIn } from 'shared/utils/common';
import Input from 'components/shared/form-controls/Input/Input';
import Textarea from 'components/shared/form-controls/Textarea/Textarea';
import './ReviewItem.scss';
import RatingItem from 'components/features/Rating/RatingItem/RatingItem';

const ReviewItem = ({ reviews, primaryPageColor, onRemoveClick, onEditInputChange, onEditTextareaChange, onOpenClick, onSaveClick }: any) => {  
  const { user } = useAppSelector(state => state.userReducer);
  const authUser = isUserLoggIn(user);

  return (
    <TransitionGroup className="reviewWrapper" component='div'>
      {reviews.map((review: any) => (
        <CSSTransition
          key={review.id || review}
          timeout={{ enter: 500, exit: 500 }}
          classNames="review"
        >
          <div className="reviewCard">
            <div className="reviewHead">
              <div className="leftSide">
                <Link
                  to={'/profile/' + review.id}
                  className="reviewAuthorName"
                  style={{ color: primaryPageColor }}
                >
                  {review.critic && 
                    <span 
                      className="critic"
                      title="Пользователь является критиком"
                    >
                      &#128081;
                    </span>
                  }{review.username}
                </Link>
                {!!review.userRating && 
                  <div 
                    className="user-rating"
                    title={`Рейтинг пользователя '${review.username}' равен ${review.userRating}`}
                  >
                    <RatingItem score={review.userRating} disabled />
                    <div className="review-rating">{review.userRating}</div>
                  </div>
                }
              </div>
              <div className="rightSide">
                <div className="reviewDate">{review.creationDate}</div>
                {authUser && user.username === review.username 
                ? (
                  <div
                    className="delete"
                    onClick={() => onRemoveClick(review.id)}
                  >
                    ✖
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="reviewsTitle">
              <Input
                id={review.id}
                value={review.title}
                onChange={(event) => onEditInputChange(event, review.id)}
                disabled={!review.open}
              />
            </div>
            <div className="reviewText">
              <Textarea
                id={review.id}
                value={review.body}
                onChange={(event: any) => onEditTextareaChange(event, review.id)}
                disabled={!review.open}
              />
            </div>
            {authUser && user.username === review.username ? (
              <div className={!review.open ? 'reviewEdit' : 'reviewEdit reviewSave' }>
                <div
                  id={review.id}
                  onClick={() =>
                    !review.open
                      ? onOpenClick(review.id)
                      : onSaveClick(review.id)
                  }
                  style={{ color: primaryPageColor }}
                >
                  <span>&#9998;</span>
                  {review.open === true ? 'Сохранить' : 'Редактировать'}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default ReviewItem;
