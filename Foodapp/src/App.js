
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Nav from './Components/Navbar/Nav';
import Cart from './pages/Cart/Cart';
import Footer from './Components/Footer/Footer';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import { useState } from 'react';
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [ShowLogin,setShowLogin]=useState(false);

  return (
  <>   
  {
    ShowLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>
  }
   <div className="App">
   <ToastContainer/>
  <Nav setShowLogin={setShowLogin}/>
  <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/cart' element={<Cart/>}></Route>
   <Route path='/order' element={<PlaceOrder/>}></Route>
   <Route path='/verify' element={<Verify/>}></Route>
   <Route path='/myorders' element={<MyOrders/>}></Route>
  </Routes>
 </div>
 <Footer/>
 </>
  );
}

export default App;
