import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row, Table } from 'react-bootstrap';
import Rating from './Rating'
import { Drawer, Progress } from 'antd';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [newPrice, setNewPrice] = useState(product.price);
  const dispatch = useDispatch()


  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const randomPercentage = Math.floor(Math.random() * 11); // Generates a random integer between 0 and 10
    setDiscountPercentage(randomPercentage);

    const calculateNewPrice = product.price - (product.price * randomPercentage) / 100;
    setNewPrice(calculateNewPrice.toFixed(2));
  }, [product.price]);


  const [open, setOpen] = useState(false);

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

  const checkoutHandler = () => {
    // navigate.push('/login?redirect=shipping')
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
          <div className="wishlist-icon">
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
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className='my-0'>
          {discountPercentage > 0 && (
            <del>{product.price}/-</del>
          )}
          <ins>{newPrice}/-</ins>
        </Card.Text>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            // text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Button variant="success" onClick={()=>showDrawer(product)} className="w-100">
          Add to basket
        </Button>
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
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </>
      )}
    </Drawer>
    </>
   
  );
};

export default Product;
