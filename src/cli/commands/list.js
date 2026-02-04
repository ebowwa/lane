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
exports.registerListCommand = registerListCommand;
var chalk_1 = require("chalk");
var react_1 = require("react");
var lanes_js_1 = require("../../lanes.js");
var LaneList_js_1 = require("../../ui/LaneList.js");
var utils_js_1 = require("../utils.js");
function registerListCommand(program) {
    var _this = this;
    program
        .command("list")
        .alias("ls")
        .description("List all lanes")
        .option("-i, --interactive", "Show interactive UI")
        .action(function (options) { return __awaiter(_this, void 0, void 0, function () {
        var lanes, waitUntilExit, _i, lanes_1, lane, current, main;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, lanes_js_1.listAllLanes)()];
                case 1:
                    lanes = _a.sent();
                    if (lanes.length === 0) {
                        console.log(chalk_1.default.yellow("No lanes found. Create one with: lane new <name>"));
                        return [2 /*return*/];
                    }
                    if (options.interactive) {
                        waitUntilExit = (0, utils_js_1.renderUI)(react_1.default.createElement(LaneList_js_1.LaneList, {
                            lanes: lanes,
                            onSelect: function (lane) {
                                console.log("".concat(utils_js_1.CD_PREFIX).concat(lane.path));
                            },
                        })).waitUntilExit;
                        waitUntilExit();
                    }
                    else {
                        console.log(chalk_1.default.bold("\nLanes:\n"));
                        for (_i = 0, lanes_1 = lanes; _i < lanes_1.length; _i++) {
                            lane = lanes_1[_i];
                            current = lane.isCurrent ? chalk_1.default.green(" ← current") : "";
                            main = lane.isMain ? chalk_1.default.dim(" (main)") : "";
                            console.log("  ".concat(chalk_1.default.cyan(lane.name)).concat(main).concat(current));
                            console.log(chalk_1.default.dim("    Branch: ".concat(lane.branch)));
                            console.log(chalk_1.default.dim("    Path: ".concat(lane.path)));
                            console.log();
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
}
