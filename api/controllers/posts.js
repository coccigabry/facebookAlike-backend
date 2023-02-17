import Post from "../models/Post.js";
import User from "../models/User.js";


export const createCtrl = async (req, res) => {
    try {
        const post = new Post(req.body)
        const savedPost = await post.save()
        res.status(201).json({ message: 'Post created successfully', infos: savedPost })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const updateCtrl = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(201).json({ message: 'Post updated successfully', infos: updatedPost })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const deleteCtrl = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(201).send('Post deleted successfully')
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const getCtrl = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(201).json({ message: 'Post found successfully', infos: post })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const userTimelineCtrl = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({ userId: currentUser._id })
        res.status(201).json({ message: 'User Timeline loaded successfully', infos: userPosts })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const timelineCtrl = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({ userId: currentUser._id })
        const friendsPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )
        res.status(201).json({ message: 'Timeline loaded successfully', infos: userPosts.concat(...friendsPosts) })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const likeCtrl = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(201).json({ message: 'You like it' })
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(201).json({ message: 'You dislike it' })
        }
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}