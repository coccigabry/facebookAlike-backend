import express from 'express'
import { registerCtrl } from '../controllers/auth.js'


const router = express.Router()

// REGISTER
router.post('/register', registerCtrl)
// LOGIN


export default router