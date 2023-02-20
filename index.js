import 'dotenv/config'
import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
// to upload file on server
import multer from 'multer'


import authRoute from './api/routes/auth.js'
import userRoute from './api/routes/users.js'
import postRoute from './api/routes/posts.js'


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


// start middleware to upload file on server
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        console.log(req.body.name)

        cb(null, req.body.name)
    }
})
const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully')
    } catch (err) {
        console.error(err)
    }
})
//end middleware to upload file on server

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)


app.get('/', (req, res) => {
    res.send('Welcome to Tijuana...')
})

app.listen(4000, () => {
    console.log('Server listening my son!')
})