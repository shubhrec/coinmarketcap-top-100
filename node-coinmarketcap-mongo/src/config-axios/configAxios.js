const axios = require("axios")

axios.defaults.headers.get['X-CMC_PRO_API_KEY'] = process.env.CMC_API_KEY
axios.defaults.baseURL = "https://pro-api.coinmarketcap.com"

module.exports = axios;