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
  
  export const bannerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BANNER_CREATE_REQUEST:
        return { loading: true };
      case BANNER_CREATE_SUCCESS:
        return { loading: false, success: true, banner: action.payload };
      case BANNER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const bannerGetAllReducer = (state = { banners: [] }, action) => {
    switch (action.type) {
      case BANNER_GET_ALL_REQUEST:
        return { loading: true, banners: [] };
      case BANNER_GET_ALL_SUCCESS:
        return { loading: false, banners: action.payload };
      case BANNER_GET_ALL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const bannerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case BANNER_DELETE_REQUEST:
        return { loading: true };
      case BANNER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case BANNER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

  export const bannerUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case BANNER_UPDATE_REQUEST:
        return { loading: true };
      case BANNER_UPDATE_SUCCESS:
        return { loading: false, success: true, banner: action.payload };
      case BANNER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };