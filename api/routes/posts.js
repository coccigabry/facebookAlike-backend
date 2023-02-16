import express from 'express'
import { verifyToken } from '../utilities/verifyToken.js'
import { createCtrl, deleteCtrl, getCtrl, likeCtrl, timelineCtrl, updateCtrl } from '../controllers/posts.js'


const router = express.Router()

// CREATE POST
router.post('/', verifyToken, createCtrl)
// UPDATE POST
router.put('/:id', verifyToken, updateCtrl)
// DELETE POST
router.delete('/:id', verifyToken, deleteCtrl)
// GET POST
router.get('/:id', getCtrl)
// GET FOLLOWING USERS POSTS
router.get('/timeline/:userId', /* verifyToken, */ timelineCtrl)
// LIKE POST
router.put('/:id/like', verifyToken, likeCtrl)

export default router