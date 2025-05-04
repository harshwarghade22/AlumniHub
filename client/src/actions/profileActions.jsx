import axios from 'axios';
import {
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL,
    PROFILE_FETCH_REQUEST,
    PROFILE_FETCH_SUCCESS,
    PROFILE_FETCH_FAIL,
    PROFILE_RESET,
} from '../constants/profileConstants';

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

        dispatch({
            type: PROFILE_CREATE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PROFILE_CREATE_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

export const fetchProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_FETCH_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const { data } = await axios.get('http://127.0.0.1:8000/api/accounts/profile/', config);

        dispatch({
            type: PROFILE_FETCH_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PROFILE_FETCH_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

export const resetProfile = () => ({
    type: PROFILE_RESET
});