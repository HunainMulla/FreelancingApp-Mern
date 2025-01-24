const { MongoClient } = require('mongodb');
const url = 'mongodb://0.0.0.0:27017/';
const client = new MongoClient(url);

const searchData = async (key) => {
    try {
        const response = await client.connect();
        const db = await response.db('test');
        const coll = await db.collection('products');
        let data = await coll.find({ 
            "$or":[{ 
                "name":{$regex:key}
            }]
        })

        return data;

    } 
    
    catch (error) {
        console.error('Error connecting to database:', error);
        throw error;  // Propagate error
    } 
};

module.exports = {search};