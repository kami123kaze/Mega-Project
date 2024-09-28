import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the reducer

const store = configureStore({
    reducer: {
        auth: authReducer // Use the auth reducer
    }
});

export default store;
