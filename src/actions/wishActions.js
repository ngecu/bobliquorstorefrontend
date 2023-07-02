import axios from 'axios'

import { WISH_ADD_ITEM, WISH_REMOVE_ITEM } from '../constants/wishContants'

export const addToWish = (id, userId) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://bobliquorstoreapi.onrender.com/api/products/${id}`)

  localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))

  try {
    const { data: data2 } = await axios.post(`https://bobliquorstoreapi.onrender.com/api/users/addToWish/${userId}`, { productId: id })

    dispatch({
      type: WISH_ADD_ITEM,
      payload: data2,
    })
  } catch (error) {
    console.error('Failed to add product to wishlist:', error.message)
  }
}

export const removeFromWish = (id, userId) => async (dispatch, getState) => {
  localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))

  try {
    await axios.post(`https://bobliquorstoreapi.onrender.com/api/users/removeFromWish/${userId}`,  { productId: id } )

    dispatch({
      type: WISH_REMOVE_ITEM,
      payload: id,
    })

    localStorage.setItem('wishtItems', JSON.stringify(getState().wish.wishtItems))
  } catch (error) {
    console.error('Failed to remove product from wishlist:', error.message)
  }
}
