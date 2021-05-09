import { Controller } from "../controller_handler";
import { models } from "../database_manager";

export const sellerController: Controller = {
    path: "/seller",
    secured: false,
    onGet: async (req, res) => {
        const Seller = models.seller;
        if (req.query.id) {
            var ids: any = req.query.id
            if (!Array.isArray(ids))
                ids = [ids]
            ids = (ids as string[]).map(e => +e).filter(e => !isNaN(e))
            res.send(await Seller.find({ id: ids }))
            return
        }
        res.send(await Seller.find())
    }
}