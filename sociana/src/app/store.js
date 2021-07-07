import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import feedReducer from "../features/Feed/feedSlice"
import profileReducer from "../features/Profile/profileSlice"
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';


// const reducers = combineReducers({
//     user: userReducer,
//     feed : feedReducer,
//     profile : profileReducer
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk],
// });

// export default store;

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed : feedReducer,
    profile : profileReducer
  },
});
