require("dotenv").config();
const fs = require("fs");

const S3 = require("aws-sdk/clients/s3");

const bucketName = (process.env.AWS_BUCKET_NAME = "travelly");
const region = (process.env.AWS_BUCKET_REGION = "eu-west-2");
const accessKeyId = (process.env.AWS_ACCESS_KEY = "AKIA3BHCHAE5Z2X44L6W");
const secretAccessKey = (process.env.AWS_SECRET_KEY =
  "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");

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to S3

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

// downloads a file from S3

function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
