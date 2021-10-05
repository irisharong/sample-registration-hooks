import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import loginSlice from 'app/store/auth/loginSlice';
import registerSlice from 'app/store/auth/registerSlice';

const rootReducer = combineReducers({
  login   : loginSlice,
  register: registerSlice,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;