const top_100_collection = require("../config/dbConn")
const {mongoSchemaToSelect} = require('../config/mongoSchemaToSelect')


//The function returns a promise
const refreshDataFromDatabase =  () =>{
    return top_100_collection.find({}).select(mongoSchemaToSelect).lean().exec()
    
}

module.exports.refreshDataFromDatabase = refreshDataFromDatabase