'use strict'

const { listInstances, stopInstances } = require('./tools/ec2-service.js')
const commands = { ls: listInstances, stop: stopInstances }

module.exports.handler = async (event) => {
  try {
    const text = ''
    const [command, ...args] = text.split(' ')
    await commands[command](args)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
}
