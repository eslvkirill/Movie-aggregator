import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	prefillAverageRatingScoreAction,
	prefillRatingScoreAction,
} from 'redux/actions/ratingAction';
import { getMovieByIdCreator } from 'redux/creators/movieCreator';
import {
	deleteRatingCreator,
	setRatingCreator,
	updateRatingCreator,
} from 'redux/creators/ratingCreation';
import { ratingState } from 'redux/initial-state/ratingState/ratingState';
import { REDUCER } from '../types/reducers';

const initialState = {
	ratings: ratingState,
	numberOfRatings: 0,
};

const ratingReducer = createSlice({
	name: REDUCER.RATING,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				setRatingCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					const { rating, response } = action.payload;

					state.ratings = state.ratings.map((currentRating: any) => {
						if (currentRating.type === rating.ratingType) {
							currentRating.id = response;
							currentRating.score = rating.score;
						}

						return currentRating;
					});
				}
			)
			.addCase(
				getMovieByIdCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					prefillRatingScoreAction(state.ratings, action.payload);
					prefillAverageRatingScoreAction(state.ratings, action.payload);
				}
			)
			.addCase(
				deleteRatingCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					state.ratings.map((rating: any) => {
						if (rating.id === action.payload) {
							rating.score = 0;
							rating.averageScore = 0;
						}
						return rating;
					});
				}
			)
			.addCase(
				updateRatingCreator.fulfilled.type,
				(state, action: PayloadAction<any>) => {
					const { ratingId, score } = action.payload;

					state.ratings = state.ratings.map((rating: any) => {
						if (rating.id === ratingId) {
							rating.score = score;
						}
						return rating;
					});
				}
			);
	},
});

// export const {  } = ratingReducer.actions;

export default ratingReducer.reducer;
