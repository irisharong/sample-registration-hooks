import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles'

import { Provider } from "react-redux";
import store from "store/rootReducer";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// Styles && Images
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3E85',
    },
    secondary: {
      main: '#52B4DA',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 16,
      },
      containedSecondary: {
        color: '#fff',
      },
    }, 
  }, 
});

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={hist}>
        <Switch>
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
