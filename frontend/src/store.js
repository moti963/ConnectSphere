import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        'auth': authReducer,
    },
});

export default store;