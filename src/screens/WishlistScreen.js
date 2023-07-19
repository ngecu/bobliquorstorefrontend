import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { addToCart } from '../actions/cartActions'
import { getUserWishes, removeFromWish } from '../actions/wishActions'

const WishlistScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const wish = useSelector((state) => state.wish)
  const { loading,error,wishItems } = wish

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo) {
      history.push('/my-account/?error=please_login')
    }
    else{
      dispatch(getUserWishes(userInfo._id, pageNumber))

    }

    
  }, [
    dispatch,
    history,
    userInfo,
    // successDelete,
    // successCreate,
    // createdProduct,
    pageNumber
  ])

  const deleteHandler = (id) => {
    console.log(id)
    if (window.confirm('Are you sure')) {
      dispatch(removeFromWish(id,userInfo._id))
    }
  }


  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1>My Wishlist</h1>
        </Col>
        {/* <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col> */}
      </Row>
      <>
      {wishItems?.length === 0 ? (
        <Message>
          Your Wishlist is empty 
        </Message>
      ) : (
        <Container>
          <Table responsive className='table-sm'>
            <thead>
                <tr>
                   <th>Product</th>
                   <th>Price</th>
                   <th>Stock Status</th> 
                </tr>
            </thead>
            <tbody>
              {wishItems && wishItems.map((item) => (
                <tr key={item.product}>
                  <td>
                  
                  <img src={item.image} width={100} />
                  {item.name}
                  </td>
                 <td>
                    {item.price} /-
                 </td>
                 <td>
                    <b className='text-success'>In stock</b>
                 </td>
                 <td>
                    <Button 
                    className='btn-sm'
                    variant="success"
                     onClick={(e)=>dispatch(addToCart(item._id, 1))} >
                        <i className='fas fa-shopping-cart'></i>
                     </Button>

                     <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                 </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
    </Container>
  )
}
</>
</Container>
  )}

export default WishlistScreen
