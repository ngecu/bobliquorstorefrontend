import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { listCategories } from '../actions/categoryActions';
import { Collapse } from 'antd';

const { Panel } = Collapse;
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [brandings, setBrandings] = useState([]);
  const [description, setDescription] = useState('');
  const [loadingBrandings, setLoadingBrandings] = useState(false);
  const [category, setCategory] = useState('');
  
  
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/my-account/products/');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
        dispatch(listCategories());
      } else {
        setName(product.name);
        setBrandings(product.brandings);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const addBrandingHandler = () => {
    setBrandings([...brandings, { branding: '', countInStock: 0, price: 0, size: '' }]);
  };

  const removeBrandingHandler = (index) => {
    const updatedBrandings = [...brandings];
    updatedBrandings.splice(index, 1);
    setBrandings(updatedBrandings);
  };

  const brandingChangeHandler = (e, index) => {
    const updatedBrandings = [...brandings];
    updatedBrandings[index][e.target.name] = e.target.value;
    setBrandings(updatedBrandings);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        brandings,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/my-account/products/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Container>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
<Form onSubmit={submitHandler}>
  <Form.Group controlId='name'>
    <Form.Label>Name</Form.Label>
    <Form.Control
      type='text'
      placeholder='Enter name'
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </Form.Group>

  <Form.Group controlId='category'>
    <Form.Label>Category</Form.Label>
    <Form.Control
      as='select'
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value=''>Select Category</option>
      {categories.map((category) => (
        <option key={category._id} value={category}>
          {category.name}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
{category &&   <Form.Group controlId='brandings'>
    <Form.Label>Brandings</Form.Label>
    <Collapse accordion>
      {brandings.map((branding, index) => (
        <Panel header={`Branding ${index + 1}`} key={index}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId={`branding${index}`}>
                <Form.Label>Branding Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter branding name'
                  name='branding'
                  value={branding.branding}
                  onChange={(e) => brandingChangeHandler(e, index)}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId={`size${index}`}>
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter size'
                  name='size'
                  value={branding.size}
                  onChange={(e) => brandingChangeHandler(e, index)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group controlId={`price${index}`}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  name='price'
                  value={branding.price}
                  onChange={(e) => brandingChangeHandler(e, index)}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId={`countInStock${index}`}>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  name='countInStock'
                  value={branding.countInStock}
                  onChange={(e) => brandingChangeHandler(e, index)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId={`description${index}`}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Enter description'
              name='description'
              value={branding.description}
              onChange={(e) => brandingChangeHandler(e, index)}
            />
          </Form.Group>
          <Button
            variant='danger'
            onClick={() => removeBrandingHandler(index)}
          >
            Remove Branding
          </Button>
        </Panel>
      ))}
    </Collapse>
    <Button onClick={addBrandingHandler}>Add Branding</Button>
  </Form.Group>}
 

  <Button disabled={category ? true: false} type='submit' variant='primary'>
    Update
  </Button>
</Form>

        )}
      </Container>
    </>
  );
};

export default ProductEditScreen;
