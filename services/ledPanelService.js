const {LedPanel,LedPanelContent,DisplayContent} = require('../models/relations');

async function getAllLedPanels() {
  try {
    const ledPanels = await LedPanel.findAll();
    return ledPanels;
  } catch (error) {
    throw new Error('Failed to fetch LED panels');
  }
}

async function createLedPanel(data) {
  try {
    console.log(data);
    const ledPanel = await LedPanel.create(data);
    return ledPanel;
  } catch (error) {
    throw new Error('Failed to create LED panel');
  }
}

async function updateLedPanel(id, data) {
  try {
    const ledPanel = await LedPanel.findByPk(id);
    if (!ledPanel) {
      throw new Error('LED panel not found');
    }
    await ledPanel.update(data);
    return ledPanel;
  } catch (error) {
    throw new Error('Failed to update LED panel');
  }
}

async function deleteLedPanel(id) {
  try {
    const ledPanel = await LedPanel.findByPk(id);
    if (!ledPanel) {
      throw new Error('LED panel not found');
    }
    await ledPanel.destroy();
    return 'LED panel deleted successfully';
  } catch (error) {
    throw new Error('Failed to delete LED panel');
  }
}

// Get LedPanels by Department ID
async function getLedPanelsByDepartmentId(departmentId){
  try {
    const ledPanels = await LedPanel.findAll({
      where: { department_id: departmentId },
    });
    return ledPanels;
  } catch (error) {
    throw new Error('Failed to get LedPanels by Department ID');
  }
};

async function getLedPanelsByDepartment(departmentId) {
  try {
    const ledPanels = await LedPanel.findAll({
      where: { department_id: departmentId },
      include: [
        {
          model: LedPanelContent,
          as: 'ledPanelContents',
          where: { is_displayed: true },
          include: [
            {
              model: DisplayContent,
            },
          ],
        },
      ],
    });
    return ledPanels;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllLedPanels,
  createLedPanel,
  updateLedPanel,
  deleteLedPanel,
  getLedPanelsByDepartmentId,
  getLedPanelsByDepartment,
};
