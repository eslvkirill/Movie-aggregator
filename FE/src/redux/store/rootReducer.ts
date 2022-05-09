import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from 'redux/reducers/movieReducer';
import authReducer from 'redux/reducers/authReducer';
import genreReducer from 'redux/reducers/genreReducer';
import personReducer from 'redux/reducers/personReducer';

const rootReducer = combineReducers({
	genreReducer,
	movieReducer,
	authReducer,
	personReducer,
});

export default rootReducer;
