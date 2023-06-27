const displayContentService = require('../services/displayContentService');
const {uuidToInt} = require('../utils/uuidInt');

async function getPresignedUrl(req, res) {
  try {
    const { contentType } = req.query;
    const { key, url } = await displayContentService.getPresignedUrl(contentType);
    res.status(200).json({ key, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDisplayContents(req, res) {
  try {
    const displayContents = await displayContentService.getAllDisplayContents();
    res.json(displayContents);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getDisplayContentById(req, res) {
  const { id } = req.params;
  try {
    const displayContent = await displayContentService.getDisplayContentById(id);
    if (!displayContent) {
      return res.status(404).json({ error: 'DisplayContent not found' });
    }
    res.json(displayContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createDisplayContent(req, res) {
  const id = await uuidToInt();
  const Led_panel_id = req.params.ledpanelId;
  const {  type, name, path } = req.body;
  const data = { id, type, name, path };

  try {
    
    const displayContent = await displayContentService.createDisplayContent(data);
    await displayContentService.assignContentToDisplay(Led_panel_id, displayContent.id); 
    res.json(displayContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDisplayContent(req, res) {
  const { id } = req.params;
  const { type, name, path } = req.body;
  const data = { type, name, path };
  try {
    const displayContent = await displayContentService.updateDisplayContent(id, data);
    res.json(displayContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteDisplayContent(req, res) {
  const { id } = req.params;
  try {
    await displayContentService.deleteDisplayContent(id);
    res.json({ message: 'DisplayContent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function setContentForDisplay(req, res) {
  
}


module.exports = {
  getPresignedUrl,
  getAllDisplayContents,
  getDisplayContentById,
  createDisplayContent,
  updateDisplayContent,
  deleteDisplayContent,
};
