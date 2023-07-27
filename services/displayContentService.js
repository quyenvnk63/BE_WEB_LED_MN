const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const {DisplayContent,LedPanelContent, LedPanelContentHistory} = require('../models/relations');
// const bucket  = 'up-load-url';
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
  s3ForcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'false',
  signatureVersion: 'v4'
});


async function getUrlContent(key){
  const params = {
    Bucket: 'up-load-url',
    Key: key,
    Expires: 600,
  };
  const signedUrl = await s3.getSignedUrlPromise('getObject', params);
  return { url: signedUrl };
}

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



//assgin content to display
async function assignContentToDisplay(ledPanelId, displayContentId) {
  try {
    const content = await LedPanelContent.create({
      led_panel_id: ledPanelId,
      display_content_id: displayContentId,
    });

    console.log(ledPanelId, displayContentId);
    return content;
  } catch (error) {
    throw new Error('Failed to assign content to display');
  }
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
  try { 
  const displayContent = await DisplayContent.findByPk(id);
  if (!displayContent) {
    throw new Error('DisplayContent not found');
  }

  // Xóa file trên AWS S3
  const filePath = displayContent.path; // Giả sử trường path chứa đường dẫn của file trên S3
  if (filePath) {
    const bucketName = 'up-load-url'; // Thay 'tên_bucket_của_bạn' bằng tên bucket AWS S3 của bạn
    const key = filePath;

    const params = {
      Bucket: bucketName,
      Key: key,
    };

  
      await s3.deleteObject(params).promise();
      console.log(`File ${filePath} đã được xóa khỏi S3.`);
      return displayContent.destroy();
    
    }}catch (err) {
      throw new Error('can not delete display content');
    }
  }

  


// set content on the display  
async function setDisplayedContentForLedPanel(ledPanelId, displayContentId) {
  try {
    // Bước 1: Tìm và cập nhật is_displayed = false cho tất cả các bản ghi có cùng led_panel_id
    await LedPanelContent.update(
      { is_displayed: false },
      { where: { led_panel_id: ledPanelId } }
    );

    // Bước 2: Cập nhật is_displayed = true cho bản ghi có display_content_id tương ứng
    const [affectedCount] = await LedPanelContent.update(
      { is_displayed: true },
      { where: { led_panel_id: ledPanelId, display_content_id: displayContentId } }
    );

    if (affectedCount === 0) {
      throw new Error('Failed to set displayed content for LedPanel');
    }
  } catch (error) {
    throw new Error('Failed to set displayed content for LedPanel');
  }
}

async function getContentbyLedPanel(ledPanelId) {
  try {
    console.log(ledPanelId);
    const ledPanelContents = await LedPanelContent.findAll({
      where: { led_panel_id: ledPanelId },
      include: [
        {
          model: DisplayContent,
          attributes: ['id', 'type', 'name', 'path'], // Chỉ lấy các trường cần thiết từ bảng DisplayContent
        },
      ],
      attributes: ['is_displayed'], // Chỉ lấy trường is_displayed từ bảng LedPanelContent
    });
    // console.log(ledPanelContents)
    return ledPanelContents;
  } catch (error) {
    throw new Error('Failed to fetch led panel contents');
  }
}


//schedule display content




module.exports = {
  getPresignedUrl,
  getAllDisplayContents,
  getDisplayContentById,
  createDisplayContent,
  updateDisplayContent,
  deleteDisplayContent,
  assignContentToDisplay,
  setDisplayedContentForLedPanel,
  getContentbyLedPanel, 
  getUrlContent,

};
