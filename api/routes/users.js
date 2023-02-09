import express from 'express'
import { updateCtrl, deleteCtrl, getCtrl, followCtrl, unfollowCtrl } from '../controllers/users.js'


const router = express.Router()

// UPDATE USER
router.put('/:id', updateCtrl)
// DELETE USER
router.delete('/:id', deleteCtrl)
// GET USER
router.get('/:id', getCtrl)
// FOLLOW USER
router.put('/:id/follow', followCtrl)
// UNFOLLOW USER
router.put('/:id/unfollow', unfollowCtrl)


export default router