"use strict"

const {User} = require("../models/index.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

class UserControllers {
    static async login(req,res,next) {
        try {
            let {email,password} = req.body
            if (!email) throw new Error("Please fill in the email")
            if (!password) throw new Error("Please fill in the password")
            const user = await User.findOne({where:{email}})
            if (!user) {
                throw new Error ("Wrong email/password combination")
            } else {
                if (bcrypt.compareSync(password,user.password)) {
                    res.status(200).json({"access_token":jwt.sign({
                        name:user.name,
                        email:user.email,
                        role:user.role
                    },process.env.JWT_SECRET)})
                } else {
                    throw new Error ("Wrong email/password combination")
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserControllers