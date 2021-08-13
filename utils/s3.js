require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NANE
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

console.log(process.env.AWS_BUCKET_NANE)

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

// uploads a file to s3
function uploadFileToS3(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NANE,
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
    Bucket: process.env.AWS_BUCKET_NANE
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream