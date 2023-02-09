import 'dotenv/config'
import express from "express";
import cors from 'cors'
import mongoose from "mongoose";


mongoose.set('strictQuery', true)
mongoose.connect(
    `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, 
    (err) => {
        if (err) throw err
        console.log('Connected to mongoose')
    }
)


const app = express()


app.use(cors({ origin: '*' }))
app.use(express.json())


app.listen(4000, () => {
    console.log('Server listening my son!')
})