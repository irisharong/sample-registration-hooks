import { createSlice } from '@reduxjs/toolkit';
import AuthService from "app/services/auth.service";

export const submitLogin =
  ({ email, password }) =>
  async (dispatch) => {
    return AuthService
      .login(email, password)
      .then((user) => {
        return dispatch(loginSuccess());
      })
      .catch((errors) => {
        return dispatch(loginError(errors));
      });
  };


const initialState = {
  success: false,
  errors: [],
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
