import { Controller } from '../controller_handler'
import { models } from '../database_manager'
import * as argon2 from 'argon2'
import crypto from 'crypto'
import { query } from 'express'

export const tokenHash = crypto.createHash("sha256")

export const authController: Controller = {
    path: "/auth",
    secured: false,
    onPost: async (req, res) => {
        const User = models.user;
        var name = req.body.name
        var password = req.body.password
        if (name && password) {
            await User.findOne({
                or: [
                    { frist_name: name },
                    { email: name }
                ]
            })
                .then(async (user: any) => {
                    if (!user) {
                        res.send({ code: "E_INVALID_USER" })
                        return
                    }
                    if (!await argon2.verify(user.password, password as string)) {
                        res.send({ code: "E_INVALID_PASSWORD" })
                        return
                    }
                    const token = crypto.randomBytes(32).toString("hex")
                    const hashedToken = tokenHash.copy().update(token).digest('hex')
                    await models.session_key.create({
                        user_id: user.id,
                        key: hashedToken
                    })
                    res.send({
                        code: "A_AUTH",
                        token: token
                    })

                })
                .catch((err: Error) => {
                    res.status(400).send(err)
                })
            return
        }
        res.status(400).send()
    }
}