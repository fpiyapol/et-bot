const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })

const startInstances = async (instanceIds) => {
  await ec2.startInstances({ InstanceIds: instanceIds }).promise()
  return `starting instances: ${instanceIds.join(' ')}`
}

const stopInstances = async (instanceIds) => {
  await ec2.stopInstances({ InstanceIds: instanceIds }).promise()
  return `stopping instances: ${instanceIds.join(' ')}`
}

const terminateInstances = async (instanceIds) => {
  await ec2.terminateInstances({ InstanceIds: instanceIds }).promise()
  return `terminating instances: ${instanceIds.join(' ')}`
}

const listInstances = async () => {
  const instances = await ec2.describeInstances().promise()
  let instancesTxt = 'Instances: \n'
  instances['Reservations'].forEach((instance) => {
    const {
      InstanceId: instanceId,
      State: { Name: state },
      Tags: tags,
    } = instance['Instances'][0]
    const { Value: name } = tags.find((tag) => tag.Key === 'Name')
    instancesTxt += `\ninstanceId: ${instanceId}\nname: ${name}\nstate: ${state}\n`
  })
  return instancesTxt
}

module.exports = {
  listInstances,
  stopInstances,
  startInstances,
  terminateInstances,
}
