import { useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { ratingListCategories } from 'shared/utils/ratings';
import { isUserLoggIn } from 'shared/utils/common';
import Button from 'components/shared/form-controls/Button/Button';
import RatingItem from '../RatingItem/RatingItem';
import './RatingList.scss'

const RatingList = (props: any) => {
  const { setOpenModal, isOpenModal, id, userRating, setUserRating, setTotalRating, totalRating, setNumberOfRatings } = props;
  const { user } = useAppSelector(state => state.authReducer);
  const authUser = isUserLoggIn(user);

  const [ratingType, setRatingType] = useState('');

  const handleClose = () => setOpenModal(false);

  const renderRatings = () => 
    ratingListCategories.map(category => {
      // setRatingType(category.type);

      return (
        <div key={category.type} className="rating-form__line line">
          <div className="line__left-section left-section">
            <div className="line__name">{category.name}: </div>
            <RatingItem 
              movieId={id}
              ratingCategoryType={ratingType}
              userRating={userRating}
              setOpenModal={setOpenModal}
              setUserRating={setUserRating}
              setTotalRating={setTotalRating}
              totalRating={totalRating}
              setNumberOfRatings={setNumberOfRatings}
            />
          </div>
          <div className="line__description">{category.description}</div>
        </div>
        );
      })

  return (
    <div className="rating-form-wrapper">
      <div className="rating-form">
        {renderRatings()}
      </div>
    <div className="button-close">
      <Button 
        type="icon-close submit" 
        onClick={handleClose}
      >
        &times;
      </Button>
    </div>
  </div>
  );
}

export default RatingList;