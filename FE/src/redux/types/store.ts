import rootReducer from 'redux/store/rootReducer';
import { setupStore } from 'redux/store/store';

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type { RootState, AppStore, AppDispatch };
