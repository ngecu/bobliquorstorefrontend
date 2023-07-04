import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, register } from '../actions/userActions'
import { Checkbox, Form, Input } from 'antd'
import ProfileScreen from './ProfileScreen'

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message,setMessage] = useState(null);
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    // if (userInfo) {
    //   history.push(redirect)
    // }
  }, [history, userInfo, redirect])

  const submitLoginHandler = (values) => {
    console.log("submitted ",values);
    const { email, password } = values;
    dispatch(login(email, password));
  };

  const submitRegisterHandler = (values) => {
    console.log("submitted register ",values);
    const { name, password,confirmPassword } = values;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      {!userInfo ? <>
        <h1>My Account</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}

      {loading && <Loader />}

      <Row>
        <Col md={6}>
          <h3>Login</h3>
          <Form
            initialValues={{ remember: true }}
            onFinish={submitLoginHandler}
            layout="vertical"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          
            onFinishFailed={onFinishFailed}
            autoComplete="off"
  >
    <Form.Item
      label="Email address"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your username or email!',
        },
      ]}
    >
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 0,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 0,
        span: 16,
      }}
    >
      <Button variant='success' type="submit" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
  <Link to="/lost-password">Lost Your Password</Link>


        </Col>

        <Col md={6}>
          <h3>Register</h3>
          <Form
            initialValues={{ remember: true }}
            onFinish={submitRegisterHandler}
            layout="vertical"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          
            onFinishFailed={onFinishFailed}
            autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your Name',
        },
      ]}
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Form.Item>


    <Form.Item
      label="Email address"
      name="Email"
      rules={[
        {
          required: true,
          message: 'Please input your username or email!',
        },
      ]}
    >
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirmPassword"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      
      />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 0,
        span: 16,
      }}
    >
      <Button variant='success' type="submit" htmlType="submit">
        Register
      </Button>
    </Form.Item>
  </Form>


        </Col>
      </Row>
      </> : (<ProfileScreen/>)}
    
      
    </Container>
  )
}

export default LoginScreen
