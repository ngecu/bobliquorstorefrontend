import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row, Table } from 'react-bootstrap';
import Rating from './Rating'
import { Drawer, Progress } from 'antd';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { addToWish } from '../actions/wishActions';

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [newPrice, setNewPrice] = useState(product.price);
  const dispatch = useDispatch()


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Calculate the discounted price using the discount from product.discount
    const calculateDiscountedPrice = Math.ceil(product.price + (product.price * product.discount) / 100);
    setNewPrice(calculateDiscountedPrice);
    setDiscountPercentage(product.discount)
  }, [product.price, product.discount]);


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
  
  const MAX_NAME_LENGTH = 30;
  const shortenProductName = (name) => {
    if (name.length <= MAX_NAME_LENGTH) return name;
    return name.substring(0, MAX_NAME_LENGTH) + '...';
  };

  return (
    <>
     <Card
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-image">
        <Card.Img variant="top" src={product.image} alt={product.name} />
        {isHovered && (
          <div className="wishlist-icon" onClick={(e)=>handleWishlistAdd(product)}>
            <i className="fas fa-heart"></i>
          </div>
        )}
        {discountPercentage > 0 && (
          <div className="discount-badge">
            <p>-{discountPercentage}%</p>
          </div>
        )}
      </div>
      <Card.Body>
        <Card.Title>
        <Link to={`product/${product._id}`}>{shortenProductName(product.name)}</Link>
          </Card.Title>
        <Card.Text className='my-0'>
          <Row>
            <Col md={6} xs={6}>
            <del>{newPrice}/-</del>
            </Col>
            <Col md={6} xs={6}>
            <ins>{product.price}/-</ins>
            </Col>
          </Row>
        </Card.Text>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            // text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        {product.countInStock > 0 ? (
        <Button variant="success" onClick={()=>showDrawer(product)} className="w-100">
          Add to basket
        </Button>
        ):(  <Button disabled={true} variant="primary" className="w-100">
        Out of Stock
      </Button>)}
      </Card.Body>
    </Card>
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
   
  );
};

export default Product;
