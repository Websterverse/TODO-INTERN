import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  return localStorage.getItem('user') || null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!loadUserFromStorage(),
    user: loadUserFromStorage(),
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', action.payload); // Store user
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user'); // Remove user from storage
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
