const dbInitialize = require("./config/dbConn")
var top_100_collection;
const axios = require("./config/configAxios")
const CRYPTO_LIST_SIZE = "100"


const fetchCryptoPrices = async ()=>{

    let requestParams = {
        start : "1",
        limit : CRYPTO_LIST_SIZE,
        convert: "USD"
    }
    return new Promise((resolve,reject)=>{
        axios.get('/v1/cryptocurrency/listings/latest',{params : requestParams}).then(response =>{
            resolve(response.data.data)
        }).catch(err=>{
            reject(err.message)
        })
    }) 
}

const updateMongo = async (data) => { 
    if(!top_100_collection) {
        top_100_collection = await dbInitialize()
        console.log('entered')
    
    }
    await top_100_collection.deleteMany({})
    top_100_collection.insertMany(data,(err)=>{
        if(err){
            console.error(err.message)
        }
        else{
            console.log('successfully inserted')
        }
    })
}





const main = async () =>{

    try{
        const result = await fetchCryptoPrices()
        await updateMongo(result)
    }
    catch(error){
        console.error(error.message)
    }


}


main()
setInterval(main,process.env.DATA_REFRESH_INTERVAL_MS)
