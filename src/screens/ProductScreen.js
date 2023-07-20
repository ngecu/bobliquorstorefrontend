import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table,Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import { Drawer, Progress } from 'antd';
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { addToWish } from '../actions/wishActions';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import parse from 'html-react-parser';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { addToCart, removeFromCart } from '../actions/cartActions';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')


  const [open, setOpen] = useState(false);

  const handleWishlistAdd = (product)=>{
    console.log("prodcut addeing to wishlist")
    const productId = product._id
    dispatch(addToWish(productId, userInfo._id))
  }

  const showDrawer = (product) => {
    const productId = product._id
    dispatch(addToCart(productId, 1))

    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const calculateProgress = () => {
    const totalCash = 15000; // Set the total cash amount
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    const progressPercentage = Math.round((cartTotal / totalCash) * 100);
    return progressPercentage;
  };

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
    <Container>
      {/* <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: Ksh.{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {parse(product.description)}
                </ListGroup.Item>
              </ListGroup>

              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>Ksh.{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={()=>showDrawer(product)}
                      className='btn-block btn-success w-100'
                      type='button'
                      variant='success'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>

            </Col>
            
          </Row>
          <Row>
            <Col md={12}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/my-account/'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className='flex-nowrap'>
            You may also like...
    {/* {products.map((product) => (
      <Col key={product._id} xs={6} sm={6} md={3} lg={3} xl={3} className='px-1'>
        <Product product={product} />
      </Col>
    ))} */}
  </Row>
        </>
      )}
    </Container>

<Drawer
title={
  <>
    <p>Basket</p>
    <Progress percent={calculateProgress()} showInfo={false} />
    <div className='text-center'>
      <small>Get free delivery for orders over 15,000/-</small>
    </div>
  </>
}
placement="right"
onClose={onClose}
visible={open}
>
{cartItems.length === 0 ? (
  <Message>
    Your cart is empty <Link to="/">Go Back</Link>
  </Message>
) : (
  <>
    <Table responsive className='table-sm'>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.product}>
            <td>
              <Button
                type='button'
                variant='light'
                onClick={() => removeFromCartHandler(item.product)}
              >
                <i className='fas fa-trash'></i>
              </Button>
            </td>
            <td>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <br />
              {item.price}/-
              <br />
              <Form.Control
                as='select'
                value={item.qty}
                onChange={(e) =>
                  dispatch(addToCart(item.product, Number(e.target.value)))
                }
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
            </td>
            <td>
              <img src={item.image} className='w-100' alt={item.name} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Card className='mt-auto'>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            items
          </h2>
          Ksh.
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </ListGroup.Item>

        <ListGroup.Item>
          <Link to="/basket" className="btn btn-secondary btn-block w-100">View Basket</Link>
        </ListGroup.Item>

        <ListGroup.Item>
          <Link to="/checkout" className="btn btn-success btn-block w-100">
            Proceed To Checkout
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
    <img src="https://www.oaks.delivery/wp-content/uploads/mini-cart-payment-methods-ke.png" className='w-100' />
  </>
)}
</Drawer>
</>
  )
}

export default ProductScreen
