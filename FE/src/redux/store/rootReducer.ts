import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from 'redux/reducers/movieReducer';
import userReducer from 'redux/reducers/userReducer';
import genreReducer from 'redux/reducers/genreReducer';
import personReducer from 'redux/reducers/personReducer';
import ratingReducer from 'redux/reducers/ratingReducer';
import backdropReducer from 'redux/reducers/backdropReducer';
import categoryReducer from 'redux/reducers/categoryReducer';
import searchReducer from 'redux/reducers/searchReducer';

const rootReducer = combineReducers({
	genreReducer,
	movieReducer,
	userReducer,
	personReducer,
	ratingReducer,
	backdropReducer,
	categoryReducer,
	searchReducer,
});

export default rootReducer;
