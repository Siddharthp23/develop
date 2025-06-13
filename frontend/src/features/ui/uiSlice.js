import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showLogin: false,
    showRegister: false
  },
  reducers: {
    toggleLogin: (state) => {
      state.showLogin = !state.showLogin;
    },
    toggleRegister: (state) => {
      state.showRegister = !state.showRegister;
    },
    closeModals: (state) => {
      state.showLogin = false;
      state.showRegister = false;
    }
  }
});

export const { toggleLogin, toggleRegister, closeModals } = uiSlice.actions;
export default uiSlice.reducer;
