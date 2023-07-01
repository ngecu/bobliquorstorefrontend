import React, { useEffect } from 'react'
import { Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'

const CategoryProductsScreen = ({ match }) => {
    const categoryId = match.params.id
    const dispatch = useDispatch()
    
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList
  
    useEffect(() => {
        dispatch(listProducts())
      }, [dispatch])
    return(
    <Container>
    <Row>
        <Col md={2}>
        <Form className="facetwp-sort">
  <Form.Control as="select" className="facetwp-sort-select">
    <option value="default">Sort by</option>
    <option value="title_asc">Title (A-Z)</option>
    <option value="title_desc">Title (Z-A)</option>
    <option value="date_desc">Date (Newest)</option>
    <option value="price_asc">Price: Low to High</option>
    <option value="price_desc">Price: High to Low</option>
  </Form.Control>
</Form>


<div id="text-25" className="facet-wrap widget widget_text">
  <div className="gamma widget-title">Categories</div>
  <div className="textwidget">
    <div className="facetwp-facet facetwp-facet-categories facetwp-type-checkboxes" data-name="categories" data-type="checkboxes">
      <div className="facetwp-checkbox" data-value="red-wine">
        <input type="checkbox" />
        <label>Red Wine <span className="facetwp-counter">(94)</span></label>
      </div>
      <div className="facetwp-checkbox" data-value="white-wine">
        <input type="checkbox" />
        <label>White Wine <span className="facetwp-counter">(77)</span></label>
      </div>
      <div className="facetwp-checkbox" data-value="red-sweet-wine">
        <input type="checkbox" />
        <label>Red Sweet Wine <span className="facetwp-counter">(31)</span></label>
      </div>
      <div className="facetwp-checkbox" data-value="sparkling-wine">
        <input type="checkbox" />
        <label>Sparkling Wine <span className="facetwp-counter">(29)</span></label>
      </div>
      <div className="facetwp-checkbox" data-value="rose-wine">
        <input type="checkbox" />
        <label>Rosé Wine <span className="facetwp-counter">(21)</span></label>
      </div>
      <div className="facetwp-overflow facetwp-hidden">
        <div className="facetwp-checkbox" data-value="sweet-white-wine">
          <input type="checkbox" />
          <label>Sweet White Wine <span className="facetwp-counter">(15)</span></label>
        </div>
        <div className="facetwp-checkbox" data-value="non-alcoholic-sparkling">
          <input type="checkbox" />
          <label>Non-Alcoholic Sparkling <span className="facetwp-counter">(9)</span></label>
        </div>
        <div className="facetwp-checkbox" data-value="champagne">
          <input type="checkbox" />
          <label>Champagne <span className="facetwp-counter">(6)</span></label>
        </div>
        <div className="facetwp-checkbox" data-value="flavoured-wine">
          <input type="checkbox" />
          <label>Flavoured Wine <span className="facetwp-counter">(4)</span></label>
        </div>
        <div className="facetwp-checkbox" data-value="prosecco">
          <input type="checkbox" />
          <label>Prosecco <span className="facetwp-counter">(3)</span></label>
        </div>
      </div>
      <a className="facetwp-toggle">See 5 more</a>
      <a className="facetwp-toggle facetwp-hidden">See less</a>
    </div>
  </div>
</div>



        </Col>

        <Col md={10}>
        <Row>
        {products
  .filter((product) => product.category === categoryId) // Filter products by category
  .map((product) => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ))}

          </Row>

        </Col>
    </Row>
    </Container>
)
}

export default CategoryProductsScreen