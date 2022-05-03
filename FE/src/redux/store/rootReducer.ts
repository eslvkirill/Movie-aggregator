import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from 'redux/reducers/movieReducer';
import authReducer from 'redux/reducers/authReducer';
import genreReducer from 'redux/reducers/genreReducer';

const rootReducer = combineReducers({
	genreReducer,
	movieReducer,
	authReducer,
});

export default rootReducer;
