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
exports.BUILD_ARTIFACT_PATTERNS = void 0;
exports.getConfigPath = getConfigPath;
exports.loadConfig = loadConfig;
exports.saveConfig = saveConfig;
exports.addLane = addLane;
exports.removeLane = removeLane;
exports.getLane = getLane;
exports.getAllLanes = getAllLanes;
exports.recordLaneSwitch = recordLaneSwitch;
exports.getPreviousLane = getPreviousLane;
var path_1 = require("path");
// Build artifact patterns that can be optionally skipped
var BUILD_ARTIFACT_PATTERNS = [
    "node_modules",
    ".venv",
    "venv",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    "target", // Rust
    "build", // Various
    "dist", // Various
    ".next", // Next.js
    ".nuxt", // Nuxt
    ".turbo", // Turbo
    "vendor", // Go/PHP
    ".gradle", // Gradle
    ".m2", // Maven
    "Pods", // CocoaPods
];
exports.BUILD_ARTIFACT_PATTERNS = BUILD_ARTIFACT_PATTERNS;
var DEFAULT_CONFIG = {
    version: 1,
    lanes: [],
    settings: {
        copyMode: "full", // Full copy by default
        skipBuildArtifacts: false, // Copy everything by default (use symlinkDeps instead)
        skipPatterns: [], // User-defined patterns to skip
        autoInstall: true,
        symlinkDeps: true, // Symlink dependencies by default (saves 500MB-2GB+ per lane)
    },
};
/**
 * Get the path to the lanes config file
 */
function getConfigPath(gitRoot) {
    return path_1.default.join(gitRoot, ".git", "lanes.json");
}
/**
 * Load the lanes config, creating default if it doesn't exist
 */
function loadConfig(gitRoot) {
    return __awaiter(this, void 0, void 0, function () {
        var configPath, file, config, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    configPath = getConfigPath(gitRoot);
                    file = Bun.file(configPath);
                    if (file.size === 0) {
                        return [2 /*return*/, __assign({}, DEFAULT_CONFIG)];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, file.json()];
                case 2:
                    config = _b.sent();
                    return [2 /*return*/, __assign(__assign(__assign({}, DEFAULT_CONFIG), config), { settings: __assign(__assign({}, DEFAULT_CONFIG.settings), config.settings) })];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, __assign({}, DEFAULT_CONFIG)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Save the lanes config
 */
function saveConfig(gitRoot, config) {
    return __awaiter(this, void 0, void 0, function () {
        var configPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configPath = getConfigPath(gitRoot);
                    return [4 /*yield*/, Bun.write(configPath, JSON.stringify(config, null, 2))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Add a lane to the config
 */
function addLane(gitRoot, lane) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadConfig(gitRoot)];
                case 1:
                    config = _a.sent();
                    // Remove any existing lane with the same name
                    config.lanes = config.lanes.filter(function (l) { return l.name !== lane.name; });
                    config.lanes.push(__assign(__assign({}, lane), { createdAt: new Date().toISOString() }));
                    return [4 /*yield*/, saveConfig(gitRoot, config)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, config];
            }
        });
    });
}
/**
 * Remove a lane from the config
 */
function removeLane(gitRoot, laneName) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadConfig(gitRoot)];
                case 1:
                    config = _a.sent();
                    config.lanes = config.lanes.filter(function (l) { return l.name !== laneName; });
                    return [4 /*yield*/, saveConfig(gitRoot, config)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, config];
            }
        });
    });
}
/**
 * Get a lane by name
 */
function getLane(gitRoot, laneName) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadConfig(gitRoot)];
                case 1:
                    config = _a.sent();
                    return [2 /*return*/, config.lanes.find(function (l) { return l.name === laneName; }) || null];
            }
        });
    });
}
/**
 * Get all lanes
 */
function getAllLanes(gitRoot) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadConfig(gitRoot)];
                case 1:
                    config = _a.sent();
                    return [2 /*return*/, config.lanes];
            }
        });
    });
}
/**
 * Get the path to the lane history file
 */
function getHistoryPath(gitRoot) {
    return path_1.default.join(gitRoot, ".git", "lanes-history");
}
/**
 * Record a lane switch in history (for lane - support)
 */
function recordLaneSwitch(gitRoot, fromPath) {
    return __awaiter(this, void 0, void 0, function () {
        var historyPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    historyPath = getHistoryPath(gitRoot);
                    return [4 /*yield*/, Bun.write(historyPath, fromPath)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Get the previous lane path (for lane - support)
 */
function getPreviousLane(gitRoot) {
    return __awaiter(this, void 0, void 0, function () {
        var historyPath, file, previousPath, previousExists, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    historyPath = getHistoryPath(gitRoot);
                    file = Bun.file(historyPath);
                    if (file.size === 0) {
                        return [2 /*return*/, null];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, file.text()];
                case 2:
                    previousPath = (_b.sent()).trim();
                    previousExists = Bun.file(previousPath).size > 0;
                    return [2 /*return*/, previousExists ? previousPath : null];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
