import User from "../models/User.js"
import bcrypt from 'bcrypt'


// REGISTER
export const registerCtrl = async (req, res) => {
    try {
        const hashedPsw = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPsw
        })

        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.send(500).json(err)
    }
}
// LOGIN