// const top_100_collection = require("./config-db/dbConn")
const { refreshDataFromDatabase } = require("./refresh-data-from-db/fetchDataFromDB")
const express = require('express')
const app = express()
const http = require('http')
var server = http.createServer(app);
const { Server } = require("socket.io")
const { columnsInOrder } = require("./config/mongoSchemaToSelect")


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],

  }, path: '/mysocket'
});
var globalCryptoData = [] // This always has the crypto data from the last refresh. This is only used when a new client connects

//When clients connect. Send them a copy of the Crypto data from the global store
io.on('connection', (socket) => {
  console.log('connected')
  socket.emit('data_refresh', { data: [...globalCryptoData], columns: columnsInOrder })
});


const main = async () => {
  try {
    let cryptoData = await refreshDataFromDatabase()
    console.log('logging cryptoData', cryptoData.length)
    if (cryptoData.length == 0) {
      console.log("In case the mongo collection isn't created. We exit and docker restarts the container")
      process.exit(1)
    }

    //This is not ideal and blocks the main thread for a short period of time.
    //Ideally operations like these should be performed in a worker thread.
    let formattedCryptoData = cryptoData.map((cryptoElement) => {
      return {
        "#": cryptoElement.cmc_rank,
        "Name": cryptoElement.name,
        "Symbol": cryptoElement.symbol,
        "Price": cryptoElement.quote['USD'].price,
        "Volume (24h)": cryptoElement.quote['USD'].volume_24h,
        "24h %": cryptoElement.quote['USD'].percent_change_24h,
        "7d %": cryptoElement.quote['USD'].percent_change_7d,
        "Market Cap": cryptoElement.quote['USD'].market_cap


      }
    })

    globalCryptoData = formattedCryptoData

    io.sockets.emit('data_refresh', {
      data: [...formattedCryptoData],
      columns: columnsInOrder
    })
  }
  catch (error) {
    console.error(error.message)
  }

}


/****************************************************************** */
main()
setInterval(main, process.env.DATA_REFRESH_INTERVAL_MS)





server.listen(5500)