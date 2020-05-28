'use strict'

const {
  listInstances: ls,
  startInstances: start,
  stopInstances: stop,
  terminateInstances: term,
} = require('./tools/ec2-service.js')
const bot = require('./tools/telegram-bot-service')

const help = () =>
  'ls: list all instances.\n' +
  'start <instanceIds>: start instances.\n' +
  'stop <instanceIds>: stop instances.\n' +
  'term <instanceIds>: terminate instances.\n' +
  'help: get help.'

const commands = { ls, start, stop, term, help }
let replyMsg = ''

module.exports.handler = async (event) => {
  let { body } = event
  const {
    message: {
      chat: { id: chat_id },
      text,
    },
  } = JSON.parse(body)
  try {
    const [command, ...args] = text.split(' ')
    replyMsg = await commands[command](args)
    await bot.sendMessage(chat_id, replyMsg)
  } catch (error) {
    replyMsg = 'Error, something went wrong.'
    await bot.sendMessage(chat_id, replyMsg)
  }
  return { statusCode: 200 }
}
