"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentsByUserId = exports.removeRoleFromUser = exports.assignRoleToUser = exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
var express_validator_1 = require("express-validator");
var userService_1 = __importDefault(require("../services/userService"));
var departmentService_1 = __importDefault(require("../services/departmentService"));
var roleService_1 = __importDefault(require("../services/roleService"));
var passwordUtils_1 = require("../utils/passwordUtils");
// CREATE
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, email, check, passwordHash, _a, department_id, role_id, userData, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    email = req.body.email;
                    return [4 /*yield*/, userService_1.default.getUserByEmail(email)];
                case 2:
                    check = _b.sent();
                    if (check) {
                        return [2 /*return*/, res.status(401).json({ message: 'User already exists' })];
                    }
                    return [4 /*yield*/, (0, passwordUtils_1.hashPassword)(req.body.password)];
                case 3:
                    passwordHash = _b.sent();
                    _a = req.body, department_id = _a.department_id, role_id = _a.role_id;
                    userData = __assign(__assign({}, req.body), { password: passwordHash });
                    return [4 /*yield*/, userService_1.default.create(userData)];
                case 4:
                    user = _b.sent();
                    return [4 /*yield*/, departmentService_1.default.assignDepartmentToUser(user.id, department_id)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, roleService_1.default.assignRoleToUser(user.id, role_id)];
                case 6:
                    _b.sent();
                    res.status(201).json({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    });
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    res.status(500).json({ error: error_1.message });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
function assignRoleToUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, roleId, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.id;
                    roleId = req.body.roleId;
                    return [4 /*yield*/, roleService_1.default.assignRoleToUser(userId, roleId)];
                case 1:
                    _a.sent();
                    res.status(200).json({ message: 'Role assigned successfully' });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.assignRoleToUser = assignRoleToUser;
function removeRoleFromUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, roleId, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.id;
                    roleId = req.body.roleId;
                    return [4 /*yield*/, roleService_1.default.removeRoleFromUser(userId, roleId)];
                case 1:
                    _a.sent();
                    res.status(200).json({ message: 'Role deleted successfully' });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ error: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeRoleFromUser = removeRoleFromUser;
// get department by user_id
function getDepartmentsByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, departments, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.userId;
                    return [4 /*yield*/, departmentService_1.default.getDepartmentsByUserId(userId)];
                case 1:
                    departments = _a.sent();
                    res.json({ departments: departments });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    res.status(500).json({ message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getDepartmentsByUserId = getDepartmentsByUserId;
// READ
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.id;
                    return [4 /*yield*/, userService_1.default.getById(userId)];
                case 1:
                    user = _a.sent();
                    res.json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(500).json({ error: error_5.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserById = getUserById;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userService_1.default.getAll()];
                case 1:
                    users = _a.sent();
                    res.json(users);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.status(500).json({ error: error_6.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
// UPDATE
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userId, userData, user, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userId = req.params.id;
                    userData = req.body;
                    return [4 /*yield*/, userService_1.default.update(userId, userData)];
                case 2:
                    user = _a.sent();
                    res.json(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    res.status(500).json({ error: error_7.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
// DELETE
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, userId, message, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userId = req.params.id;
                    return [4 /*yield*/, userService_1.default.delete(userId)];
                case 2:
                    message = _a.sent();
                    res.json({ message: message });
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    res.status(500).json({ error: error_8.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
