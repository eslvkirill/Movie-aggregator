import { PayloadAction } from '@reduxjs/toolkit';

const setMoviesByTypeAction = (
	state: any,
	action?: PayloadAction<string | undefined>
) => {
	action?.payload &&
		state.movies[action.payload].length &&
		(state.visibleMovies = state.movies[action.payload]);
};

export { setMoviesByTypeAction };
