const dbInitialize = require("../config/dbConn")
var top_100_collection 
const {mongoSchemaToSelect} = require('../config/mongoSchemaToSelect')


//The function returns a promise
const refreshDataFromDatabase = async ()  =>{
    // We check if the conn is initialized. If it's the first time, the conn is initialized
    if(!top_100_collection) {
        top_100_collection = await dbInitialize()
    
    }
    return top_100_collection.find({}).select(mongoSchemaToSelect).lean().exec()
    // return new Promise((resolve,reject) =>{
    //     top_100_collection.find({}).select(mongoSchemaToSelect).lean().exec()
    //     .then(data=>{
    //         // console.log('got ddata')
    //         if(data.length == 0){
    //             console.log("In case the mongo collection isn't created. We exit and docker restarts the container")
    //             process.exit(1)
    //         } 
    //         resolve(data)
    //     }).catch(error =>{
    //         reject(error)
    //     })
    // })
    
    
    
}

module.exports.refreshDataFromDatabase = refreshDataFromDatabase