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
exports.registerCheckoutCommand = registerCheckoutCommand;
var chalk_1 = require("chalk");
var react_1 = require("react");
var lanes_js_1 = require("../../lanes.js");
var git_js_1 = require("../../git.js");
var CheckoutSelector_js_1 = require("../../ui/CheckoutSelector.js");
var utils_js_1 = require("../utils.js");
function registerCheckoutCommand(program) {
    var _this = this;
    program
        .command("checkout <branch>")
        .alias("co")
        .description("Switch to lane with branch, or choose where to checkout")
        .action(function (branchName) { return __awaiter(_this, void 0, void 0, function () {
        var mainRoot, currentPath, laneWithBranch, recordLaneSwitch, lanes, doesBranchExist, selectedAction, _a, waitUntilExit, clear, result, recordLaneSwitch, lane, gitCmd, proc, exitCode, stderr, recordLaneSwitch, e_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, lanes_js_1.getMainRepoRoot)()];
                case 1:
                    mainRoot = _c.sent();
                    currentPath = process.cwd();
                    if (!mainRoot) {
                        console.error(chalk_1.default.red("Not in a git repository"));
                        process.exit(1);
                    }
                    return [4 /*yield*/, (0, lanes_js_1.findLaneByBranch)(branchName)];
                case 2:
                    laneWithBranch = _c.sent();
                    if (!laneWithBranch) return [3 /*break*/, 5];
                    // Found a lane with this branch - switch to it
                    console.log(chalk_1.default.green("Switching to lane \"".concat(laneWithBranch.name, "\" (branch: ").concat(branchName, ")")));
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("../../config.js"); })];
                case 3:
                    recordLaneSwitch = (_c.sent()).recordLaneSwitch;
                    return [4 /*yield*/, recordLaneSwitch(mainRoot, currentPath)];
                case 4:
                    _c.sent();
                    console.log("".concat(utils_js_1.CD_PREFIX).concat(laneWithBranch.path));
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, (0, lanes_js_1.listAllLanes)()];
                case 6:
                    lanes = _c.sent();
                    return [4 /*yield*/, (0, git_js_1.branchExists)(mainRoot, branchName)];
                case 7:
                    doesBranchExist = _c.sent();
                    selectedAction = null;
                    _a = (0, utils_js_1.renderUI)(react_1.default.createElement(CheckoutSelector_js_1.CheckoutSelector, {
                        branchName: branchName,
                        branchExists: doesBranchExist,
                        lanes: lanes,
                        onSelect: function (action) {
                            selectedAction = action;
                        },
                    })), waitUntilExit = _a.waitUntilExit, clear = _a.clear;
                    return [4 /*yield*/, waitUntilExit()];
                case 8:
                    _c.sent();
                    clear(); // Clear the UI after selection
                    if (!selectedAction || selectedAction.type === "cancel") {
                        return [2 /*return*/];
                    }
                    if (!(selectedAction.type === "create-new")) return [3 /*break*/, 12];
                    return [4 /*yield*/, (0, lanes_js_1.createLane)(branchName, { branch: branchName })];
                case 9:
                    result = _c.sent();
                    if (!result.success) {
                        console.error(chalk_1.default.red("Error: ".concat(result.error)));
                        process.exit(1);
                    }
                    console.log(chalk_1.default.green("Lane \"".concat(branchName, "\" created!")));
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("../../config.js"); })];
                case 10:
                    recordLaneSwitch = (_c.sent()).recordLaneSwitch;
                    return [4 /*yield*/, recordLaneSwitch(mainRoot, currentPath)];
                case 11:
                    _c.sent();
                    console.log("".concat(utils_js_1.CD_PREFIX).concat((_b = result.lane) === null || _b === void 0 ? void 0 : _b.path));
                    return [3 /*break*/, 20];
                case 12:
                    if (!(selectedAction.type === "checkout-in-lane")) return [3 /*break*/, 20];
                    lane = selectedAction.lane;
                    _c.label = 13;
                case 13:
                    _c.trys.push([13, 19, , 20]);
                    gitCmd = doesBranchExist
                        ? "git checkout \"".concat(branchName, "\"")
                        : "git checkout -b \"".concat(branchName, "\"");
                    proc = Bun.spawn(["sh", "-c", gitCmd], {
                        cwd: lane.path,
                        stdout: "pipe",
                        stderr: "pipe",
                    });
                    return [4 /*yield*/, proc.exited];
                case 14:
                    exitCode = _c.sent();
                    if (!(exitCode !== 0)) return [3 /*break*/, 16];
                    return [4 /*yield*/, new Response(proc.stderr).text()];
                case 15:
                    stderr = _c.sent();
                    throw new Error(stderr || "Git checkout failed");
                case 16:
                    console.log(chalk_1.default.green("Checked out \"".concat(branchName, "\" in lane \"").concat(lane.name, "\"")));
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("../../config.js"); })];
                case 17:
                    recordLaneSwitch = (_c.sent()).recordLaneSwitch;
                    return [4 /*yield*/, recordLaneSwitch(mainRoot, currentPath)];
                case 18:
                    _c.sent();
                    console.log("".concat(utils_js_1.CD_PREFIX).concat(lane.path));
                    return [3 /*break*/, 20];
                case 19:
                    e_1 = _c.sent();
                    console.error(chalk_1.default.red("Error checking out branch: ".concat(e_1.message)));
                    process.exit(1);
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    }); });
}
