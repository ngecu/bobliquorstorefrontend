import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import { useSelector } from 'react-redux'
import CategoryProductsScreen from './screens/CategoryProductsScreen'
import WishlistScreen from './screens/WishlistScreen'
import BasketScreen from './screens/BasketScreen'
import OrdersScreen from './screens/OrdersScreen'
import LostPasswordScreen from './screens/LostPasswordScreen'
import NewPasswordScreen from './screens/NewPasswordScreen'
import CheckoutScreen from './screens/CheckoutScreen'

const App = () => {
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList
  return (
    <Router>
      <Header  categories={categories}/>
      <main>
      <Route path='/category/:id' component={CategoryProductsScreen} />
      {/* <Route path='/my-account/orders' component={OrdersScreen} /> */}
      
      
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/my-account' component={LoginScreen} />
          <Route path='/wishlist' component={WishlistScreen} />
          <Route path='/checkout' component={CheckoutScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/basket/:id?' component={BasketScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path="/lost-password" component={LostPasswordScreen} />
          <Route path="/new-password/:id/:token" component={NewPasswordScreen} />

          
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />

<Route
            path='/admin/categorylist'
            component={CategoryListScreen}
            exact
          />
          
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/category/:id/edit' component={CategoryEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
       

       
      </main>
      <Footer />
    </Router>
  )
}

export default App
