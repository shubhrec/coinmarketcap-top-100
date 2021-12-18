const top_100_collection = require("./config-db/dbConn")





const monitorChangesInMongoCollection = (pipeline=[]) =>{

    const changeStream = top_100_collection.watch(pipeline);

    changeStream.on('change',(next)=>{
        console.log(next)
    })
}

monitorChangesInMongoCollection()