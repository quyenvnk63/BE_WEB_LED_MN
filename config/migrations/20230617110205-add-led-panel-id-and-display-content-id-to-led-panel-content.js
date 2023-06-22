'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('led_panel_content', 'led_panel_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'led_panels',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('led_panel_content', 'display_content_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'display_contents',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('led_panel_content', 'led_panel_id');
    await queryInterface.removeColumn('led_panel_content', 'display_content_id');
  }
};
