const axios = require('axios')

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`

const sendMessage = async (chat_id, text) => {
  return axios.post(TELEGRAM_URL, { chat_id, text })
}

module.exports = { sendMessage }
