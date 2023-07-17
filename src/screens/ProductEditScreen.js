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
  const [branding, setBranding] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBranding, setSelectedBranding] = useState('');
  const [productDetailss, setProductDetailss] = useState([
    { size: '', price: '', countInStock: '', description: '' },
  ]);

  // const handleCategoryChange = (e) => {
  //   const categoryId = e.target.value;
  //   setSelectedCategory(categoryId);
  //   setSelectedBranding('');
  // };

  // const handleBrandingChange = (e) => {
  //   const brandingId = e.target.value;
  //   setSelectedBranding(brandingId);
  // };

  const handleSizeChange = (index, value) => {
    const updatedDetails = [...productDetailss];
    updatedDetails[index].size = value;
    setProductDetailss(updatedDetails);
  };

  const handlePriceChange = (index, value) => {
    const updatedDetails = [...productDetailss];
    updatedDetails[index].price = value;
    setProductDetailss(updatedDetails);
  };

  const handleCountInStockChange = (index, value) => {
    const updatedDetails = [...productDetailss];
    updatedDetails[index].countInStock = value;
    setProductDetailss(updatedDetails);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDetails = [...productDetailss];
    updatedDetails[index].description = value;
    setProductDetailss(updatedDetails);
  };

  const handleAddRow = () => {
    const updatedDetails = [...productDetailss];
    updatedDetails.push({ size: '', price: '', countInStock: '', description: '' });
    setProductDetailss(updatedDetails);
  };

  const handleRemoveRow = (index) => {
    const updatedDetails = [...productDetailss];
    updatedDetails.splice(index, 1);
    setProductDetailss(updatedDetails);
  };

  
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
        console.log(product)
        setName(product.name);
        setBranding(product.brandings);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);



  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedBranding(''); // Reset the selected branding when the category changes
  };

  const handleBrandingChange = (e) => {
    const brandingId = e.target.value;
    setSelectedBranding(brandingId);
  };


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      _id:product._id,
      name:name,
      image:image,
      category: selectedCategory,
      branding: selectedBranding,
      productDetails: productDetailss,
    };
    console.log(formData); // Dispatch or use the form data as required
    dispatch(
      updateProduct(formData)
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

  <Form.Group controlId='name'>
    <Form.Label>Image</Form.Label>
    <Form.Control
      type='text'
      placeholder='Enter Image URL'
      value={image}
      onChange={(e) => setImage(e.target.value)}
    />
  </Form.Group>


  <Form.Group controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as='select'
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value=''>Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>





                    <Form.Group controlId='branding'>
                    <Form.Label>Branding</Form.Label>
                    <Form.Control
                      as='select'
                      value={selectedBranding}
                      onChange={handleBrandingChange}
                      disabled={!selectedCategory} // Disable the select input if no category is selected
                    >
                      <option value=''>Select Brand</option>
                      {selectedCategory &&
                        categories
                          .find((category) => category._id === selectedCategory)
                          .brandings.map((branding, index) => (
                            <option key={index} value={branding}>
                              {branding}
                            </option>
                          ))}
                    </Form.Control>
                  </Form.Group>
          
                  {productDetailss.map((detail, index) => (
        <div key={index}>
          <Form.Row>
            <Form.Group as={Col} controlId={`size-${index}`}>
              <Form.Label>Size(in ml)</Form.Label>
              <Form.Control
                type='number'
                value={detail.size}
                onChange={(e) => handleSizeChange(index, e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`price-${index}`}>
              <Form.Label>Price(in Kesh)</Form.Label>
              <Form.Control
                type='number'
                value={detail.price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`countInStock-${index}`}>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                value={detail.countInStock}
                onChange={(e) => handleCountInStockChange(index, e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`description-${index}`}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={detail.description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
              />
            </Form.Group>

            {index > 0 && (
              <Button variant='danger' onClick={() => handleRemoveRow(index)}>
                Remove
              </Button>
            )}
          </Form.Row>
        </div>
      ))}

      {/* Add row button */}
      <Button variant='primary' onClick={handleAddRow}>
        Add Row
      </Button>




  <Button type='submit' variant='primary'>
    Update
  </Button>
</Form>

        )}
      </Container>
    </>
  );
};

export default ProductEditScreen;
