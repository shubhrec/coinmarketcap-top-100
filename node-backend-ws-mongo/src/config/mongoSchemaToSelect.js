

//Defines the columns that are to be fetched from Mongo
const mongoSelectSchema = {
    _id : 0,
    cmc_rank : 1,
    name : 1,
    symbol : 1,
    quote : 1

}


//The columns in order are basically the grid headers in the front end
module.exports.columnsInOrder = ["#", "Name", "Price", "Volume (24h)" ,"24h %","7d %","Market Cap"]
module.exports.mongoSelectSchema = mongoSelectSchema