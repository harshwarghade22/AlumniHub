import { PROFILE_FETCH_FAIL, PROFILE_FETCH_REQUEST, PROFILE_FETCH_SUCCESS, PROFILE_RESET } from "../constants/profileConstants";
import { GET_ALUMNI_FAIL, GET_ALUMNI_REQUEST, GET_ALUMNI_SUCCESS, GET_USERDETAIL_FAIL, GET_USERDETAIL_REQUEST, GET_USERDETAIL_SUCCESS, LOGIN_PROJECT_FAIL, LOGIN_PROJECT_REQUEST, LOGIN_PROJECT_SUCCESS, LOGOUT_PROJECT, PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, SIGNUP_PROJECT_FAIL, SIGNUP_PROJECT_REQUEST, SIGNUP_PROJECT_SUCCESS } from "../constants/projectConstants";

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    };
      
export const signupProjectReducers = (state = initialState, action) => {
switch (action.type) {
    case SIGNUP_PROJECT_REQUEST:
    return {
        ...state,
        loading: true,
    };
    case SIGNUP_PROJECT_SUCCESS:
    return {
        ...state,
        loading: false,
        userInfo: action.payload,
    };
    case SIGNUP_PROJECT_FAIL:
    return {
        ...state,
        loading: false,
        error: action.payload,
    };
    default:
    return state;
}
};

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState2 = {
  isAuthenticated: userInfoFromStorage ? true : false,
  userInfo: userInfoFromStorage,
};


export const loginProjectReducers = (state = initialState2, action) => {
  switch (action.type) {
    case LOGIN_PROJECT_REQUEST:
      return { loading: true, isAuthenticated: false };
    case LOGIN_PROJECT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case LOGIN_PROJECT_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT_PROJECT:
      return {
        isAuthenticated: false,
        userInfo: null,
      };
    default:
      return state;
  }
};

export const userDetailReducers = (state = {}, action) =>{
    switch(action.type){
        case GET_USERDETAIL_REQUEST:
            return {
                loading: true
            }
        case GET_USERDETAIL_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case GET_USERDETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const initialState3 = {
  loading: false,
  profile: null,
  error: null,
};

export const profileCreateReducer = (state = initialState3, action) => {
  switch (action.type) {
    case PROFILE_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case PROFILE_CREATE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case PROFILE_FETCH_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PROFILE_RESET:
      return initialState3;
    default:
      return state;
  }
};

const initialAlumniState = {
  loading: false,
  alumni: [],
  error: null,
};

export const alumniListReducer = (state = initialAlumniState, action) => {
  switch (action.type) {
    case GET_ALUMNI_REQUEST:
      return { ...state, loading: true };
    case GET_ALUMNI_SUCCESS:
      return { loading: false, alumni: action.payload };
    case GET_ALUMNI_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};