import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Home } from './components/Home';
import { ProductDetails } from './components/products/ProductDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/cart/Cart';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from './store';
import { Profile } from './components/user/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { UpdateProfile } from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import { NewPassword } from './components/user/NewPassword';
import { UpdateProduct } from './components/admin/UpdateProduct';
import Shipping from './components/cart/Shipping';
import { ConfirmOrder } from './components/cart/ConfirmOrder';
import { Payment } from './components/cart/Payment';
import { Success } from './components/cart/Success';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/producto/:id' element={<ProductDetails />} />
            <Route path='/listaProductos' element={<ProductList />} />
            <Route path="/nuevoProducto" element={<NewProduct />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/yo" element={<Profile />} />
            <Route path="/yo/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<NewPassword />} />

            {/* Ruta protegida */}
            <Route path='/Dashboard'
              element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path='/updateProduct/:id'
              element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
            <Route path='/shipping'
              element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path='/order/confirm'
              element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
            <Route path='/payment'
              element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path='/success'
              element={<ProtectedRoute><Success /></ProtectedRoute>} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
