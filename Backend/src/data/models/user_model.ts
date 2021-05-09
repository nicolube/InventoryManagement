import Waterline from 'waterline'

var userCollection = Waterline.Collection.extend({
    identity: 'user',
    datastore: 'default',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        frist_name: { type: 'string', required: true },
        last_name: { type: 'string', required: true },
        email: {
            type: 'string',
            required: true,
            autoMigrations: {
                unique: true
            }
        },
        password: {
            type: "string",
            required : true
        },
        createdAt: { type: 'number', autoCreatedAt: true },
        updatedAt: { type: 'number', autoUpdatedAt: true },

        sessionKeys: {
            collection: 'session_key',
            via: 'user_id'
        }
    }
});

export default userCollection