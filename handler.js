'use strict'
const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })

const axios = require('axios')

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || ''
const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`

async function listInstances() {
  const instances = await ec2.describeInstances().promise()
  let instancesTxt = 'Instances: \n'
  instances['Reservations'].forEach((instance) => {
    const {
      InstanceId: instanceId,
      State: { Name: state },
      Tags,
    } = instance['Instances'][0]
    const { Value: name } = Tags.find((tag) => tag.Key === 'Name')
    instancesTxt += `\ninstanceId: ${instanceId}\nname: ${name}\nstate: ${state}\n`
  })
  console.log(instancesTxt)
}

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
