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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Panel } = Collapse;
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [branding, setBranding] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBranding, setSelectedBranding] = useState('');
  const [price, setPrice] = useState(0)
  const [discount,setDiscount] = useState('')
  const [editorContent, setEditorContent] = useState(null);
  const [countInStock, setCountInStock] = useState(0)

  
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
        setBranding(product.branding);
        setDescription(product.description);
        setPrice(product.price)
        setDiscount(product.discount)
        setImage(product.image)
        setSelectedCategory(product.category)
        setSelectedBranding(product.branding)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);


  useEffect(() => {
    // ... existing code

    // Set the editor's initial content if product.description exists
    if (product.description) {
      setEditorContent(product.description);
    }
  }, [dispatch, history, productId, product, successUpdate]);


   // Define the handler for editor content changes
   const handleEditorChange = (contentState) => {
    setEditorContent(contentState);
  };

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
      _id: product._id,
      name: name,
      image: image,
      category: selectedCategory,
      branding: selectedBranding,
      description: editorContent, // Add the editor content to the form data
      price: price,
      discount: discount,
      countInStock:countInStock
    };
    console.log(formData); // Dispatch or use the form data as required
    dispatch(updateProduct(formData));
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

  <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='discount'>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Discount'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              ></Form.Control>
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
        ?.brandings.map((branding, index) => ( // Add the optional chaining here as well
          <option key={index} value={branding}>
            {branding}
          </option>
        ))}
  </Form.Control>
</Form.Group>


<Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>


                  <ReactQuill theme="snow" value={editorContent} onChange={handleEditorChange} />


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
