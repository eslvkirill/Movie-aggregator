import { combineReducers } from '@reduxjs/toolkit';
import filmFormReducer from 'redux/reducers/filmFormReducer';
import genreReducer from '../reducers/genreReducer';

const rootReducer = combineReducers({
	genreReducer,
	filmFormReducer,
});

export default rootReducer;
