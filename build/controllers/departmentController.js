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
var departmentService = require('../services/departmentService');
var validationResult = require('express-validator').validationResult;
// Tạo một phòng ban mới
function createDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, departmentData, department, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    }
                    departmentData = __assign({}, req.body);
                    return [4 /*yield*/, departmentService.createDepartment(departmentData)];
                case 1:
                    department = _a.sent();
                    res.status(201).json({ department: department });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(500).json({ message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// add user to department
function assignDepartmentToUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentid, userid, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    departmentid = req.params.id;
                    userid = req.body.userId;
                    return [4 /*yield*/, departmentService.assignDepartmentToUser(userid, departmentid)];
                case 1:
                    _a.sent();
                    res.status(200).json({ message: 'user assigned successfully' });
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
//get department by department_id 
function getDepartmentById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, department, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    departmentId = req.params.departmentId;
                    return [4 /*yield*/, departmentService.getDepartmentById(departmentId)];
                case 1:
                    department = _a.sent();
                    if (!department) {
                        return [2 /*return*/, res.status(404).json({ message: 'Department not found' })];
                    }
                    res.json({ department: department });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    res.status(500).json({ message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAllDepartments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departments, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, departmentService.getAllDepartment()];
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
// Cập nhật thông tin phòng ban
function updateDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, updatedDepartmentData, department, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    departmentId = req.params.departmentId;
                    updatedDepartmentData = __assign({}, req.body);
                    return [4 /*yield*/, departmentService.updateDepartment(departmentId, updatedDepartmentData)];
                case 1:
                    department = _a.sent();
                    if (!department) {
                        return [2 /*return*/, res.status(404).json({ message: 'Department not found' })];
                    }
                    res.json({ department: department });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error(error_5);
                    res.status(500).json({ message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Xóa phòng ban
function deleteDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var departmentId, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    departmentId = req.params.departmentId;
                    return [4 /*yield*/, departmentService.deleteDepartment(departmentId)];
                case 1:
                    result = _a.sent();
                    if (result === 'Department deleted successfully') {
                        return [2 /*return*/, res.json({ message: 'Department deleted successfully' })];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: 'Department not found' })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error(error_6);
                    res.status(500).json({ message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    createDepartment: createDepartment,
    // getDepartmentsByUserId,
    getDepartmentById: getDepartmentById,
    getAllDepartments: getAllDepartments,
    updateDepartment: updateDepartment,
    deleteDepartment: deleteDepartment,
    assignDepartmentToUser: assignDepartmentToUser,
};
