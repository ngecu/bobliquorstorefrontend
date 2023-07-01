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

const WishlistScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const wish = useSelector((state) => state.wish)
  const { wishItems } = wish

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    // if (!userInfo || !userInfo.isAdmin) {
    //   history.push('/my-account')
    // }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const addToCartHandler = (product) => {
    const productId = product._id
    dispatch(addToCart(productId, 1))
  };

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
      {wishItems.length === 0 ? (
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
              {wishItems.map((item) => (
                <tr key={item.product}>
                  <td>
                  <img src={item.image} width={100} />
                  {item.name}
                  </td>
                 <td>
                    {item.price}
                 </td>
                 <td>
                    <b className='text-success'>In stock</b>
                 </td>
                 <td>
                    <Button type="button" variant="success" onClick={(e)=>addToCartHandler(item)}>Add To Cart</Button>
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
