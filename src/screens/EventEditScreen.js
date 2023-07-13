import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getEventById, updateEvent } from '../actions/eventActions';

const EventEditScreen = ({ match, history }) => {
  const eventId = match.params.id;

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const eventDetails = useSelector((state) => state.eventDetails);
  const { loading, error, event } = eventDetails;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = eventUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(getEventById(eventId));
      history.push('/my-account/events/');
    } else {
      if (!event.name || event._id !== eventId) {
        dispatch(getEventById(eventId));
      } else {
        setName(event.name);
        setDate(event.date.slice(0, 10)); // Assuming date is stored as a string
        setLocation(event.location);
        setDescription(event.description);
      }
    }
  }, [dispatch, history, eventId, event, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEvent(eventId, {
        name,
        date,
        location,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/my-account/events/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Event</h1>
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

            <Form.Group controlId='date'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EventEditScreen;
