const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const {DisplayContent} = require('../models/relations');
// const bucket  = 'up-load-url';
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

async function getAllDisplayContents() {
  try { const displayContent = DisplayContent.findAll();
  return displayContent;
  } catch (error) {
    throw new Error(' failed to get all display contents');
  }
  
}

async function getDisplayContentById(id) {
  try { const displayContent = DisplayContent.findByPk(id);
    return displayContent;
    } catch (error) {
      throw new Error(' failed to get display contents');
    }
}

async function createDisplayContent(data) {
 
  try { 
    const displayContent = DisplayContent.create(data);
    return displayContent;
    } catch (error) {
      throw new Error(' failed to create display contents');
    }
}

async function updateDisplayContent(id, data) {
  const displayContent = await DisplayContent.findByPk(id);
  if (!displayContent) {
    throw new Error('DisplayContent not found');
  }

  return displayContent.update(data);
}

async function deleteDisplayContent(id) {
  const displayContent = await DisplayContent.findByPk(id);
  if (!displayContent) {
    throw new Error('DisplayContent not found');
  }

  return displayContent.destroy();
}



module.exports = {
  getPresignedUrl,
  getAllDisplayContents,
  getDisplayContentById,
  createDisplayContent,
  updateDisplayContent,
  deleteDisplayContent,
};
