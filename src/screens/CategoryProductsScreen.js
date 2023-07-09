import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Drawer } from 'antd'

const CategoryProductsScreen = ({ match }) => {
    const categoryId = match.params.id
    const dispatch = useDispatch()
    
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList
  
    useEffect(() => {
        dispatch(listProducts())
      }, [dispatch])

      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState('left');
    
      const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };

    return(
    <Container className='category-container'>
    <Row className='category-row'>
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

        <Col md={10} xs={12} sm={12}>
        <Card style={{backgroundColor:"#EFEEE3"}}>
            
              <Col md={12} className='p-2'>
              <>Nothing promises a good time like a good ol’ shot of tequila! Prized for its earthy undertones of blue agave, tequila’s enduring appeal lies in its complex flavor profiles and huge range of notes. Keep browsing for a list of different brands guaranteed to keep any tequila lover happy! Find the perfect bottle for any occasion and get it delivered to your home or office!</>
              </Col>
              {/* <Col md={2}>
                <img src="https://www.oaks.delivery/wp-content/uploads/tequla-category.png" className='w-100' />
              </Col> */}
            
          </Card>
        <Row  >

       
        

        <Col md={0} xs={12}>
          <Button className="w-100" onClick={showDrawer}>SHOW FILTERS</Button>
        </Col>
        {products
  .filter((product) => product.category === categoryId) // Filter products by category
  .map((product) => (
    <Col key={product._id} sm={6} xs={6} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ))}

          </Row>

        </Col>
    </Row>

    <Drawer
        
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
       <Row>
       <Col md={12}>
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
       </Row>
      </Drawer>

    </Container>
)
}

export default CategoryProductsScreen