import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://murugankabilan39:12345@cluster0.p3kvyo5.mongodb.net/food-del').then(()=>console.log("DB is connected"))
}