import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { 
  loginProjectReducers, 
  profileCreateReducer, 
  signupProjectReducers, 
  userDetailReducers,
  alumniListReducer 
} from './reducers/projectRedcuers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const rootReducer = combineReducers({
  userSignup: signupProjectReducers,
  userLogin: loginProjectReducers,
  userDetails: userDetailReducers,
  profileCreate: profileCreateReducer,
  alumniList: alumniListReducer,
});

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    isAuthenticated: userInfoFromStorage ? true : false,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
