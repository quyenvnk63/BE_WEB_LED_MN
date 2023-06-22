"use strict";
// Import các model
var User = require('./User');
var Role = require('./Role');
var UserRole = require('./UserRole');
var RoleDetail = require('./RoleDetail');
var ResetPassword = require('./ResetPassword');
var LedPanel = require('./LedPanel');
var LedPanelContent = require('./LedPanelContent');
var LedPanelContentHistory = require('./LedPanelContentHistory');
var DisplayContent = require('./DisplayContent');
var Department = require('./Department');
var DepartmentUser = require('./DepartmentUser');
//Thiet lap quan he 
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });
Role.hasMany(RoleDetail, { foreignKey: 'role_id' });
Department.hasMany(DepartmentUser, { foreignKey: 'department_id' });
User.belongsToMany(Department, { through: DepartmentUser, foreignKey: 'user_id' });
Department.belongsTo(Department, { foreignKey: 'parent_department_id', as: 'parent' });
ResetPassword.belongsTo(User, { foreignKey: 'user_id' });
LedPanel.belongsTo(Department, { foreignKey: 'department_id' });
LedPanelContent.belongsTo(LedPanel, { foreignKey: 'led_panel_id' });
LedPanelContent.belongsTo(DisplayContent, { foreignKey: 'display_content_id' });
LedPanelContentHistory.belongsTo(LedPanel, { foreignKey: 'led_panel_id' });
LedPanelContentHistory.belongsTo(DisplayContent, { foreignKey: 'display_content_id' });
// Export các model
module.exports = {
    User: User,
    Role: Role,
    UserRole: UserRole,
    RoleDetail: RoleDetail,
    ResetPassword: ResetPassword,
    LedPanelContentHistory: LedPanelContentHistory,
    LedPanelContent: LedPanelContent,
    LedPanel: LedPanel,
    DisplayContent: DisplayContent,
    DepartmentUser: DepartmentUser,
    Department: Department
};
