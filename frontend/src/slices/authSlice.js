import { createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../auth/AuthAPI";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

// Retrieve initial state from local storage if available
const storedData = JSON.parse(localStorage.getItem('reduxState')) || {
  user: {
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    image: null,
  },
  isAuthenticated: false,
  error: null,
};

const initialState = {
  ...storedData,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, profile } = action.payload;
      state.user.id = user.id;
      state.user.username = user.username;
      state.user.first_name = user.first_name;
      state.user.last_name = user.last_name;
      state.user.image = profile ? profile.profile_img : null;
      state.isAuthenticated = true;
      state.error = null;
      // Save tokens to cookies
      cookie.set('refresh_token', action.payload.refresh_token);
      cookie.set('access_token', action.payload.access_token);
      // Save state to local storage
      localStorage.setItem('reduxState', JSON.stringify(state));
    },
    loginFailure: (state, action) => {
      state.user.id = null;
      state.user.username = null;
      state.user.first_name = null;
      state.user.last_name = null;
      state.user.image = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      // Clear tokens from cookies
      cookie.remove('refresh_token');
      cookie.remove('access_token');
      // Clear state from local storage
      localStorage.removeItem('reduxState');
    },
    logout: (state) => {
      state.user.id = null;
      state.user.username = null;
      state.user.first_name = null;
      state.user.last_name = null;
      state.user.image = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear tokens from cookies
      cookie.remove('refresh_token');
      cookie.remove('access_token');
      // Clear state from local storage
      localStorage.removeItem('reduxState');
    },
    refreshAccessTokenSuccess: (state, action) => {
      state.error = null;
      // Update tokens in cookies
      cookie.set('access_token', action.payload.access);
      // Save state to local storage
      localStorage.setItem('reduxState', JSON.stringify(state));
    },
    refreshAccessTokenFailure: (state, action) => {
      state.user.id = null;
      state.user.username = null;
      state.user.first_name = null;
      state.user.last_name = null;
      state.user.image = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      // Clear tokens from cookies
      cookie.remove('refresh_token');
      cookie.remove('access_token');
      // Clear state from local storage
      localStorage.removeItem('reduxState');
    },
  },
});

export const { loginSuccess, loginFailure, logout, refreshAccessTokenSuccess, refreshAccessTokenFailure } = authSlice.actions;

export default authSlice.reducer;

export const login = (userData) => async (dispatch) => {
    try {
        const response = await AuthAPI.LoginUser(userData);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await AuthAPI.logoutUser();
        dispatch(logout());
    } catch (error) {
        console.error(error);
    }
};

export const refreshAccessToken = () => async (dispatch) => {
    try {
        const response = await AuthAPI.refreshAccessToken();
        dispatch(refreshAccessTokenSuccess(response.data));
    } catch (error) {
        dispatch(refreshAccessTokenFailure(error.message));
    }
};
