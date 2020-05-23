'use strict'

const { listInstances, stopInstances } = require('./tools/ec2-service.js')
const commands = { ls: listInstances, stop: stopInstances }

module.exports.handler = async (event) => {
  try {
    const text = 'stop i-0e5833cd94bc551f1 i-0a502cd12ad9c4715'
    const [command, ...args] = text.split(' ')
    await commands[command](args)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
}
