import axios from 'axios'

import { WISH_ADD_ITEM, WISH_REMOVE_ITEM } from '../constants/wishContants'

export const addToWish = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://bobliquorstoreapi.onrender.com/api/products/${id}`)

  dispatch({
    type: WISH_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))
}

export const removeFromWish = (id) => (dispatch, getState) => {
  dispatch({
    type: WISH_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('wishtItems', JSON.stringify(getState().wish.wishtItems))
}