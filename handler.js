'use strict'

const {
  listInstances: ls,
  startInstances: start,
  stopInstances: stop,
  terminateInstances: term,
} = require('./tools/ec2-service.js')

const commands = { ls, start, stop, term }

module.exports.handler = async (event) => {
  try {
    const text = event
    const [command, ...args] = text.split(' ')
    await commands[command](args)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
}
