import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'
import {  message } from 'antd';
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const key = 'updatable';
  message.loading({ content: 'Loading...', key });

  try{
    const { data } = await axios.get(`https://bobliquorstoreapi.onrender.com/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    })
    message.success({ content: 'Item added to cart!', key, duration: 2 });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
  catch(error){
    message.error({ content: 'Error adding item to cart!', key, duration: 2 });
  }
  
}

export const removeFromCart = (id) => (dispatch, getState) => {
  const key = 'updatable';
  try {
    
    // Display success message
    message.loading({ content: 'Removing item from cart...', key });

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    // Display success message
    message.success({ content: 'Item removed from cart!', key, duration: 2 });
  } catch (error) {
    // Display error message
    message.error({ content: 'Error removing item from cart!', key, duration: 2 });
  }
};


export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
