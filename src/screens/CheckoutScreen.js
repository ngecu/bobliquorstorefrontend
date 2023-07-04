import React, { useState, useEffect } from 'react'
import { Form, Steps,Input,Button } from 'antd';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CheckoutScreen = ({ location, history }) => {

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      const dispatch = useDispatch()

      const cart = useSelector((state) => state.cart)
      const { cartItems } = cart



  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Container>
        <Steps className='my-2'
    current={1}
    items={[
      {
        title: 'Shipping Basket'
      },
      {
        title: 'Details and Checkout',
      },
      {
        title: 'Confirmation',
      },
    ]}
  />

  <div>
    <div><p>Have a coupon? Cool! <Link to="#">Redeem it here</Link></p></div>
  <div>
    <p>Your glass is almost full...</p>
    <p>Fill your details here <i className="fas fa-arrow-down"></i></p>
  </div>
  <Row>
    <Col md={6}>
    <Form 
    // onFinish={onFinish}
    layout="vertical"
    >
      <div>
        <Row>
            <Col md={6}>
            <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input />
        </Form.Item>
            </Col>
            <Col md={6}>
            <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input />
        </Form.Item>
            </Col>
        </Row>


      </div>

      <Form.Item
        label="Phone"
        name="Phone"
        rules={[
          { required: true, message: 'Please enter your Phone Number' },
          { type: 'number', message: 'Please enter a valid phone number' },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="Email"
        name="Email"
        rules={[
          { required: true, message: 'Please enter your Email Address' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Delivery Address"
        name="delivery_address"
        rules={[
          { required: true, message: 'Please enter your Delivery Address' },
          { type: 'text', message: 'Please enter a valid Delivery Address' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Additional Notes"
        name="additional_notes"
        rules={[
          { required: false, message: 'Please enter your Delivery Address' },
          { type: 'text', message: 'Please enter a valid Delivery Address' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
    </Col>
    <Col md={6}>
    <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Ksh.{item.price}</Col>
                  <Col md={2}>
                    <select
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Card className='mt-auto'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                    <Col md={6}>
                        <p>
                        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                        </p>
                    </Col>
                    <Col md={6}>
                    Ksh.
                    {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                    </Col>
                </Row>

              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                    <Col md={6}>
                        Delivery

                    </Col>
                    <Col md={6}>
                        Ksh 249
                    </Col>
                </Row>

              </ListGroup.Item>

              <ListGroup.Item>
               <Row>
                <Col md={6}>
                    <b>Total</b>
                </Col>
                <Col md={6}>
                    <b>Ksh 14,394</b>
                    <br/>
                    <small>
                    (includes KSh 1,951 VAT)
                     </small>
                </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className='mt-auto'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                    <Col md={6}>
                        <p>
                        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                        </p>
                    </Col>
                    <Col md={6}>
                    Ksh.
                    {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                    </Col>
                </Row>

              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                    <Col md={6}>
                        Delivery

                    </Col>
                    <Col md={6}>
                        Ksh 249
                    </Col>
                </Row>

              </ListGroup.Item>

              <ListGroup.Item>
               <Row>
                <Col md={6}>
                    <b>Total</b>
                </Col>
                <Col md={6}>
                    <b>Ksh 14,394</b>
                    <br/>
                    <small>
                    (includes KSh 1,951 VAT)
                     </small>
                </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>

    </Col>
  </Row>
  
  </div>
      
    </Container>
  )
}

export default CheckoutScreen
