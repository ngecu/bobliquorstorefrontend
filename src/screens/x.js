import React, { useState, useEffect } from 'react'
import { Form, Steps,Input,Button } from 'antd';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { 
  toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon 
} from 'geolocation-utils'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const CheckoutScreen = ({ location, history }) => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

      const dispatch = useDispatch()

      const cart = useSelector((state) => state.cart)
      const { cartItems,shippingAddress } = cart

      useEffect(() => {
        const getLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
              },
              (error) => {
                setError(error.message);
              }
            );
          } else {
            setError('Geolocation is not supported by this browser.');
          }
        };
    
        getLocation();
      }, []);

      
      const defaultProps = {
        center: {
          lat: -1.2841,
          lng: 36.8155
        },
        zoom: 11
      };

      const polygon = [
  [-0.699174, 37.209438],
  [-0.754702, 37.156481],
  [-0.723205, 37.118458],
  [-0.691450, 37.148069]
]

console.log(insidePolygon([-0.725321, 37.164136], polygon)) // true
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
    {/* <div><p>Have a coupon? Cool! <Link to="#">Redeem it here</Link></p></div>
  <div>
    <p>Your glass is almost full...</p>
    <p>Fill your details here <i className="fas fa-arrow-down"></i></p>
  </div> */}
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

      {/* <Form.Item
        label="Delivery Address"
        name="delivery_address"
        rules={[
          { required: true, message: 'Please enter your Delivery Address' },
          { type: 'text', message: 'Please enter a valid Delivery Address' },
        ]}
      >
        <Input />
      </Form.Item> */}

<div>
      {latitude && longitude ? (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>

    {/* <div style={{height:"100px",width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={latitude}
          lng={longitude}
          text="My Location"
        />
      </GoogleMapReact>
    </div> */}
    

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31916.009556217203!2d37.1352006026841!3d-0.7224033406879049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828a28207db7113%3A0xbc8b3625ac089be8!2sMurang&#39;a!5e0!3m2!1sen!2ske!4v1688477953494!5m2!1sen!2ske" width="450" height="450" style={{"border":0, allowfullscreen:"", loading:"lazy", referrerpolicy:"no-referrer-when-downgrade"}}></iframe>
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
                  <Col md={5}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  
                  <Col md={2}>
                    * {item.qty}
                  
                  </Col>

                  <Col md={2}>Ksh.{item.price}</Col>

                  {/* <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col> */}
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

                {shippingAddress.length > 0 ? (<Row>
                    <Col md={6}>
                        Delivery

                    </Col>
                    <Col md={6}>
                        Ksh 249
                    </Col>
                </Row>): (<Row>
                    <Col md={6}>
                        Delivery

                    </Col>
                    <Col md={6}>
                    There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.
                    </Col>
                </Row>)}
                

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

          <Card className='mt-2'>
          <Card.Body>
        <Card.Title>
        <Row>
              <Col md={8}>
                  MPESA EXPRESS
              </Col>
              <Col md={4}>
                  <img className='w-100' src="https://www.oaks.delivery/wp-content/plugins/woocommerce-kenpesa-gateway/assets/images/lipa-na-mpesa.png" />
              </Col>
            </Row>
        </Card.Title>
        <Card.Text>Send an M-Pesa payment request to your phone number.</Card.Text>
      </Card.Body>
          </Card>
          
          By placing an order I confirm that I'm 18 years or older and accept the <Link to="#"> terms and conditions</Link>

<Button className='w-100 btn btn-block btn-success p-2'>
  Proceed to Payment
</Button>
    </Col>
  </Row>
  
  </div>
      
    </Container>
  )
}

export default CheckoutScreen
