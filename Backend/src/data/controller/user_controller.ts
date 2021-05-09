import { Controller } from '../controller_handler'
import { models } from '../database_manager'
import * as argon2 from 'argon2'

const emailRegEx = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")
const nameRegEx = new RegExp("^[A-Z][a-z]+$")

export const userController: Controller = {
    path: "/user",
    secured: true,
    permission: "user.create",
    onPut: async (req, res) => {
        var frist_name = req.body.frist_name
        var last_name = req.body.last_name
        var email = req.body.email
        var password = req.body.password
        if (frist_name && last_name && email && password)
            if (nameRegEx.test(frist_name) && nameRegEx.test(last_name) && emailRegEx.test(email)) {
                const User = models.user;
                var user = await User.create({
                    frist_name: frist_name,
                    last_name: last_name,
                    email: email as string,
                    password: await argon2.hash(password as string)
                })
                    .fetch()
                    .then((user: any) => res.send(user))
                    .catch((err: Error) => {
                        res.status(400).send(err)
                    })
                return
            }
        res.status(400).send()
    },
    onGet: async (req, res) => {
        const User = models.user;
        if (req.query.id) {
            var ids: any = req.query.id
            if (!Array.isArray(ids))
                ids = [ids]
            ids = (ids as string[]).map(e => +e).filter(e => !isNaN(e))
            if ((ids as string[]).length <= 1)
                res.send(await User.findOne({ id: ids }))
            else
                res.send(await User.find({ id: ids }))
            return
        }
        res.send(await User.find())
    },
    onDelete: async (req, res) => {
        const User = models.user;
        if (req.query.id) {
            var ids: any = req.query.id
            if (!Array.isArray(ids))
                ids = [ids]
            ids = (ids as string[]).map(e => +e).filter(e => !isNaN(e))
            res.send(await User.destroy({ id: ids }).fetch())
            return
        }
        res.status(400).send()
    }
}