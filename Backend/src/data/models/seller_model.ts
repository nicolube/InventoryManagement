import Waterline from 'waterline'

var sellerCollection = Waterline.Collection.extend({
    identity: 'seller',
    datastore: 'default',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        name: { type: 'string', required: true},
        url: { type: 'string', required: true},
        oder_url: { type: 'string'},
        createdAt: { type: 'number', autoCreatedAt: true },
        updatedAt: { type: 'number', autoUpdatedAt: true },
        order_nos: { collection: 'order_no', via: 'seller_id' }
    }
});

export default sellerCollection