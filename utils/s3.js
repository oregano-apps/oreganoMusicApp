require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = "oregano-music-app"
const region = "us-east-2"
const accessKeyId = "AKIA4ZFKOIQQ7MQFXFHR"
const secretAccessKey = "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"

console.log(process.env.AWS_BUCKET_NANE)
console.log(process.env.AWS_BUCKET_REGION)
console.log(process.env.AWS_ACCESS_KEY)
console.log(process.env.AWS_SECRET_KEY)

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
})

// uploads a file to s3
async function uploadFileToS3(file) {
  const fileStream =  await fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFileToS3 = uploadFileToS3


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    //Bucket: process.env.AWS_BUCKET_NANE
    Bucket: "oregano-music-app"
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream