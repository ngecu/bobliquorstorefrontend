import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listEvents, deleteEvent, createEvent } from '../actions/eventActions';

const EventListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events, page, pages } = eventList;

  const eventDelete = useSelector((state) => state.eventDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = eventDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const eventCreate = useSelector((state) => state.eventCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent,
  } = eventCreate


  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/my-account');
    }
    if (successCreate) {
      history.push(`/admin/event/${createdEvent._id}/edit`)
    } else {
      dispatch(listEvents('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdEvent,
    pageNumber,
  ]);

  const deleteHandler = (eventId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteEvent(eventId));
    }
  };

  const createEventHandler = () => {
    dispatch(createEvent())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Events</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createEventHandler}>
            <i className='fas fa-plus'></i> Create Event
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DATE</th>
                <th>LOCATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event._id}</td>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>
                    <LinkContainer to={`/admin/event/${event._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(event._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default EventListScreen;
