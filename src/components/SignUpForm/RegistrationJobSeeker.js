import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from "classnames";

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/store/auth/registerSlice';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    marginTop: '20px',
    '& .MuiAvatar-root': {
      width: '85px',
      height: '85px',
    },
  },
  divButton: {
    marginTop: '2rem',
  },
  fontGray: {
    color: '#B2B3BD',
  },
  fontSmall: {
    fontSize: '0.8rem',
  },
  widthHalf: {
    width: '210px',
  }
}));

/**
 * Form Validation Schema
 */
 const schema = yup.object().shape({
  name: yup.string().required('You must enter your name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  industry: yup.string().required('You must enter your industry'),
});

const defaultValues = {
  name: '',
  email: '',
  password: '',
  industry: '',
  promo: '',
};

const RegistrationJobSeeker = ({ handleClose }) => {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const authRegister = useSelector(({ register }) => register);
  
  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [sending, setSendingState] = useState(false);

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setSuccessMessage(authRegister.message);
  }, [authRegister.message, setSuccessMessage]);

  useEffect(() => {
    setError("email", {
      type: "manual",
      message: authRegister.errors.message,
    });
    setSendingState(false)
  }, [authRegister.errors, setError, setSendingState]);

  function onSubmit(model) {
    dispatch(submitRegister(model));
    setSendingState(true);
  }

  return (
    <div className="mt-3 text-center">
      <h2>Sign Up! </h2>
      {successMessage !== '' ? (
        <Typography variant="h5" color="secondary">
          {successMessage}
        </Typography>
      ) : (

        <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-4"
              label="Name"
              autoFocus
              type="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="standard"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-4"
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              variant="standard"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-4"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="standard"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-4"
              label="Industry"
              error={!!errors.industry}
              variant="standard"
              required
              fullWidth
            />
          )}
        />
        
        <Button
          variant="contained"
          color="primary"
          className="w-100 mx-auto mt-5"
          aria-label="Register"
          disabled={dirtyFields === "" || !isValid}
          type="submit"
        >
          {sending ? (<CircularProgress color="inherit" />) : "Sign Up" }
        </Button>
      </form>
      )}

    </div>
  );
};

export default RegistrationJobSeeker;