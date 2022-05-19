import { createAsyncThunk } from '@reduxjs/toolkit';
import { RATING_CREATOR } from 'redux/types/actionCreators';
import RatingService from 'components/features/Rating/rating.service';

const service = RatingService;

const setRatingCreator = createAsyncThunk(
	RATING_CREATOR.SET,
	async (data: any, thunkAPI) => {
		try {
			const { movieId, rating } = data;
			const response = await service.addRating(movieId, rating);

			return { rating, response };
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось поставить рейтинг');
		}
	}
);

const updateRatingCreator = createAsyncThunk(
	RATING_CREATOR.UPDATE,
	async (data: any, thunkAPI) => {
		try {
			const { movieId, ratingId, score } = data;

			await service.updateRating(movieId, ratingId, { score });

			return { ratingId, score };
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось обновить рейтинг');
		}
	}
);

const deleteRatingCreator = createAsyncThunk(
	RATING_CREATOR.DELETE,
	async (ids: any, thunkAPI) => {
		try {
			const { movieId, ratingId } = ids;

			await service.deleteRating(movieId, ratingId);

			return ratingId;
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось удалить рейтинг');
		}
	}
);

export { setRatingCreator, updateRatingCreator, deleteRatingCreator };
