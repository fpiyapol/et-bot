const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-1' })

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })

const listInstances = async function () {
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
  console.log(instancesTxt)
}

module.exports = { listInstances }
