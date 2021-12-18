const top_100_collection = require("./config-db/dbConn")
const axios = require("./config-axios/configAxios")
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
    await top_100_collection.deleteMany({})
    top_100_collection.insertMany(data,(err)=>{
        if(err){
            console.log('there was an error')
        }
        else{
            console.log('successfully inserted')
        }
    })
}





const main = async () =>{
    const result = await fetchCryptoPrices()
    await updateMongo(result)

}


setInterval(()=>{
    main()
},30000)
