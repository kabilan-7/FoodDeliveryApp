import React from 'react'
import './Header.css'
import {assets} from '../../assets/assets'
const Header = () => {
  const headerStyle = {
    height: '34vw',
    margin: '30px auto',
    background: `url(${assets.header_img}) no-repeat`,
    backgroundSize: 'contain',
    position: 'relative'
};
  return (
    <div className='header' style={headerStyle}>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <button >View Menu</button>
        </div>
    </div>
  )
}

export default Header