import React from 'react';
import { Button, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {requestPayment} from '../actions/mpesaActions'
import { useLocation } from 'react-router-dom';

const MpesaexpresscheckoutScreen = ({ location, history }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  
  const onSubmit = (data) => {
    // Handle form submission
    // dispatch(requestPayment({phone:`254${data.phone}`,amount:cart.totalPrice}))
    const roundedTotalPrice = Math.ceil(cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2));



    dispatch(requestPayment({ phone: `254${data.phone}`, amount: roundedTotalPrice,Order_ID:id }));

    console.log(data);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  // Extract the last 9 digits from the phone number
const phoneNumber = shippingAddress.phone;
const lastNineDigits = phoneNumber.slice(-9);

  return (
    <Container>
    <h1>Mpesa Express Checkout</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Phone Number</label>
        <Controller
          name="phone"
          control={control}
          defaultValue={lastNineDigits}
          rules={{ required: 'Phone number is required' }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              country="IR"
              placeholder="Enter phone number"            />
          )}
        />
        {errors.phone && <span className="error">{errors.phone.message}</span>}
      </div>
        <Row>
            <Col md={6}>
            <Button type="submit" className="w-100">Send Payment Request to Phone</Button>
            </Col>
            <Col md={6}>
                <Link to="/checkout" className="btn btn-primary w-100">Change Payment Method</Link>
            </Col>
        </Row>
      
    </form>
    
    </Container>
  );
};

export default MpesaexpresscheckoutScreen;
