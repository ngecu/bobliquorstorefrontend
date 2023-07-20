import axios from 'axios'

import { USER_WISHES_FAIL, USER_WISHES_REQUEST, USER_WISHES_SUCCESS, WISH_ADD_ITEM, WISH_REMOVE_ITEM } from '../constants/wishContants'
import { logout } from './userActions'
import { message } from 'antd';

export const getUserWishes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_WISHES_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`https://bobliquorstoreapi.onrender.com/api/users/userWishlist/${id}`, config)

    dispatch({
      type: USER_WISHES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_WISHES_FAIL,
      payload: message,
    })
  }
}



export const addToWish = (id, userId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`https://bobliquorstoreapi.onrender.com/api/products/${id}`);

    localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems));

    const { data: data2 } = await axios.post(`https://bobliquorstoreapi.onrender.com/api/users/addToWish/${userId}`, { productId: id });

    dispatch({
      type: WISH_ADD_ITEM,
      payload: data2,
    });

    message.success('Product added to wishlist!');
  } catch (error) {
    console.error('Failed to add product to wishlist:', error.message);
    message.error('Failed to add product to wishlist.');
  }
};

export const removeFromWish = (id, userId) => async (dispatch, getState) => {
  try {
    localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems));

    await axios.post(`https://bobliquorstoreapi.onrender.com/api/users/removeFromWish/${userId}`, { productId: id });

    dispatch({
      type: WISH_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems));

    message.success('Product removed from wishlist!');
  } catch (error) {
    console.error('Failed to remove product from wishlist:', error.message);
    message.error('Failed to remove product from wishlist.');
  }
};

