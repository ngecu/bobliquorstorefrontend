import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, logout, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { Link,useLocation } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import UserListScreen from './UserListScreen'
import ProductListScreen from './ProductListScreen'
import { useRouteMatch } from 'react-router-dom';
import CategoryListScreen from './CategoryListScreen'
import OrderListScreen from './OrderListScreen'
import UserEditScreen from './UserEditScreen'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getUserWishes } from '../actions/wishActions'
import WishlistScreen from './WishlistScreen'
import BannerformScreen from './BannerformScreen'
import EventListScreen from './EventListScreen'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const match = useRouteMatch();
  const history = useHistory();

  const location = useLocation();
  const { pathname } = location;


  console.log(pathname)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


  const wish = useSelector((state) => state.wish)
  const { wishItems } = wish

  useEffect(() => {
    if (!userInfo) {
      history.push('/my-account/')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails(userInfo?._id))
        dispatch(listMyOrders())

        if(pathname =="/my-account/cgkit-wishlist/"){
          console.log("you are in wishlist")
          dispatch(getUserWishes(userInfo._id))
        }
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  const addToCartHandler = (product) => {
    const productId = product._id
    dispatch(addToCart(productId, 1))
  };
  
  return (
    <>
    <h2>My Account</h2>
    <Row>
       
      <Col md={3}>
       
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
          <ListGroup>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--dashboard is-active">
            <Link to="/my-account/">Dashboard</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders">
            <Link to="/my-account/orders/">Orders</Link>
          </ListGroup.Item>
          {/* <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--purchased-products">
            <Link to="/my-account/purchased-products/">Purchased Products</Link>
          </ListGroup.Item> */}
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account">
            <Link to="/my-account/edit-account/">Account details</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--cgkit-wishlist">
            <Link to="/my-account/cgkit-wishlist/">My wishlist</Link>
          </ListGroup.Item>
          {/* <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--lws_woorewards">
            <Link to="/my-account/lws_woorewards/">Loyalty and Rewards</Link>
          </ListGroup.Item> */}
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout">
            <Link onClick={logoutHandler}>Log out</Link>
          </ListGroup.Item>
        </ListGroup>
          {userInfo.isAdmin && <>
          <h2>Admin Panel</h2>
          <ListGroup>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--dashboard is-active">
            <Link to="/my-account/users/">Users</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders">
            <Link to="/my-account/products/">Products</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--purchased-products">
            <Link to="/my-account/categories/">Categories</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account">
            <Link to="/my-account/orders/">Orders</Link>
          </ListGroup.Item>

          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account">
            <Link to="/my-account/banner/">Banners</Link>
          </ListGroup.Item>

          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account">
            <Link to="/my-account/events/">Events</Link>
          </ListGroup.Item>

        </ListGroup>
          </>}
        </>
        )}
      </Col>
      <Col md={9}>
      {pathname === '/my-account/' && (
        <>
      Hello <b><strong>{user?.email}</strong></b> (not {user?.email} <Link onClick={logoutHandler}>Log out </Link>)

From your account dashboard you can view your <Link to="/my-account/orders/">recent orders</Link>, manage your shipping and billing addresses, and <Link to="/edit-account"> edit your password and account details.</Link>
        {/* <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )} */}
        </>)}

  

{pathname === '/my-account/purchased-products/' && (
  <>
    <h2>My Purchases</h2>
    {loadingOrders ? (
      <Loader />
    ) : errorOrders ? (
      <Message variant='danger'>{errorOrders}</Message>
    ) : orders?.length === 0 ? (
      <Message>
        <p>No order has been made yet.</p>
        <p>
          <Link to="/">Browse Products</Link>
        </p>
      </Message>
    ) : (
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders
            ?.filter((order) => order.isPaid) // Filter only the orders that have been paid
            .map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    )}
  </>
)}

{pathname === '/my-account/edit-account/' && (
        <>
        {/* <h2>User Profile</h2> */}
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
        </>
      )}

{pathname === '/my-account/cgkit-wishlist/' && (
<WishlistScreen history={history} match={match}/>

)}

{pathname === '/my-account/lws_woorewards/' && (
      <>
     <h1>Your Points Balance</h1>
     <h2 className='border'>0 Points</h2>
     <h1>Available Rewards</h1>
     <h1>How to earn points</h1>
     <h2>
      Spand Money
      <br/>
      1 Point/ 100/-
     </h2>
</>

)}


{/* ADMIN RENDERS  */}

{pathname === '/my-account/users/' && (
       <UserListScreen/>
      )}


{pathname === '/my-account/products/' && (
       <ProductListScreen history={history} match={match}/>
      )}


{pathname === '/my-account/categories/' && (
       <CategoryListScreen history={history} match={match}/>
      )}

{pathname === '/my-account/orders/' && (
       <OrderListScreen  history={history} match={match}/>
      )}


{pathname === `/my-account/users/:id/edit` && (
       <UserEditScreen match={match}/>
      )}

{pathname === `/my-account/banner/` && (
  <BannerformScreen />
)}

{pathname === `/my-account/events/` && (
  <EventListScreen history={history} match={match} />
)}
      </Col>
    </Row>
    </>
  )
}


export default ProfileScreen
