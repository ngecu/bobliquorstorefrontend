import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Row, Col, Dropdown, ListGroup, ListGroupItem } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Home, Favorite, AccountCircle, ShoppingCart } from '@material-ui/icons';
import { Drawer } from 'antd'
import { listCategories } from '../actions/categoryActions'
import { Link } from 'react-router-dom'
import logourl from '../assets/logo.png'
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
  const logoutHandler = () => {
    dispatch(logout())
  }
  const [expanded, setExpanded] = useState(null);
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
            <img src={logourl} className='logo-header' /> Drink&Chill</Navbar.Brand>
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
                    <div className="icon-text-wrapper" data-count={cartItems.length}>
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
        <div className='bg-dark text-light text-white p-2'>
          {userInfo ? <div data-letters={userInfo?.name[0]}> {userInfo?.name}</div> : <div data-letters="AU"> Anonymous User</div>}
            <p>CALL US 0792677146</p>
        </div>
       

        <ListGroup>
  {categories &&
    categories.map((category) => (
      <Dropdown
        key={category._id}
        onToggle={(isOpen) => {
          if (isOpen) {
            setExpanded(category._id);
          } else {
            setExpanded(null);
          }
        }}
      >
        <Dropdown.Toggle
          variant="link"
          id={`dropdown-category-${category._id}`}
          as={Link}
          to={`/category/${category._id}`}
          className="text-decoration-none w-100 p-2"
        >
          <strong>{category.name}</strong>
        </Dropdown.Toggle>

        <Dropdown.Menu className='w-100' show={expanded === category._id}>
          {category.brandings &&
            category.brandings.map((branding) => (
              <Dropdown.Item
                key={branding._id}
                as={Link}
                to={`/category/${category._id}?branding=${branding}`}
                className='p-2'
              >
                {branding}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    ))}
</ListGroup>


      </Drawer>

    </>
  )
}

export default Header
