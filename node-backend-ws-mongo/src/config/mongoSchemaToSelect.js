
const mongoSelectSchema = {
    _id : 0,
    cmc_rank : 1,
    name : 1,
    symbol : 1,
    quote : 1

}

module.exports.columnsInOrder = ["#", "Name", "Price", "Volume (24h)" ,"24h %","7d %","Market Cap"]
module.exports.mongoSelectSchema = mongoSelectSchema