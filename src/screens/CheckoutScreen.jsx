import React, { useState, useEffect } from 'react';
import { Form, Steps, Input, Button, message } from 'antd';
import {  Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, saveShippingAddress } from '../actions/cartActions';
import {
  toLatLon,
  toLatitudeLongitude,
  headingDistanceTo,
  moveTo,
  insidePolygon,
} from 'geolocation-utils';
import GoogleMapReact from 'google-map-react';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';
import { Collapse } from 'react-bootstrap';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const CheckoutScreen = ({ location, history }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [isInsidePolygon, setIsInsidePolygon] = useState(false); // Track whether the current location is inside the polygon

  const dispatch = useDispatch();


  // Function to calculate the distance between two points using latitude and longitude
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of the earth in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Calculate shipping price based on the distance
function calculateShippingPrice(distance) {
  const pricePerKm = 150; // Price per kilometer in shillings
  const distanceInKm = distance / 1000; // Convert distance from meters to kilometers
  const shippingPrice = Math.ceil(distanceInKm) * pricePerKm; // Round up to the nearest kilometer and calculate price
  return shippingPrice;
}

// Example usage


// -1.2855993812287634, 36.814808422747824
const distanceInMeters = calculateDistance( -0.7200037360096324,37.15843007128105,latitude, longitude);
const distanceInKilometers = distanceInMeters / 1000;
const shippingPricePerKm = 150;
const shippingPrice = Math.ceil(distanceInKilometers / 60) * shippingPricePerKm;

console.log('Distance:', distanceInKilometers.toFixed(2), 'km');
console.log('Shipping Price:', shippingPrice, 'KES');

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;
  
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          // Check if the current location is inside the polygon
          const isInside = insidePolygon(
            [position.coords.latitude, position.coords.longitude],
            polygon
          );
          setIsInsidePolygon(isInside);
          setAddress(`${position.coords.latitude}, ${position.coords.longitude}`);

        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };
  useEffect(() => {


    getLocation();
  }, []);

  const polygon = [
    [-0.699174, 37.209438],
    [-0.754702, 37.156481],
    [-0.723205, 37.118458],
    [-0.69145, 37.148069],
  ];

  const handleRetry = () => {
    setLatitude(null);
    setLongitude(null);
    setError(null);
    setIsInsidePolygon(false);
    getLocation();
  };

  


  const [address, setAddress] = useState(shippingAddress.address)
  const [email, setEmail] = useState(shippingAddress.email)
  const [firstName, setfirstName] = useState(shippingAddress.firstName)
  const [lastName, setlastName] = useState(shippingAddress.secondName)
  const [phone, setPhone] = useState(shippingAddress.phone)
  const [additionalNotes, setAdditionalNotes] = useState(shippingAddress.additionalNotes)

  const generateRandomString = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  };


  const submitHandler = (e) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !phone) {
      // Display an error message or perform any other necessary action
      console.log('Please fill in all required fields');
      message.error('Please fill in all required fields');
      return;
    }
  
    console.log('submitted');
    const randomString = generateRandomString(10); // Generate a random string of length 10
    dispatch(saveShippingAddress({ address, firstName, lastName, phone, additionalNotes }));
  
    // Check the selected payment method and perform the appropriate action
    if (openId === 1) {
      // Mpesa Express selected
      history.push(`/m-pesa-express-checkout/?id=${randomString}`);
    } else if (openId === 4) {
      // Mpesa Classic (Buy Goods) selected
      placeOrderHandler("buy-goods");
    }
    else{
      placeOrderHandler("cash-on-delivery");
    }
  };
  
  

    const [openId, setOpenId] = useState(null);

  const handleHeaderClick = (id) => {
    if (id === openId) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };



  const options = [
    {
      label: (
        <div className="row payment-option" onClick={() => handleHeaderClick(1)}>
          <div className="col-md-6">
            <input type="radio" checked={openId === 1} readOnly />
            Mpesa Express
          </div>
          <div className="col-md-6">
            <img src="https://www.oaks.delivery/wp-content/plugins/woocommerce-kenpesa-gateway/assets/images/lipa-na-mpesa.png" alt="Mpesa Express" />
          </div>
        </div>
      ),
      image: 'mpesa-express-image-url',
      text: 'Send an M-Pesa payment request to your phone number.',
      value: 'mpesa-express',
    },
    
    {
      label: (
        <div className="row payment-option" onClick={() => handleHeaderClick(5)}>
          <div className="col-md-12">
            <input type="radio" checked={openId === 2} readOnly />
            Cash on Delivery
          </div>
        </div>
      ),
      image: 'cash-on-delivery-image-url',
      value: 'cash-on-delivery',
      text: 'Need change? Please indicate under Order Notes if our rider should come with change. We can also send you your change by M-Pesa or add it to your wallet to use in the future.',
    },
  ];

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = shippingPrice
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = (payment) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: payment,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  
  return (
    <Container>
      <Steps
        className='my-2'
        current={1}
        items={[
          {
            title: 'Shopping Basket',
          },
          {
            title: 'Details and Checkout',
          },
          {
            title: 'Confirmation',
          },
        ]}
      />

      {!latitude && !longitude && !error ? (
        <p>Loading location...</p>
      ) : error ? (
        <div>
          <Message variant='danger'>
            {error}
            <br />
            <Button onClick={handleRetry}>Retry</Button>
          </Message>
        </div>
      ) : !isInsidePolygon ? (
        <div>
          <Message variant='danger'>
            Sorry. You cannot proceed since you are not in the designated location region.
            <br />
            <Button onClick={handleRetry}>Refresh GPS</Button>
          </Message>
          
        </div>
      ) : (
        <div>
    {/* <div><p>Have a coupon? Cool! <Link to="#">Redeem it here</Link></p></div>
  <div>
    <p>Your glass is almost full...</p>
    <p>Fill your details here <i className="fas fa-arrow-down"></i></p>
  </div> */}
   <Form 
    // onFinish={submitHandler}
    layout="vertical"
    >
  <Row>
 
    <Col md={6}>
 
      <div>
        <Row>
            <Col md={6}>
            <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input value={firstName} onChange={(e) => setfirstName(e.target.value)} />
        </Form.Item>
            </Col>
            <Col md={6}>
            <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input value={lastName} onChange={(e) => setlastName(e.target.value)} />
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
        <Input  value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Item>


      <Form.Item
        label="Email"
        name="Email"
        rules={[
          { required: true, message: 'Please enter your Email Address' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Additional Notes"
        name="additional_notes"
        rules={[
          { required: false, message: 'Please enter your Delivery Address' },
          { type: 'text', message: 'Please enter a valid Delivery Address' },
        ]}
      >
        <Input  value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
      </Form.Item> 
    

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31916.009556217203!2d37.1352006026841!3d-0.7224033406879049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828a28207db7113%3A0xbc8b3625ac089be8!2sMurang&#39;a!5e0!3m2!1sen!2ske!4v1688477953494!5m2!1sen!2ske"  height="450" style={{width:"100%",border:"0", allowfullscreen:"", loading:"lazy", referrerpolicy:"no-referrer-when-downgrade"}}></iframe>


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

                <Row>
                    <Col md={6}>
                        Delivery

                    </Col>
                    <Col md={6}>
                        Ksh {cart.shippingPrice}
                    </Col>
                </Row>
                

              </ListGroup.Item>

              <ListGroup.Item>
               <Row>
                <Col md={6}>
                    <b>Total</b>
                </Col>
                <Col md={6}>
                    <b>Ksh {cart.totalPrice}</b>
                    <br/>
                    <small>
                    (includes KSh {cart.taxPrice} VAT)
                     </small>
                </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>


          
          By placing an order I confirm that I'm 18 years or older and accept the <Link to="#"> terms and conditions</Link>

          <ListGroup>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <ListGroup.Item action onClick={() => handleHeaderClick(index + 1)}>
              <div>{option.label}</div>
            </ListGroup.Item>
            <Collapse in={openId === index + 1}>
              <ListGroup.Item>
                <div>{option.text}</div>
              </ListGroup.Item>
            </Collapse>
          </React.Fragment>
        ))}
      </ListGroup>

<Form.Item
      wrapperCol={{
        offset: 0,
        span: 24,
      }}
    >
      <Button type="primary" onClick={submitHandler}>
      Proceed to Payment
      </Button>
    </Form.Item>
    </Col>
    
  </Row>
  </Form>
  </div>
      )}
    </Container>
  );
};

export default CheckoutScreen;
