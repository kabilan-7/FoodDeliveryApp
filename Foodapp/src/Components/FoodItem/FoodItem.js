import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
const FoodItem = ({id,name,price,describtion,image}) => {
    
    const {cartItems,addtoCart,removefromCart,url}=useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {
                !cartItems[id]?<img className="add" onClick={()=>addtoCart(id)} src={assets.add_icon_white} />:<div className='food-item-counter'>
                 <img onClick={()=>removefromCart(id)}src={assets.remove_icon_red} alt="" />
                 <p>{cartItems[id]}</p>
                 <img onClick={()=>addtoCart(id)}
                 src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{describtion}</p>
            <p className="food-item-price">${price}</p>
        </div>
         </div>
  )
}

export default FoodItem