import React, { useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { listEvents } from '../actions/eventActions';
import { listTopProducts } from '../actions/productActions';
import Rating from './Rating';

const Footer = () => {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events, page, pages } = eventList;
  
  const productTopRated = useSelector((state) => state.productTopRated)
  const { products } = productTopRated

  useEffect(() => {
    dispatch(listEvents(''))
    dispatch(listTopProducts())
},[dispatch])

  return (
    <>
<section className="">
  <Container className="text-center text-md-start mt-5">
    <Row>
      <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
        <div id="custom_html-10" className="widget_text widget widget_custom_html">
          <b className="gamma widget-title">Over 1300 drinks available</b>
          <div className="textwidget custom-html-widget">
            <p>Drinks &amp; Chills has a wide selection of wines, gins, vodkas, rums, tequila, liqueurs, and other drinks to choose from.</p>
          </div>
        </div>
      </Col>

      <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
        <div id="custom_html-8" className="widget_text widget widget_custom_html">
          <span className="gamma widget-title">24/7 Express Delivery</span>
          <div className="textwidget custom-html-widget">
            <p>We deliver any time, any day, in <strong>less than 1 hour</strong> - average: 23 min. We also offer next-day countrywide alcohol delivery in Kenya.</p>
          </div>
        </div>
      </Col>
    
      <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
        <div id="custom_html-9" className="widget_text widget widget_custom_html">
          <span className="gamma widget-title">Free pick up</span>
          <div className="textwidget custom-html-widget">
            <p>At any of our store locations.</p>
          </div>
        </div>
      </Col>

      <Col xs={12} sm={3} md={3} lg={3} xl={3} className="text-left">
        <div id="custom_html-11" className="widget_text widget widget_custom_html">
          <span className="gamma widget-title">100% Secure Checkout</span>
          <div className="textwidget custom-html-widget">
            <p>Pay online with M-Pesa Express, Online VISA (3D Secure), PayPal and BitPay. We also accept Cash and PDQ (card payment) on delivery.</p>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section>


      <footer className="text-center text-lg-start   text-light">
      {/* Section: Social media */}
     
      {/* Section: Social media */}

      {/* Section: Links */}
      <section className="">
        <Container className="text-center text-md-start mt-5">
          {/* Grid row */}
          <Row className="mt-3">
            {/* Grid column */}
            <Col md="4" lg="4" xl="4" className="mx-auto mb-4">
              {/* Links */}
              <p className="text-uppercase fw-bold mb-4">
                Recent Events
              </p>
              {events.slice(0, 2).map((event) => (
                <p className='text-muted' key={event._id}>{event.name}</p>
              ))}
              
             
            </Col>
            {/* Grid column */}

            {/* Grid column */}
            <Col md="4" lg="4" xl="4" className="mx-auto mb-md-0 mb-4">
              {/* Links */}
              <p className="text-uppercase fw-bold mb-4">Top Rated Products</p>
              {products.slice(0, 2).map((product) => (
                <Row key={product._id}>
                  <Col md={6} xs={6}>
                    <p className='text-muted'>{product.name}</p>
                    <Rating
                      value={product.rating}
                      // text={`${product.numReviews} reviews`}
                    />
                  </Col>
                  <Col md={6} xs={6}>
                    <Image src={product.image} alt={product.name} fluid width={50} />
                  </Col>
                </Row>
))}

            </Col>
            {/* Grid column */}
          </Row>
          {/* Grid row */}
        </Container>
      </section>
      {/* Section: Links */}

      {/* Copyright */}
      {/* <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
       
        <a className="text-reset fw-bold" href="">DevNgecu</a> © 2023
      </div> */}
      <Row>
        <Col md={6} className='py-2'>
        © Drink & Chill  2023
        <br/>
        Built with love by DevNgecu
        </Col>
        <Col md={6}>
          <Link className="text-danger" to="#">
          <i class="fas fa-phone"></i> +254707583092
          </Link>
          <Link to="#" className="text-secondary">
            | +254759594677
          </Link>
        </Col>
      </Row>
      {/* Copyright */}
    </footer>

    </>
    
  )
}

export default Footer
