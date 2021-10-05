import { createSlice } from '@reduxjs/toolkit';
import AuthService from "app/services/auth.service";

export const submitRegister =
  ({name, password, email, industry }) =>
  async (dispatch) => {
    return AuthService
      .createUser({
        name,
        password,
        email,
        industry,
      })
      .then((response) => {
        return dispatch(registerSuccess(response.message));
      })
      .catch((errors) => {
        return dispatch(registerError(errors));
      });
  };

export const registerEmployer = 
  ({name, email}) =>
  async (dispatch) => {
    return AuthService
      .createEmployer({
        name,
        email,
      })
      .then((response) => {
        return dispatch(registerSuccess(response.message));
      })
      .catch((errors) => {
        return dispatch(registerError(errors));
      });
  };

const initialState = {
  success: false,
  message: '',
  errors: [],
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.message = action.payload;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
