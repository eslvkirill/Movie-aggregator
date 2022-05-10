import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import './ReviewForm.scss';
import Button from 'components/shared/form-controls/Button/Button';
import { inputState } from 'redux/initial-state/reviewFormState/input';
import { textareaState } from 'redux/initial-state/reviewFormState/textarea';
import Input from 'components/shared/form-controls/Input/Input';
import Textarea from 'components/shared/form-controls/Textarea/Textarea';
import { validate, validateForm } from 'shared/utils/validation';

const ReviewForm = (props: any) => {
  const { dropdown, movieId, totalPages, reviews, setReviews, setTotalElements, paginate, currentPage, setCurrentPage, setReviewButtonActive, setTotalPages, setDropdawn } = props;

  const [formControls, setFormControls] = useState<any>({
    formInputControls: inputState,
    formTextareaControls: textareaState,
  });
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormControls({
      formInputControls: inputState,
      formTextareaControls: textareaState,
    });
  }, [dropdown]);

  const publishReview = async () => {
    try {
      const review = {
        title: formControls.formInputControls.title.value,
        body: formControls.formTextareaControls.body.value,
      };

      const response = await axios({
        method: 'post',
        headers: {
          contentType: 'application/json',
        },
        url: `/api/v1/movies/${movieId}/reviews`,
        data: review,
      });

      const lastPageResponse = await axios.get(
        `/api/v1/movies/${movieId}/reviews?page=${totalPages - 1}`
      );

      if (totalPages === 0) {
        setReviews(() => [...reviews, { ...response.data }]);
        setTotalElements((totalElements: number) => totalElements + 1);
      } else if (
        lastPageResponse.data.content.length === lastPageResponse.data.size
      ) {
        setReviewButtonActive((active: boolean) => !active);
        if (lastPageResponse.data.totalPages !== totalPages) {
          paginate(totalPages + 1);
          setTotalPages((totalPages: number) => totalPages + 1);
        } else {
          paginate(totalPages);
          setTotalPages((totalPages: number) => totalPages);
        }
      } else {
        setReviews(() => [
          ...lastPageResponse.data.content,
          response.data,
        ]);
        if (totalPages !== currentPage) {
          setCurrentPage((currentPage: number) => currentPage + 1);
        } else {
          setCurrentPage((currentPage: number) => currentPage);
        }
      }
      setReviewButtonActive(true);
    } catch (e) {
      console.log(e);
    }
  };

  const submitNewReview = (event: any) => {
    event.preventDefault();
    setFormControls({
      formInputControls: inputState,
      formTextareaControls: textareaState,
    });
    setFormValid(false);
    setDropdawn(false);
  };

  const onChangeInputHandler = (event: any, controlName: any) => {
    const { formInputControls } = formControls;
    const control = { ...formInputControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation) as boolean;
    
    formInputControls[controlName] = control;

    setFormControls((prevState: any) => {
      return { ...prevState, formInputControls };
    });

    setFormValid(validateForm(formControls));
  };

  const onChangeTextareaHandler = (event: any, controlName: string) => {
    const { formTextareaControls } = formControls;
    const control = { ...formTextareaControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation) as boolean;

    formTextareaControls[controlName] = control;

    setFormControls((prevState: any) => {
      return { ...prevState, formTextareaControls };
    });

    setFormValid(validateForm(formControls));
  };

  const renderInputControls = () => {
    const { formInputControls } = formControls;

    return Object.keys(formInputControls).map((controlName) => {
      const control = formInputControls[controlName];

      return (
        <Input
          key={controlName}
          className='reviewInput'
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          autoComplete={control.autoComplete}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeInputHandler(event, controlName)}
        />
      );
    });
  };

  const renderTextareaControls = () => {
    const { formTextareaControls } = formControls;
    
    return Object.keys(formTextareaControls).map((controlName) => {
      const control = formTextareaControls[controlName as keyof typeof formTextareaControls];

      return (
        <Textarea
          key={controlName}
          id={controlName}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event: any) => onChangeTextareaHandler(event, controlName)}
        />
      );
    });
  };

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
      <form
        className="addReviewWrapper"
        onSubmit={(event) => submitNewReview(event)}
      >
        <div className="addReview">
          {renderInputControls()}
          {renderTextareaControls()}
        </div>
        <Button type="success" disabled={!isFormValid} onClick={publishReview}>
          Опубликовать
        </Button>
      </form>
    </CSSTransition>
  );
};

export default ReviewForm;
