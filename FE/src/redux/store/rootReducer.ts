import { combineReducers } from '@reduxjs/toolkit';
import genreReducer from '../reducers/genreReducer';

const rootReducer = combineReducers({
	genreReducer,
});

export default rootReducer;
