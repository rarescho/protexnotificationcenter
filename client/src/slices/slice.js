import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    username: 'Hello World',
  },
  reducers: {
    updateUsername: (state, actions) => {
      state.username = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    updateUsername,
} = DataSlice.actions

export default DataSlice.reducer