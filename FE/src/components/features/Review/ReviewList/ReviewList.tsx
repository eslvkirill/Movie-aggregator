import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector } from 'hooks/redux';
import Pagination from 'components/layout/Pagination/Pagination';
import Button from 'components/shared/form-controls/Button/Button';
import { isUserLoggIn } from 'shared/utils/common';
import ReviewForm from '../ReviewForm/ReviewForm';
import ReviewItem from '../ReviewItem/ReviewItem';
import './ReviewList.scss';

const ReviewList = (props: any) => {
  const { movieId, secondaryPageColor, primaryPageColor, rusTitle } = props;

  const { user } = useAppSelector(state => state.userReducer);
  const authUser = isUserLoggIn(user);

  const [reviews, setReviews] = useState<any>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdown, setDropdawn] = useState(false);
  const [, setFormControls] = useState('');
  const [reviewButtonActive, setReviewButtonActive] = useState(false);

  const paginate = async (pageNumber: number) => {
    const response = await axios.get(
      `/api/v1/movies/${movieId}/reviews?size=4&page=${pageNumber - 1}`
    );

    response.data.content.some((review: any) => setReviewButtonActive(!review.username && user.username !== review.username));

    setReviews(response.data.content);
    setTotalElements(response.data.totalElements);
    setTotalPages(response.data.totalPages);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    paginate(1);
  }, [])

  const removeReview = async (reviewId: string) => {
    await axios.delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`);

    const response = await axios.get(
      `/api/v1/movies/${movieId}/reviews?page=${currentPage - 1}`
    );

    const prevResponse = await axios.get(
      `/api/v1/movies/${movieId}/reviews?page=${currentPage - 2}`
    );

    setReviews(
      response.data.content.filter((review: any) => review.id !== reviewId)
    );
    setCurrentPage(currentPage);

    if (response.data.numberOfElements === 0) {
      setReviews(prevResponse.data.content);
      setCurrentPage(currentPage);
    }

    if (totalPages !== response.data.totalPages) {
      setTotalPages(() => totalPages - 1);
      setCurrentPage(currentPage - 1);
    }
    setReviewButtonActive(false);
  };

  const openHandlerClick = async (reviewId: string) => {
    const response = await axios.get(
      `/api/v1/movies/${movieId}/reviews?page=${currentPage - 1}`
    );

    const content = response.data.content.map((review: any) => {
      review.open = false;
      return review;
    });

    const index = content.findIndex((review: any) => review.id === reviewId);

    if (content[index] !== undefined) content[index].open = true;

    setReviews(content);
  };

  const saveHandlerClick = async (reviewId: string) => {
    try {
      const response = await axios.get(
        `/api/v1/movies/${movieId}/reviews?page=${currentPage - 1}`
      );
      const { content } = response.data;
      const index = content.findIndex((review: any) => review.id === reviewId);

      if (content[index]) {
        content[index].open = false;
      }

      const review = {
        title: reviews[index].title,
        body: reviews[index].body,
      };

      reviews[index].open = false;
      
      setReviews([...reviews]);
      
      await axios({
        method: 'put',
        url: `/api/v1/movies/${movieId}/reviews/${reviews[index].id}`,
        data: review,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const editHandler = async (event: any, reviewId: string, field: string) => {
    reviews.map((review: any) => {
      if (review.id === reviewId) {
        review[field] = event.target.value;
        setReviews(reviews);
        setFormControls(event.target.value);

        // if (review[field] === "") {
        //   console.log(field);
        // }
      }
      return review;
    });
  };

  const editHandlerInputReview = (event: any, reviewId: string) => {
    editHandler(event, reviewId, 'title');
  };

  const editHandlerTextareaReview = (event: any, reviewId: string) => {
    editHandler(event, reviewId, 'body');
  };

  return (
    <div
      id="reviews"
      style={{
        background: `linear-gradient(200deg, 
        ${secondaryPageColor} 18%, 
        ${primaryPageColor})`,
      }}
    >
      <div className="reviewTitle">Отзывы на фильм {rusTitle}</div>
      <hr className="reviewLine" />

      {authUser && !reviewButtonActive ? (
        <Button type="success" onClick={() => setDropdawn(!dropdown)}>
          Оставить свой отзыв{' '}
          <span className={dropdown ? 'down' : 'up'}>➤</span>
        </Button>
      ) : (
        ''
      )}

      <div className="dropDawnWrapper">
        <ReviewForm
          movieId={movieId}
          dropdown={dropdown}
          setDropdawn={setDropdawn}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          reviews={reviews}
          setReviews={setReviews}
          setTotalElements={setTotalElements}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          paginate={paginate}
          setReviewButtonActive={setReviewButtonActive}
        />
      </div>

      {totalElements !== 0 && reviews.length ? (
        <div className="reviews">
          <ReviewItem
            primaryPageColor={primaryPageColor}
            secondaryPageColor={secondaryPageColor}
            reviews={reviews}
            onRemoveClick={removeReview}
            onEditInputChange={editHandlerInputReview}
            onEditTextareaChange={editHandlerTextareaReview}
            onOpenClick={openHandlerClick}
            onSaveClick={saveHandlerClick}
            setReviewButtonActive={setReviewButtonActive}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      ) : (
        <div className="emptyReviews">
          Пока их нет,{' '}
          {!authUser ? (
            <Link to="/login">ВОЙДИТЕ, чтобы написать первый отзыв</Link>
          ) : (
            'оставьте первый отзыв!'
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
