import express from 'express'
import { verifyToken } from '../utilities/verifyToken.js'
import { createCtrl, deleteCtrl, getCtrl, likeCtrl, timelineCtrl, updateCtrl, userTimelineCtrl } from '../controllers/posts.js'


const router = express.Router()

// CREATE POST
router.post('/', /* verifyToken, */ createCtrl)
// UPDATE POST
router.put('/:id', /* verifyToken, */ updateCtrl)
// DELETE POST
router.delete('/:id', /* verifyToken, */ deleteCtrl)
// GET POST
router.get('/:id', getCtrl)
// GET ALL POSTS FROM A SINGLE USER (PROFILE PAGE)
router.get('/profile/:userId', /* verifyToken, */ userTimelineCtrl)
// GET ALL POSTS FROM YOU AND YOUR FRIENDS (HOME PAGE)
router.get('/timeline/:userId', /* verifyToken, */ timelineCtrl)
// LIKE POST
router.put('/:id/like', /* verifyToken, */ likeCtrl)

export default router