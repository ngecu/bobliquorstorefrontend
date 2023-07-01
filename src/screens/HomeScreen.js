import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, CardDeck } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { Skeleton } from 'antd'
import { listCategories } from '../actions/categoryActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList


  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  useEffect(() => {
    dispatch(listCategories())
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        // <ProductCarousel />
        <>
        {loading ? (
        <Skeleton active />):(
          <img src="https://www.oaks.delivery/wp-content/uploads/banner-1.png" className='w-100' />
        )
        }
        </>
       
      ) : (
        <Container>
        <Link to='/' className='btn btn-primary'>
          Go Back
        </Link>
        </Container>
      )}
      <Container>
      <>

      <Row className='my-2'>
          {categories && categories.map((category)=>(
            <Col key={category._id} xs={6} sm={6} md={3} lg={3} xl={3}>
                <Link to={`/category/${category._id}`}>
                <Card>
                
                  <Card.Img src={category.image} variant='top' />
               

                  <Card.Body className='text-center p-0'>
       
          <Card.Title as='div'>
            <strong>{category.name}</strong>
          </Card.Title>

      </Card.Body>

                </Card>
                </Link>
            
          </Col>
          ))}

        </Row>
        
      {!keyword ? <h1>New Arrivals</h1> : <h1>{keyword} Results</h1> }
      </>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='justify-content-center'>
            <CardDeck>
              {products.map((product) => (
                <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </CardDeck>
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}


{!keyword && categories && categories.map((i,index)=>(
  <>
  <h1>{i.name}(S)
  
  <Link
                to={`/category/${i._id}`}
                className="float-right"
              >
                View All &rarr;
              </Link>

  </h1>
  <Row>
  {products
    .filter((product) => product.category === i._id)
    .map((product) => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="h-100">
        <Product product={product} />
      </Col>
    ))}
</Row>
</>
)) }
</Container>
    </>
  )
}

export default HomeScreen
