import axios from 'axios';
import {
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_FAIL,
  BANNER_GET_ALL_REQUEST,
  BANNER_GET_ALL_SUCCESS,
  BANNER_GET_ALL_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_FAIL,
} from '../constants/bannerConstants';

// Action to create a new banner
export const createBanner = (url) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('https://bobliquorstoreapi.onrender.com/api/banners', { url }, config);

    dispatch({ type: BANNER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action to get all banners
export const getAllBanners = () => async (dispatch) => {
  try {
    dispatch({ type: BANNER_GET_ALL_REQUEST });

    const { data } = await axios.get('https://bobliquorstoreapi.onrender.com/api/banners');

    dispatch({ type: BANNER_GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_GET_ALL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action to delete a banner
export const deleteBanner = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/banners/${id}`, config);

    dispatch({ type: BANNER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BANNER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const updateBanner = (bannerId, bannerData) => async (dispatch) => {
    try {
      dispatch({ type: BANNER_UPDATE_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.put(`https://bobliquorstoreapi.onrender.com/api/banners/${bannerId}`, bannerData, config);
  
      dispatch({ type: BANNER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: BANNER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  