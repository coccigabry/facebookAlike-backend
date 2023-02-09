import 'dotenv/config'
import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';

import authRoute from './api/routes/auth.js'
import userRoute from './api/routes/users.js'


mongoose.set('strictQuery', true)
mongoose.connect(
    `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`,
    { useNewUrlParser: true },
    (err) => {
        if (err) throw err
        console.log('Connected to mongoose')
    }
)


const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)


app.get('/', (req, res) => {
    res.send('Welcome to Tijuana...')
})

app.listen(4000, () => {
    console.log('Server listening my son!')
})