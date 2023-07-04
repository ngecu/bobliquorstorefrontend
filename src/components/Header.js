import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Row, Col, Dropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Home, Favorite, AccountCircle, ShoppingCart } from '@material-ui/icons';
const Header = ({categories}) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <>
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/* <img src="https://www.oaks.delivery/wp-content/uploads/onc-logo-svg-header.svg"/> */}
            Drink&Chill</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) =>   <SearchBox history={history} />} />
            <Nav className='ml-auto'>
           
              <LinkContainer to='/my-account/cgkit-wishlist/'>
                  <Nav.Link>
                  <div className="icon-text-wrapper">
        <i className="fas fa-heart"></i>
        <span>Wishlist</span>
      </div>
                  </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                    <LinkContainer to='/my-account/'>
                    <Nav.Link>
                    <div className="icon-text-wrapper">
                      <i className='fas fa-user'></i> 
                      <span>Account</span>
                    </div>
                    </Nav.Link>
                  </LinkContainer>
                // <NavDropdown title={userInfo.name} id='username'>
                //   <LinkContainer to='/profile'>
                //     <NavDropdown.Item>Profile</NavDropdown.Item>
                //   </LinkContainer>
                //   <NavDropdown.Item onClick={logoutHandler}>
                //     Logout
                //   </NavDropdown.Item>
                // </NavDropdown>
              ) : (
                <LinkContainer to='/my-account/'>
                  <Nav.Link>
                  <div className="icon-text-wrapper">
                    <i className='fas fa-user'></i> 
                    <span>Account</span>
                  </div>
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* {userInfo && userInfo.isAdmin && (
                  //   <LinkContainer to='/my-account'>
                  //   <Nav.Link>
                  //   <div className="icon-text-wrapper">
                  //     <i className='fas fa-user'></i> 
                  //     <span>Account</span>
                  //   </div>
                  //   </Nav.Link>
                  // </LinkContainer>

                <NavDropdown title={ <div className="icon-text-wrapper">
                <i className='fas fa-user'></i> 
                <span>Admin</span>
              </div>} id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/categorylist'>
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
<LinkContainer to='/basket'>
        <Nav.Link>
          <div className="basket-icon-wrapper icon-text-wrapper" data-count={cartItems.length}>
            <i className='fas fa-shopping-cart'></i>
            <span>basket</span>
          </div>
          {cartItems.length > 0 && (
            <div className="cart-items">{cartItems.length}</div>
          )}
        </Nav.Link>
      </LinkContainer>

              <LinkContainer to='/checkout'>
                <Nav.Link>

                  <div className="icon-text-wrapper">
                  <i class="fas fa-arrow-right"></i>
                    {/* <i className='fas fa-shopping-cart'></i> */}
                    <span>checkout</span>
                  </div>

                </Nav.Link>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

    {/* <Row>
      <Container>
        <div className='d-flex'>
          <div className='w-50 d-flex'>
          
          {categories && categories.map((category)=>(
              <div className='mx-2'>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
          
           {category.name}
           
           </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          </div>
          ))}
         
          
          </div>
          <div className='w-50'>
          <Nav.Link className="position-relative">
  <i className="fas fa-shopping-cart"></i>
  {cartItemsCount > 0 && (
    <span className="cart-items-count">{cartItemsCount}</span>
  )}
</Nav.Link>
          </div>
        </div>
       
      </Container>
      </Row> */}
    </>
  )
}

export default Header
