import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Row, Col, Dropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Home, Favorite, AccountCircle, ShoppingCart } from '@material-ui/icons';
import { Drawer } from 'antd'
import { listCategories } from '../actions/categoryActions'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  return (
    <>
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <Nav className='mr-auto'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={showDrawer}/>
        </Nav>
        
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/* <img src="https://www.oaks.delivery/wp-content/uploads/onc-logo-svg-header.svg"/> */}
            Drink&Chill</Navbar.Brand>
          </LinkContainer>
          
         
         
          <Nav className='ml-auto account'>
        <LinkContainer id='account' to='/my-account/'>
          <Nav.Link>
            <div className='icon-text-wrapper'>
              <i className='fas fa-user'></i>
            </div>
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to='/basket'>
        <Nav.Link>
          <div className="basket-icon-wrapper icon-text-wrapper" >
            <i className='fas fa-shopping-cart'></i>
           
          </div>
        
        </Nav.Link>
      </LinkContainer>
      </Nav>

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
      <div className='bg-dark form-small-device'>
      <Container className='py-2'>
      <Route render={({ history }) =>   <SearchBox history={history} />} />
      </Container>
      </div>
    </header>


    <Drawer
        extra={ <i onClick={onClose} className="fas fa-circle-xmark"></i>}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        
      >
        {categories && categories.map((category)=>(
          <p>
          <Link to={`/category/${category._id}`}>
             <strong>{category.name}</strong>
             </Link>
             </p>
            ))}
            <h2>CALL US</h2>
            <p>0792677146</p>
      </Drawer>

    </>
  )
}

export default Header
