import Waterline from 'waterline'

var session_keyCollection = Waterline.Collection.extend({
    identity: 'session_key',
    datastore: 'default',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        key: { type: 'string', required: true},
        createdAt: { type: 'number', autoCreatedAt: true },
        updatedAt: { type: 'number', autoUpdatedAt: true },

        user_id: {
            model: 'user',
            required: true
        }
    }
});

export default session_keyCollection