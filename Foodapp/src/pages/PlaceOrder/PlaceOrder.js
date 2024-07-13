import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const [selectedMethod, setSelectedMethod] = useState('COD');

  const handlePaymentChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    // Cart items details
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      if (selectedMethod === "COD") {
        toast.success("Order Placed!");
        navigate('/myorders');
      } else if (selectedMethod === "Stripe" && response.data.success) {
        toast.success("Order Placed!");
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Error placing order. Please try again.");
      }
    } catch (error) {
      toast.error("Error placing order. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) navigate("/cart");
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Second name' />
        </div>
        <input required name='email' value={data.email} onChange={onchangeHandler} type="email" placeholder='Email address' />
        <input required name="street" value={data.street} onChange={onchangeHandler} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onchangeHandler} type="text" placeholder='City' />
          <input required name='state' value={data.state} onChange={onchangeHandler} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' value={data.zipcode} onChange={onchangeHandler} type="text" placeholder='Zip code' />
          <input required name="country" value={data.country} onChange={onchangeHandler} type="text" placeholder='Country' />
        </div>
        <input required name='phone' value={data.phone} onChange={onchangeHandler} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-detail'>
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-detail'>
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className='cart-total-detail total'>
              <p>Total</p>
              <p>${getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <div className="payment-method">
            <h2>Payment Method</h2>
            <div className="payment-option">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="COD"
                checked={selectedMethod === 'COD'}
                onChange={handlePaymentChange}
              />
              <label htmlFor="cod">COD ( Cash on delivery )</label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                id="stripe"
                name="payment"
                value="Stripe"
                checked={selectedMethod === 'Stripe'}
                onChange={handlePaymentChange}
              />
              <label htmlFor="stripe">Stripe ( Credit/Debit )</label>
            </div>
          </div>
          <button type='submit'>Place order</button>
        </div>
      </div>
     
    </form>
  );
};

export default PlaceOrder;
