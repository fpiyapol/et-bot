'use strict'

const { listInstances } = require('./tools/ec2-service.js')
const commands = { ls: listInstances }

module.exports.handler = async (event) => {
  try {
    const text = 'ls'
    const [command, ...args] = text.split(' ')
    await commands[command](args)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
}
