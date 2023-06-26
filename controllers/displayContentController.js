const s3Service = require('../services/displayContentService');

async function getPresignedUrl(req, res) {
  try {
    const { contentType } = req.query;
    const { key, url } = await s3Service.getPresignedUrl(contentType);
    res.status(200).json({ key, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getPresignedUrl
};
