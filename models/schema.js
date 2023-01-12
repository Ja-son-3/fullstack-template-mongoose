const mongoose = require('mongoose')
//Test Schema of data to pass to the DB
const testSchema = new mongoose.Schema({
    item: {
        type: String
    },
    item2: {
        type: String
    }
})
//Exports Schema
module.exports = mongoose.model('TestModel', TestSchema, 'test_collection')