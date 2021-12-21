// const top_100_collection = require("./config-db/dbConn")
const {refreshDataFromDatabase} = require("./refresh-data-from-db/fetchDataFromDB")
const express = require('express')
const app = express()
const http = require('http')
var server = http.createServer(app);
const {Server} = require("socket.io")
const {columnsInOrder} = require("./config/mongoSchemaToSelect")


const io = new Server(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      
    }, path: '/mysocket'
  });
var globalCryptoData =[] // This always has the crypto data from the last refresh. This is only used when a new client connects

//When clients connect
io.on('connection', (socket) => {
    console.log('connected')
    // console.log(globalCryptoData)
    socket.emit('data_refresh', {data : [...globalCryptoData], columns : columnsInOrder})
  });


app.get('/',(req,res)=>{
    res.send('hello')
})


const main = async ()=>{
    let cryptoData = (await refreshDataFromDatabase())
    let formattedCryptoData = cryptoData.map((cryptoElement)=>{
      return { "#" : cryptoElement.cmc_rank , 
        "Name" : cryptoElement.name , 
        "Symbol" : cryptoElement.symbol , 
        "Price" : cryptoElement.quote['USD'].price , 
        "Volume (24h)" : cryptoElement.quote['USD'].volume_24h,
        "24h %" : cryptoElement.quote['USD'].percent_change_24h,
        "7d %" : cryptoElement.quote['USD'].percent_change_7d,
        "Market Cap" : cryptoElement.quote['USD'].market_cap
      
      
      }
    })

    globalCryptoData = formattedCryptoData
    // console.log(formattedCryptoData)
    io.sockets.emit('data_refresh', {data : [...formattedCryptoData] , 
      columns : columnsInOrder})
}

main()
setInterval(main ,process.env.DATA_REFRESH_INTERVAL_MS)





server.listen(5500)