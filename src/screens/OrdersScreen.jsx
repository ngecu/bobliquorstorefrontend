import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, logout, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const OrdersScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/my-account')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
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

  return (
    <Container>
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
          <ListGroup>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--dashboard is-active">
            <Link to="/my-account/">Dashboard</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders">
            <Link to="/my-account/orders/">Orders</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--purchased-products">
            <Link to="/my-account/purchased-products/">Purchased Products</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-address">
            <Link to="/my-account/edit-address/">Addresses</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--payment-methods">
            <Link to="/my-account/payment-methods/">Payment methods</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account">
            <Link to="/my-account/edit-account/">Account details</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--cgkit-wishlist">
            <Link to="/my-account/cgkit-wishlist/">My wishlist</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--lws_woorewards">
            <Link to="/my-account/lws_woorewards/">Loyalty and Rewards</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--communication-preferences">
            <Link to="/my-account/communication-preferences/">Communication</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout">
            <Link to="/my-account/customer-logout/">Log out</Link>
          </ListGroup.Item>
          <ListGroup.Item className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--wpf-delete-account">
            <Link to="/my-account/wpf-delete-account/">Delete Account</Link>
          </ListGroup.Item>
        </ListGroup>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
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
        )}
      </Col>
    </Row>
    </Container>
  )
}

export default OrdersScreen
