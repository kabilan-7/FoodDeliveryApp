import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios'
export const StoreContext=createContext(null);
const StoreContextProvider=(props)=>{
    const [token,setToken] = useState("")
    const [cartItems,setCartItems] = useState({})
    const [food_list,setFoodList]=useState([])
    const url = "http://localhost:4000"
    const addtoCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            
        }
    }

    const removefromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) 
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo=food_list.find(product=> product._id===item)
            totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async ()=>{
        const response=await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }
    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }
    useEffect(()=>{
        const loadData = async ()=>{
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
                
            }
        }
        loadData()
    },[])
    const contextvalue={
     food_list,
     cartItems,
     setCartItems,
      addtoCart,
      removefromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
    }
   return(
    <StoreContext.Provider value={contextvalue}>
        {props.children}
    </StoreContext.Provider>
   )
}
export default StoreContextProvider