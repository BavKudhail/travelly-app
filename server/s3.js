const path = require("path");

require("dotenv").config({
  path: "../.env",
});
const fs = require("fs");

const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to S3

function uploadFile(file) {
  console.log(file);
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

// downloads a file from S3
//

function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
