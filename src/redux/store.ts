import { UserSlice } from './Slice/User';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
      key: 'root',
      storage,
};
// -------------------------------------------------------------------
const rootReducers = combineReducers({
      user: UserSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducers>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
