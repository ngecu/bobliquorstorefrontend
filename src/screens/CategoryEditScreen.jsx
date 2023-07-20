import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'
import { getCategoryDetails, updateCategory } from '../actions/categoryActions'

const CategoryEditScreen = ({ match, history }) => {
  const categoryId = match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image,setImage] = useState('');
  const [brandings,setBrandings] = useState([]);

  

  const dispatch = useDispatch()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      history.push('/my-account/categories/')
    } else {
      if (!category.name || category._id !== categoryId) {
        dispatch(getCategoryDetails(categoryId))
      } else {
        setName(category.name)
        setDescription(category.description)
        setImage(category.image)
        setBrandings(category.brandings)
      }
    }
  }, [dispatch, history, categoryId, category, successUpdate])

  const handleAddInput = () => {
    setBrandings([...brandings, '']);
  };

  const handleRemoveInput = (index) => {
    const values = [...brandings];
    values.splice(index, 1);
    setBrandings(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...brandings];
    values[index] = event.target.value;
    setBrandings(values);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
        description,
        image,
        brandings
      })
    )
  }

  return (
    <>
      <Link to='/my-account/categories/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Category</h1>
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
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {brandings.map((branding, index) => (
              <>
              <Form.Label>Brandings</Form.Label>
                <Form.Group controlId={`branding-${index}`} key={index}>
          <Form.Label>Branding {index + 1}</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter branding'
            value={branding}
            onChange={(event) => handleInputChange(index, event)}
          />
          {index > 0 && (
            <Button
              variant='danger'
              className='ml-2'
              onClick={() => handleRemoveInput(index)}
            >
              Remove
            </Button>
          )}
        </Form.Group>
              </>
      
      ))}
      <Button variant='primary' onClick={handleAddInput}>
        Add More
      </Button>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CategoryEditScreen
