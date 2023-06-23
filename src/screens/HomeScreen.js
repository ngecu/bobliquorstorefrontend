import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
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
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <Container>
      <>

      <Row>
          {categories && categories.map((category)=>(
            <Col key={category._id} sm={12} md={6} lg={4} xl={3}>
            <img src={category.image}/>
          </Col>
          ))}

        </Row>
        
      {!keyword ? <h1>Latest Products</h1> : <h1>{keyword} Results</h1> }
      </>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
      
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
{!keyword && categories && categories.map((i,index)=>(
  <>
  <h1>{i.name}(S)</h1>
<>
{products
  .filter((product) => product.category === i._id)
  .map((product) => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ))}

</>
</>
)) }
</Container>
    </>
  )
}

export default HomeScreen
