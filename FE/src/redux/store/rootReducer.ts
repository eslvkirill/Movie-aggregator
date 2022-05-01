import { combineReducers } from '@reduxjs/toolkit';
import filmFormReducer from 'redux/reducers/filmFormReducer';
import authReducer from 'redux/reducers/authReducer';
import genreReducer from 'redux/reducers/genreReducer';

const rootReducer = combineReducers({
	genreReducer,
	filmFormReducer,
	authReducer,
});

export default rootReducer;
