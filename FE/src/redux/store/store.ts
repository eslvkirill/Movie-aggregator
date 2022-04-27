import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	});
