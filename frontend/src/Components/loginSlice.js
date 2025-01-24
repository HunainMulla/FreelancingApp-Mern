import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'islogged',
  initialState: {
    value: JSON.parse(localStorage.getItem('isLogged')) || false, 
  },
  reducers: {
    correct: (state) => {
      state.value = true;
      localStorage.setItem('isLogged', JSON.stringify(true)); 
    },
    signOut: (state) => {
      state.value = false;
      localStorage.removeItem('isLogged'); 
    },
  },
});

export const { correct, signOut } = loginSlice.actions;

export default loginSlice.reducer;
