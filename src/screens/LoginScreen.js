import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import { Checkbox, Form, Input } from 'antd'
import ProfileScreen from './ProfileScreen'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message,] = useState(null);
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
    console.log("submitted");
    const { username, password } = values;
    dispatch(login(username, password));
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container>
      {!userInfo ? <>
        <h1>My Account</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Row>
        <Col md={6}>
        {message && <Message variant='danger'>{message}</Message>}
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
      label="Username or email address"
      name="username"
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
  <Link to="#">Lost Your Password</Link>


        </Col>

        <Col md={6}>
          <h3>Register</h3>
          {/* <Form
           layout={"vertical"}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    // style={{
    //   maxWidth: 600,
    // }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
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
      <Input.Password />
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
      <Button type="submit" variant='success' htmlType="submit">
        Register
      </Button>
    </Form.Item>
  </Form> */}

        </Col>
      </Row>
      </> : (<ProfileScreen/>)}
    
      
    </Container>
  )
}

export default LoginScreen
