import { Controller } from "../controller_handler";
import { models } from "../database_manager";

const assingSellers = async (entity: any) => {
    var sellerIds: Number[] = []
    for (const item of entity) {
        for (const order of item.order_nos) {
            if (!sellerIds.includes(order.seller_id)) {
                sellerIds.push(order.seller_id)
            }
        }
    }
    console.log(sellerIds)
    const Seller = models.seller
    var sellers: any[] = await Seller.find({id: sellerIds})

    for (const item of entity) {
        for (const order of item.order_nos) {
            order.seller = sellers.filter((s:any) => s.id === order.seller_id)[0]
        }
    }
    return entity
}

export const itemController: Controller = {
    path: "/items",
    secured: false,
    onGet: async (req, res) => {
        const Items = models.item
        
        if (req.query.start) {
            const start = +req.query.start
            if (isNaN(start)) {
                res.status(400).send()
                return
            }
            res.send(await assingSellers(await Items.find({
                limit: 100,
                id:{">": start}
            }).populate("order_nos")))
        }
        res.send(await assingSellers(await Items.find({limit: 100}).populate("order_nos")))
    },
}