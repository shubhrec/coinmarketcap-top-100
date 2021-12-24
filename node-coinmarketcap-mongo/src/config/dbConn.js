
const mongoose = require("mongoose")


const mongoConnect = () =>{

    return new Promise((resolve,reject)=>{
        const Schema = mongoose.Schema
        mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.MONGO_CONN}/test`)
        .then(()=>{
            const top_100_Schema = new Schema({}, {strict : false})
            const top_100_collection = mongoose.model('top_100', top_100_Schema)
            console.log('collection',top_100_collection)
            resolve(top_100_collection)
            
        }).catch((error)=>{
            console.error(error)
        })
    })



}

module.exports = mongoConnect;