import { createSlice } from '@reduxjs/toolkit';

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    value: JSON.parse(localStorage.getItem('userDetail')) || {
      name: null,
      requests: 0,
      orders: 0,
    }, // Default values in case there's no data in localStorage
  },
  reducers: {
    setname: (state, action) => {
      state.value.name = action.payload;
      localStorage.setItem('userDetail', JSON.stringify(state.value)); // Persist to localStorage
    },
    orderAdd: (state) => {
      state.value.orders += 1;
      localStorage.setItem('userDetail', JSON.stringify(state.value)); // Persist to localStorage
    },
    requestAdd: (state) => {
      state.value.requests += 1;
      localStorage.setItem('userDetail', JSON.stringify(state.value)); // Persist to localStorage
    },
    clearUserDetail: (state) => {
      state.value = { name: null, requests: 0, orders: 0 };
      localStorage.removeItem('userDetail'); // Clear from localStorage
      
    },
  },
});

export const { setname, orderAdd, requestAdd, clearUserDetail } = userDetailSlice.actions;

export default userDetailSlice.reducer;
