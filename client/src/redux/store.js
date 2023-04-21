import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '../slices/slice';

const store = configureStore({
    reducer: dataSlice,
});

export {store};