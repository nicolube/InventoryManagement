import Waterline from 'waterline'

var orderNoCollection = Waterline.Collection.extend({
    identity: 'order_no',
    datastore: 'default',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        nr: { type: 'string', required: true},
        createdAt: { type: 'number', autoCreatedAt: true },
        updatedAt: { type: 'number', autoUpdatedAt: true },

        seller_id: {
            model: 'seller',
            required: true
        },
        item_id: {
            model: 'item',
            required: true
        }
    }
});

export default orderNoCollection