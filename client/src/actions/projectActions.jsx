import { GET_ALUMNI_FAIL, GET_ALUMNI_REQUEST, GET_ALUMNI_SUCCESS, GET_USERDETAIL_FAIL, GET_USERDETAIL_REQUEST, GET_USERDETAIL_SUCCESS, LOGIN_PROJECT_FAIL, LOGIN_PROJECT_REQUEST, LOGIN_PROJECT_SUCCESS, LOGOUT_PROJECT, PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, SIGNUP_PROJECT_FAIL, SIGNUP_PROJECT_REQUEST, SIGNUP_PROJECT_SUCCESS, GET_ALUMNI_RECOMMENDATIONS_FAIL, GET_ALUMNI_RECOMMENDATIONS_REQUEST, GET_ALUMNI_RECOMMENDATIONS_SUCCESS } from "../constants/projectConstants";
import { PROFILE_RESET } from "../constants/profileConstants";

import axios from "axios";

export const signup = (name, email, password, password2) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_PROJECT_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const { data } = await axios.post('http://127.0.0.1:8000/api/accounts/signup/', { name, email, password, password2 }, config);
  
      dispatch({
        type: SIGNUP_PROJECT_SUCCESS,
        payload: data
      });
  
      // You may also want to save user info in local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SIGNUP_PROJECT_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  
  
  export const loginProject = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_PROJECT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        { email, password },
        config
      );
  
      dispatch({
        type: LOGIN_PROJECT_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: LOGIN_PROJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  
  
  export const logoutProject = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LOGOUT_PROJECT });
    dispatch({ type: PROFILE_RESET });  // Add this line to reset profile
  };

  export const getUserDetails = (token, userId) => async (dispatch) => {
    console.log(token)
    console.log(userId)
    try {
      dispatch({ type: GET_USERDETAIL_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`http://127.0.0.1:8000/api/accounts/user/${userId}/`, config); // Adjust the endpoint accordingly
      // console.log(data)
  
      dispatch({
        type: GET_USERDETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USERDETAIL_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const createProfile = (profileData) => async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post('http://127.0.0.1:8000/api/accounts/profile/', profileData, config);
      dispatch({ type: PROFILE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PROFILE_CREATE_FAIL,
        payload: error.response?.data?.error || 'Profile creation failed',
      });
    }
};

export const getAlumniList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALUMNI_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get('http://127.0.0.1:8000/api/accounts/alumni/', config);
    
    dispatch({
      type: GET_ALUMNI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALUMNI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAlumniRecommendations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALUMNI_RECOMMENDATIONS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get('http://127.0.0.1:8000/api/accounts/alumni/recommend/', config);
    
    dispatch({
      type: GET_ALUMNI_RECOMMENDATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALUMNI_RECOMMENDATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};