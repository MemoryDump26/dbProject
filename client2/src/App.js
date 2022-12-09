import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Signup, Signup2} from './components/Signup';
import {HomePage, HomePage2} from './components/HomePage';
import {Login, Login2} from './components/Login';
import Cart from './components/Cart';

import { CartProvider } from 'react-use-cart';

function App() {
  return (
      <CartProvider>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage2/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/signup' element={<Signup2/>} />
          <Route path='/login' element={<Login2/>} />
        </Routes>
      </div>
      </CartProvider>
  );
}

export default App;
