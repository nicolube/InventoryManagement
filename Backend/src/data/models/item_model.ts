import Waterline from 'waterline'

var itemCollection = Waterline.Collection.extend({
    identity: 'item',
    datastore: 'default',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        name: { type: 'string', required: true},
        storage: { type: 'string', required: true},
        sub_storage: { type: 'number'},
        std_restock: { type: 'number', required: true},
        createdAt: { type: 'number', autoCreatedAt: true },
        updatedAt: { type: 'number', autoUpdatedAt: true },
        order_nos: { collection: 'order_no', via: 'item_id' }
    }
});

export default itemCollection