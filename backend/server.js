import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path'
//app config
const app=express()
const port=process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())
//db conection
connectDB()
 
//api end points
app.use("/api/food",foodRouter)
app.use('/images', express.static(path.resolve('uploads')));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.get('/',(req,res)=>{
    res.send("API working")
})
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://murugankabilan39:kabilan12@#@cluster0.uqxwvfl.m