
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DisplayContent = sequelize.define('DisplayContent', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'display_contents',
    timestamps: false,
  });
  // Hook sau khi xóa DisplayContent
DisplayContent.afterDestroy(async (instance) => {
  const displayContentId = instance.id;

  // Xóa các bản ghi có display_content_id tương ứng trong bảng LedPanelContent
  await LedPanelContent.destroy({
    where: { display_content_id: displayContentId },
  });
});


module.exports = DisplayContent;
