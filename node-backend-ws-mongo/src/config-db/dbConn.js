const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/test`)


const top_100_Schema = new Schema({}, {strict : false})
const top_100_collection = mongoose.model('top_100', top_100_Schema)

module.exports = top_100_collection;