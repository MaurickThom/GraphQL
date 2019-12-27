const {
    MongoClient,
    ObjectId
} = require("mongodb");
const {
    ENV
} = require("./../config/config");
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
} = ENV;

// Esto es solo temporal
const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@passport-jwt-hmj2y.mongodb.net/test?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.dbName = DB_NAME;
        this.client = this.connect();
    }
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(
                MONGO_URL, {
                    useNewUrlParser: true,
                    poolSize: 5,
                    useUnifiedTopology: true
                },
                (err, client) => {
                    if (err) return reject(err);
                    if (!client)
                        return reject("An error ocurred when connecting to mongo");
                    return resolve(client.db(this.dbName));
                }
            );
        });
    }
    create(collection, data) {
        return this.client
            .then(db => {
                return db.collection(collection, data).insertOne(data);
            })
            .then(result => result.insertedId);
    }
    getAll(collection) {
        return this.client.then(db => {
            return db
                .collection(collection)
                .find()
                .toArray();
        });
    }
    getById(collection, id) {
        return this.client.then(db => {
            return db
                .collection(collection)
                .find({
                    _id: ObjectId(id)
                })
                .toArray();
        });
    }
    update(collection, id, data) {
        return this.client.then(db => {
            return db
                .collection(collection)
                .updateOne({
                    _id: ObjectId(id)
                }, {
                    $set: data
                }, {
                    upsert: true
                })
                .then(result => result.upsertedId || id);
        });
    }
    delete(collection, id) {
        return this.client.then(db => {
            return db
                .collection(collection)
                .deleteOne({
                    _id: ObjectId(id)
                })
                .then(() => id);
        });
    }
}


module.exports = {
    MongoLib
}