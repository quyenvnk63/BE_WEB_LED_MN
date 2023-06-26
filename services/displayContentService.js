const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
  s3ForcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'false',
  signatureVersion: 'v4'
});

async function getPresignedUrl(contentType) {
  const ex = contentType.split("/")[1];
  const key = `${uuidv4()}.${ex}`;
  const params = {
    Bucket: 'up-load-url',
    Key: key,
    ContentType: contentType,
    Expires: 600,
  };
  const signedUrl = await s3.getSignedUrlPromise('putObject', params);
  return { key, url: signedUrl };
}

module.exports = {
  getPresignedUrl,
};
