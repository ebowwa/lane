"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDefaultCommand = registerDefaultCommand;
var chalk_1 = require("chalk");
var react_1 = require("react");
var lanes_js_1 = require("../../lanes.js");
var config_js_1 = require("../../config.js");
var LaneList_js_1 = require("../../ui/LaneList.js");
var utils_js_1 = require("../utils.js");
function registerDefaultCommand(program) {
    var _this = this;
    program
        .argument("[name]", "Lane name to switch to or create (use '-' for previous)")
        .action(function (name) { return __awaiter(_this, void 0, void 0, function () {
        var mainRoot, currentPath, lanes, switchToPath_1, deletedLanes_1, waitUntilExit, previousPath, result;
        var _this = this;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, lanes_js_1.getMainRepoRoot)()];
                case 1:
                    mainRoot = _b.sent();
                    currentPath = process.cwd();
                    if (!!name) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lanes_js_1.listAllLanes)()];
                case 2:
                    lanes = _b.sent();
                    if (lanes.length === 0) {
                        console.log(chalk_1.default.yellow("No lanes found. Create one with: lane <name>"));
                        return [2 /*return*/];
                    }
                    switchToPath_1 = null;
                    deletedLanes_1 = [];
                    waitUntilExit = (0, utils_js_1.renderUI)(react_1.default.createElement(LaneList_js_1.LaneList, {
                        lanes: lanes,
                        onSelect: function (lane, action) { return __awaiter(_this, void 0, void 0, function () {
                            var result_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(action === "switch")) return [3 /*break*/, 3];
                                        if (!mainRoot) return [3 /*break*/, 2];
                                        return [4 /*yield*/, (0, config_js_1.recordLaneSwitch)(mainRoot, currentPath)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        switchToPath_1 = lane.path;
                                        return [3 /*break*/, 5];
                                    case 3:
                                        if (!(action === "delete")) return [3 /*break*/, 5];
                                        return [4 /*yield*/, (0, lanes_js_1.removeLaneCmd)(lane.name, { deleteBranch: true })];
                                    case 4:
                                        result_1 = _a.sent();
                                        if (result_1.success) {
                                            deletedLanes_1.push(lane.name);
                                        }
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); },
                        onBulkDelete: function (lanesToDelete) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, lanesToDelete_1, lane, result_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _i = 0, lanesToDelete_1 = lanesToDelete;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < lanesToDelete_1.length)) return [3 /*break*/, 4];
                                        lane = lanesToDelete_1[_i];
                                        return [4 /*yield*/, (0, lanes_js_1.removeLaneCmd)(lane.name, { deleteBranch: true })];
                                    case 2:
                                        result_2 = _a.sent();
                                        if (result_2.success) {
                                            deletedLanes_1.push(lane.name);
                                        }
                                        _a.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                    })).waitUntilExit;
                    return [4 /*yield*/, waitUntilExit()];
                case 3:
                    _b.sent();
                    // Output AFTER Ink has fully exited
                    if (deletedLanes_1.length > 0) {
                        console.error(chalk_1.default.green("Deleted: ".concat(deletedLanes_1.join(", "))));
                    }
                    if (switchToPath_1) {
                        console.log("".concat(utils_js_1.CD_PREFIX).concat(switchToPath_1));
                    }
                    return [2 /*return*/];
                case 4:
                    if (!(name === "-")) return [3 /*break*/, 7];
                    if (!mainRoot) {
                        console.error(chalk_1.default.red("Not in a git repository"));
                        process.exit(1);
                    }
                    return [4 /*yield*/, (0, config_js_1.getPreviousLane)(mainRoot)];
                case 5:
                    previousPath = _b.sent();
                    if (!previousPath) {
                        console.error(chalk_1.default.red("No previous lane to switch to"));
                        process.exit(1);
                    }
                    // Record current before switching
                    return [4 /*yield*/, (0, config_js_1.recordLaneSwitch)(mainRoot, currentPath)];
                case 6:
                    // Record current before switching
                    _b.sent();
                    console.log("".concat(utils_js_1.CD_PREFIX).concat(previousPath));
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, (0, lanes_js_1.smartLane)(name)];
                case 8:
                    result = _b.sent();
                    if (!result.success) {
                        console.error(chalk_1.default.red("Error: ".concat(result.error)));
                        process.exit(1);
                    }
                    if (result.action === "created") {
                        console.log(chalk_1.default.green("Lane \"".concat(name, "\" created!")));
                        console.log(chalk_1.default.dim("  Branch: ".concat((_a = result.lane) === null || _a === void 0 ? void 0 : _a.branch)));
                    }
                    if (!(result.path && mainRoot)) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, config_js_1.recordLaneSwitch)(mainRoot, currentPath)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    // Output the cd command for shell function
                    if (result.path) {
                        console.log("".concat(utils_js_1.CD_PREFIX).concat(result.path));
                    }
                    return [2 /*return*/];
            }
        });
    }); });
}
