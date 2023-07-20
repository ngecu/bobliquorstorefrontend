import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { updateBanner, createBanner,getAllBanners } from '../actions/bannerActions'

const BannerformScreen = () => {
  const [url, setUrl] = useState('');

  const dispatch = useDispatch()

  const bannerGetAll = useSelector((state) => state.bannerGetAll);
  const { banners } = bannerGetAll;


  useEffect(() => {
    dispatch(getAllBanners())
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bannerData = {
      url,
    };
      dispatch(createBanner(url));
    }
  ;

  return (
    <>
    <h1>Banners Page</h1>
    <h3>Previous Banners</h3>

    <Row>
      {banners.map((banner)=>(
        <Col md={2} >
              <img src={banner.url} className='w-100' />
        </Col>
      ))}
     
    </Row>
   
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="url">
        <Form.Label>New Banner URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        {banners[0] ? 'Update' : 'Create'}
      </Button>
    </Form>

    </>
  );
};

export default BannerformScreen;
