import { MPESA_CREATE_FAIL, MPESA_CREATE_REQUEST, MPESA_CREATE_SUCCESS } from "../constants/mpesaConstants"
import axios from 'axios'
import { logout } from './userActions'
import { message } from 'antd';


export const requestPayment = (mpesaDetails) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MPESA_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`https://bobliquorstoreapi.onrender.com/api/mpesa/stkPush`, mpesaDetails, config);

    if (data.ResponseCode === "0") {
      // STK push request is successful
      dispatch({
        type: MPESA_CREATE_SUCCESS,
        payload: data,
      });
      message.success("Payment request sent successfully.");
    } else if (data.ResponseCode === "1" && data.ResponseDescription === "Cancelled by user") {
      // Payment request was cancelled by the user
      dispatch({
        type: MPESA_CREATE_FAIL,
        payload: data.ResponseDescription,
      });
      message.error("Payment request was cancelled.");
    } else {
      // Other error occurred
      dispatch({
        type: MPESA_CREATE_FAIL,
        payload: data.ResponseDescription,
      });
      message.error(data.ResponseDescription);
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: MPESA_CREATE_FAIL,
      payload: message,
    });
    message.error(message);
  }
};