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
        owner: {
            type: 'number'
        },
        value: {
            type: "string"
        },
        type: {
            type: 'string',
            in: [
                "permission",
                "group"
            ]
        },
        owner_type: {
            type: 'string',
            in: [
                "user",
                "group"
            ]
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