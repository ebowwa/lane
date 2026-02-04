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
var bun_test_1 = require("bun:test");
var fs_1 = require("fs");
var path_1 = require("path");
var config_1 = require("../src/config");
(0, bun_test_1.describe)("config", function () {
    var tempDir;
    var gitRoot;
    var configDir;
    (0, bun_test_1.beforeEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Create a temporary directory for testing
                    tempDir = path_1.default.join(process.cwd(), ".temp-test");
                    gitRoot = path_1.default.join(tempDir, "test-repo");
                    configDir = path_1.default.join(gitRoot, ".git");
                    // Create the directory structure
                    return [4 /*yield*/, fs_1.promises.mkdir(configDir, { recursive: true })];
                case 1:
                    // Create the directory structure
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, bun_test_1.afterEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clean up the temporary directory
                return [4 /*yield*/, fs_1.promises.rm(tempDir, { recursive: true, force: true }).catch(function () { })];
                case 1:
                    // Clean up the temporary directory
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, bun_test_1.describe)("getConfigPath", function () {
        (0, bun_test_1.test)("returns correct path to lanes.json", function () {
            var result = (0, config_1.getConfigPath)(gitRoot);
            (0, bun_test_1.expect)(result).toBe(path_1.default.join(gitRoot, ".git", "lanes.json"));
        });
    });
    (0, bun_test_1.describe)("loadConfig", function () {
        (0, bun_test_1.test)("loads existing config from file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var existingConfig, configPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existingConfig = {
                            version: 1,
                            lanes: [
                                {
                                    name: "feature-1",
                                    path: "/path/to/feature-1",
                                    branch: "feature/feature-1",
                                    createdAt: "2024-01-01T00:00:00.000Z",
                                },
                            ],
                            settings: {
                                copyMode: "worktree",
                                skipBuildArtifacts: true,
                                skipPatterns: ["*.log"],
                                autoInstall: false,
                                symlinkDeps: true,
                            },
                        };
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.writeFile(configPath, JSON.stringify(existingConfig, null, 2))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.version).toBe(1);
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(result.lanes[0].name).toBe("feature-1");
                        (0, bun_test_1.expect)(result.settings.copyMode).toBe("worktree");
                        (0, bun_test_1.expect)(result.settings.skipBuildArtifacts).toBe(true);
                        (0, bun_test_1.expect)(result.settings.skipPatterns).toEqual(["*.log"]);
                        (0, bun_test_1.expect)(result.settings.autoInstall).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns default config when file does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.version).toBe(1);
                        (0, bun_test_1.expect)(result.lanes).toEqual([]);
                        (0, bun_test_1.expect)(result.settings.copyMode).toBe("full");
                        (0, bun_test_1.expect)(result.settings.skipBuildArtifacts).toBe(false);
                        (0, bun_test_1.expect)(result.settings.skipPatterns).toEqual([]);
                        (0, bun_test_1.expect)(result.settings.autoInstall).toBe(true);
                        (0, bun_test_1.expect)(result.settings.symlinkDeps).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns default config when file is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
            var configPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.writeFile(configPath, "")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.version).toBe(1);
                        (0, bun_test_1.expect)(result.lanes).toEqual([]);
                        (0, bun_test_1.expect)(result.settings.copyMode).toBe("full");
                        (0, bun_test_1.expect)(result.settings.symlinkDeps).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("merges with defaults for partial config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var partialConfig, configPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        partialConfig = {
                            lanes: [
                                {
                                    name: "test-lane",
                                    path: "/path",
                                    branch: "test-branch",
                                    createdAt: "2024-01-01T00:00:00.000Z",
                                },
                            ],
                            settings: {
                                copyMode: "worktree",
                                skipBuildArtifacts: true,
                                skipPatterns: [],
                                autoInstall: true,
                            },
                        };
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.writeFile(configPath, JSON.stringify(partialConfig, null, 2))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.version).toBe(1); // from defaults
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(result.settings.copyMode).toBe("worktree");
                        (0, bun_test_1.expect)(result.settings.skipBuildArtifacts).toBe(true);
                        (0, bun_test_1.expect)(result.settings.symlinkDeps).toBe(true); // from defaults
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("merges partial settings with defaults", function () { return __awaiter(void 0, void 0, void 0, function () {
            var partialConfig, configPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        partialConfig = {
                            settings: {
                                copyMode: "worktree",
                                skipBuildArtifacts: false,
                                skipPatterns: ["*.tmp"],
                                autoInstall: true,
                            },
                        };
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.writeFile(configPath, JSON.stringify(partialConfig, null, 2))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.settings.copyMode).toBe("worktree");
                        (0, bun_test_1.expect)(result.settings.skipBuildArtifacts).toBe(false);
                        (0, bun_test_1.expect)(result.settings.skipPatterns).toEqual(["*.tmp"]);
                        (0, bun_test_1.expect)(result.settings.autoInstall).toBe(true);
                        (0, bun_test_1.expect)(result.settings.symlinkDeps).toBe(true); // from defaults
                        (0, bun_test_1.expect)(result.lanes).toEqual([]); // from defaults
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("handles malformed JSON gracefully", function () { return __awaiter(void 0, void 0, void 0, function () {
            var configPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.writeFile(configPath, "{ invalid json }")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.version).toBe(1);
                        (0, bun_test_1.expect)(result.lanes).toEqual([]);
                        (0, bun_test_1.expect)(result.settings.copyMode).toBe("full");
                        (0, bun_test_1.expect)(result.settings.symlinkDeps).toBe(true); // from defaults
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("saveConfig", function () {
        (0, bun_test_1.test)("saves config to file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, configPath, fileContent, savedConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            version: 1,
                            lanes: [
                                {
                                    name: "saved-lane",
                                    path: "/saved/path",
                                    branch: "saved-branch",
                                    createdAt: "2024-01-01T00:00:00.000Z",
                                },
                            ],
                            settings: {
                                copyMode: "worktree",
                                skipBuildArtifacts: true,
                                skipPatterns: ["*.log"],
                                autoInstall: false,
                                symlinkDeps: true,
                            },
                        };
                        return [4 /*yield*/, (0, config_1.saveConfig)(gitRoot, config)];
                    case 1:
                        _a.sent();
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.readFile(configPath, "utf-8")];
                    case 2:
                        fileContent = _a.sent();
                        savedConfig = JSON.parse(fileContent);
                        (0, bun_test_1.expect)(savedConfig).toEqual(config);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("overwrites existing config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialConfig, updatedConfig, configPath, fileContent, savedConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initialConfig = {
                            version: 1,
                            lanes: [
                                {
                                    name: "initial-lane",
                                    path: "/initial",
                                    branch: "initial",
                                    createdAt: "2024-01-01T00:00:00.000Z",
                                },
                            ],
                            settings: {
                                copyMode: "full",
                                skipBuildArtifacts: false,
                                skipPatterns: [],
                                autoInstall: true,
                                symlinkDeps: true,
                            },
                        };
                        return [4 /*yield*/, (0, config_1.saveConfig)(gitRoot, initialConfig)];
                    case 1:
                        _a.sent();
                        updatedConfig = {
                            version: 2,
                            lanes: [
                                {
                                    name: "updated-lane",
                                    path: "/updated",
                                    branch: "updated",
                                    createdAt: "2024-01-02T00:00:00.000Z",
                                },
                            ],
                            settings: {
                                copyMode: "worktree",
                                skipBuildArtifacts: true,
                                skipPatterns: ["*.tmp"],
                                autoInstall: false,
                                symlinkDeps: false,
                            },
                        };
                        return [4 /*yield*/, (0, config_1.saveConfig)(gitRoot, updatedConfig)];
                    case 2:
                        _a.sent();
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.readFile(configPath, "utf-8")];
                    case 3:
                        fileContent = _a.sent();
                        savedConfig = JSON.parse(fileContent);
                        (0, bun_test_1.expect)(savedConfig.version).toBe(2);
                        (0, bun_test_1.expect)(savedConfig.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(savedConfig.lanes[0].name).toBe("updated-lane");
                        (0, bun_test_1.expect)(savedConfig.settings.copyMode).toBe("worktree");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("addLane", function () {
        (0, bun_test_1.test)("adds a new lane to empty config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var laneInput, result, reloaded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        laneInput = {
                            name: "new-feature",
                            path: "/path/to/new-feature",
                            branch: "feature/new-feature",
                        };
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, laneInput)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(result.lanes[0].name).toBe("new-feature");
                        (0, bun_test_1.expect)(result.lanes[0].path).toBe("/path/to/new-feature");
                        (0, bun_test_1.expect)(result.lanes[0].branch).toBe("feature/new-feature");
                        (0, bun_test_1.expect)(result.lanes[0].createdAt).toBeDefined();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        reloaded = _a.sent();
                        (0, bun_test_1.expect)(reloaded.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(reloaded.lanes[0].name).toBe("new-feature");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("replaces existing lane with same name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Add first lane
                    return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                            name: "feature-x",
                            path: "/old/path",
                            branch: "feature/old-branch",
                        })];
                    case 1:
                        // Add first lane
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                                name: "feature-x",
                                path: "/new/path",
                                branch: "feature/new-branch",
                            })];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(result.lanes[0].path).toBe("/new/path");
                        (0, bun_test_1.expect)(result.lanes[0].branch).toBe("feature/new-branch");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("adds multiple lanes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                            name: "feature-1",
                            path: "/path/1",
                            branch: "feature/1",
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                                name: "feature-2",
                                path: "/path/2",
                                branch: "feature/2",
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 3:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toHaveLength(2);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("sets createdAt timestamp", function () { return __awaiter(void 0, void 0, void 0, function () {
            var before, after, lanes, createdAt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        before = new Date();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                                name: "timestamp-test",
                                path: "/path",
                                branch: "branch",
                            })];
                    case 1:
                        _a.sent();
                        after = new Date();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 2:
                        lanes = _a.sent();
                        createdAt = new Date(lanes[0].createdAt);
                        (0, bun_test_1.expect)(createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
                        (0, bun_test_1.expect)(createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("removeLane", function () {
        (0, bun_test_1.test)("removes existing lane", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, reloaded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                            name: "to-remove",
                            path: "/path",
                            branch: "branch",
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.removeLane)(gitRoot, "to-remove")];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(0);
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 3:
                        reloaded = _a.sent();
                        (0, bun_test_1.expect)(reloaded.lanes).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("keeps other lanes when removing one", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-1", path: "/path/1", branch: "branch-1" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-2", path: "/path/2", branch: "branch-2" })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-3", path: "/path/3", branch: "branch-3" })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.removeLane)(gitRoot, "lane-2")];
                    case 4:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(2);
                        (0, bun_test_1.expect)(result.lanes.find(function (l) { return l.name === "lane-1"; })).toBeDefined();
                        (0, bun_test_1.expect)(result.lanes.find(function (l) { return l.name === "lane-3"; })).toBeDefined();
                        (0, bun_test_1.expect)(result.lanes.find(function (l) { return l.name === "lane-2"; })).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("handles removing non-existent lane gracefully", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "existing", path: "/path", branch: "branch" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.removeLane)(gitRoot, "non-existent")];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(result.lanes[0].name).toBe("existing");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("handles removing from empty config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.removeLane)(gitRoot, "any-lane")];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.lanes).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("getLane", function () {
        (0, bun_test_1.test)("returns existing lane", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                            name: "target-lane",
                            path: "/target/path",
                            branch: "target-branch",
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getLane)(gitRoot, "target-lane")];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeDefined();
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.name).toBe("target-lane");
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.path).toBe("/target/path");
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.branch).toBe("target-branch");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns null for non-existent lane", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "existing", path: "/path", branch: "branch" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getLane)(gitRoot, "non-existent")];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns null when config is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.getLane)(gitRoot, "any-lane")];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("finds correct lane among many", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-1", path: "/path/1", branch: "branch-1" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-2", path: "/path/2", branch: "branch-2" })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-3", path: "/path/3", branch: "branch-3" })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getLane)(gitRoot, "lane-2")];
                    case 4:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.name).toBe("lane-2");
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.path).toBe("/path/2");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("getAllLanes", function () {
        (0, bun_test_1.test)("returns empty array when no lanes exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns all lanes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-1", path: "/path/1", branch: "branch-1" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-2", path: "/path/2", branch: "branch-2" })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "lane-3", path: "/path/3", branch: "branch-3" })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 4:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toHaveLength(3);
                        (0, bun_test_1.expect)(result.map(function (l) { return l.name; })).toEqual(["lane-1", "lane-2", "lane-3"]);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns lanes in insertion order", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "first", path: "/first", branch: "first" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "second", path: "/second", branch: "second" })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "third", path: "/third", branch: "third" })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 4:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result[0].name).toBe("first");
                        (0, bun_test_1.expect)(result[1].name).toBe("second");
                        (0, bun_test_1.expect)(result[2].name).toBe("third");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns copy of lanes array", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanes1, lanes2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "test", path: "/path", branch: "branch" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 2:
                        lanes1 = _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 3:
                        lanes2 = _a.sent();
                        (0, bun_test_1.expect)(lanes1).not.toBe(lanes2); // Different array references
                        (0, bun_test_1.expect)(lanes1).toEqual(lanes2); // Same contents
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("recordLaneSwitch", function () {
        (0, bun_test_1.test)("records lane switch to history file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fromPath, historyPath, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromPath = "/path/to/previous-lane";
                        return [4 /*yield*/, (0, config_1.recordLaneSwitch)(gitRoot, fromPath)];
                    case 1:
                        _a.sent();
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.readFile(historyPath, "utf-8")];
                    case 2:
                        content = _a.sent();
                        (0, bun_test_1.expect)(content.trim()).toBe(fromPath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("overwrites previous history", function () { return __awaiter(void 0, void 0, void 0, function () {
            var historyPath, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.recordLaneSwitch)(gitRoot, "/first-lane")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.recordLaneSwitch)(gitRoot, "/second-lane")];
                    case 2:
                        _a.sent();
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.readFile(historyPath, "utf-8")];
                    case 3:
                        content = _a.sent();
                        (0, bun_test_1.expect)(content.trim()).toBe("/second-lane");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("handles paths with spaces", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fromPath, historyPath, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromPath = "/path with spaces/to lane";
                        return [4 /*yield*/, (0, config_1.recordLaneSwitch)(gitRoot, fromPath)];
                    case 1:
                        _a.sent();
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.readFile(historyPath, "utf-8")];
                    case 2:
                        content = _a.sent();
                        (0, bun_test_1.expect)(content.trim()).toBe(fromPath);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("getPreviousLane", function () {
        (0, bun_test_1.test)("returns null when history file does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns null when history file is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
            var historyPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.writeFile(historyPath, "")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns previous lane path", function () { return __awaiter(void 0, void 0, void 0, function () {
            var previousPath, historyPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        previousPath = path_1.default.join(tempDir, "previous-lane");
                        return [4 /*yield*/, fs_1.promises.mkdir(previousPath, { recursive: true })];
                    case 1:
                        _a.sent();
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.writeFile(historyPath, previousPath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 3:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBe(previousPath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns null if previous lane path does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonExistentPath, historyPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonExistentPath = "/path/that/does/not/exist";
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.writeFile(historyPath, nonExistentPath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns path if it exists as file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tempLanePath, historyPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempLanePath = path_1.default.join(tempDir, "existing-lane");
                        return [4 /*yield*/, fs_1.promises.writeFile(tempLanePath, "content")];
                    case 1:
                        _a.sent();
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.writeFile(historyPath, tempLanePath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 3:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBe(tempLanePath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("returns path if it exists as directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tempLanePath, historyPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempLanePath = path_1.default.join(tempDir, "existing-lane-dir");
                        return [4 /*yield*/, fs_1.promises.mkdir(tempLanePath, { recursive: true })];
                    case 1:
                        _a.sent();
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.writeFile(historyPath, tempLanePath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 3:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBe(tempLanePath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("handles whitespace in history file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var previousPath, historyPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        previousPath = path_1.default.join(tempDir, "whitespace-lane");
                        return [4 /*yield*/, fs_1.promises.mkdir(previousPath, { recursive: true })];
                    case 1:
                        _a.sent();
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.writeFile(historyPath, "  ".concat(previousPath, "  \n"))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 3:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBe(previousPath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("handles malformed history file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var historyPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        historyPath = path_1.default.join(gitRoot, ".git", "lanes-history");
                        return [4 /*yield*/, fs_1.promises.writeFile(historyPath, "")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("BUILD_ARTIFACT_PATTERNS", function () {
        (0, bun_test_1.test)("exports build artifact patterns", function () {
            (0, bun_test_1.expect)(config_1.BUILD_ARTIFACT_PATTERNS).toBeInstanceOf(Array);
            (0, bun_test_1.expect)(config_1.BUILD_ARTIFACT_PATTERNS.length).toBeGreaterThan(0);
            (0, bun_test_1.expect)(config_1.BUILD_ARTIFACT_PATTERNS).toContain("node_modules");
            (0, bun_test_1.expect)(config_1.BUILD_ARTIFACT_PATTERNS).toContain(".next");
            (0, bun_test_1.expect)(config_1.BUILD_ARTIFACT_PATTERNS).toContain("dist");
        });
    });
    (0, bun_test_1.describe)("symlinkDeps setting", function () {
        (0, bun_test_1.test)("loads config with symlinkDeps disabled", function () { return __awaiter(void 0, void 0, void 0, function () {
            var configWithSymlinksDisabled, configPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configWithSymlinksDisabled = {
                            version: 1,
                            lanes: [],
                            settings: {
                                copyMode: "full",
                                skipBuildArtifacts: false,
                                skipPatterns: [],
                                autoInstall: true,
                                symlinkDeps: false,
                            },
                        };
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.writeFile(configPath, JSON.stringify(configWithSymlinksDisabled, null, 2))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.settings.symlinkDeps).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("merges symlinkDeps setting from partial config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var partialConfig, configPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        partialConfig = {
                            settings: {
                                symlinkDeps: false,
                            },
                        };
                        configPath = (0, config_1.getConfigPath)(gitRoot);
                        return [4 /*yield*/, fs_1.promises.writeFile(configPath, JSON.stringify(partialConfig, null, 2))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.settings.symlinkDeps).toBe(false);
                        (0, bun_test_1.expect)(result.settings.copyMode).toBe("full"); // other defaults preserved
                        (0, bun_test_1.expect)(result.settings.autoInstall).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("saves and loads config with symlinkDeps enabled", function () { return __awaiter(void 0, void 0, void 0, function () {
            var configWithSymlinks, loaded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configWithSymlinks = {
                            version: 1,
                            lanes: [],
                            settings: {
                                copyMode: "worktree",
                                skipBuildArtifacts: true,
                                skipPatterns: ["*.log"],
                                autoInstall: false,
                                symlinkDeps: true,
                            },
                        };
                        return [4 /*yield*/, (0, config_1.saveConfig)(gitRoot, configWithSymlinks)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        loaded = _a.sent();
                        (0, bun_test_1.expect)(loaded.settings.symlinkDeps).toBe(true);
                        (0, bun_test_1.expect)(loaded.settings.copyMode).toBe("worktree");
                        (0, bun_test_1.expect)(loaded.settings.skipBuildArtifacts).toBe(true);
                        (0, bun_test_1.expect)(loaded.settings.skipPatterns).toEqual(["*.log"]);
                        (0, bun_test_1.expect)(loaded.settings.autoInstall).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("integration scenarios", function () {
        (0, bun_test_1.test)("complete lane lifecycle", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanes, laneA, removedLane;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Create lanes
                    return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "feature-a", path: "/a", branch: "feature-a" })];
                    case 1:
                        // Create lanes
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.addLane)(gitRoot, { name: "feature-b", path: "/b", branch: "feature-b" })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 3:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(lanes).toHaveLength(2);
                        return [4 /*yield*/, (0, config_1.getLane)(gitRoot, "feature-a")];
                    case 4:
                        laneA = _a.sent();
                        (0, bun_test_1.expect)(laneA === null || laneA === void 0 ? void 0 : laneA.name).toBe("feature-a");
                        // Remove one lane
                        return [4 /*yield*/, (0, config_1.removeLane)(gitRoot, "feature-a")];
                    case 5:
                        // Remove one lane
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(gitRoot)];
                    case 6:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(lanes[0].name).toBe("feature-b");
                        return [4 /*yield*/, (0, config_1.getLane)(gitRoot, "feature-a")];
                    case 7:
                        removedLane = _a.sent();
                        (0, bun_test_1.expect)(removedLane).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("lane switch history workflow", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lane1Path, previous, lane2Path, updatedPrevious;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lane1Path = path_1.default.join(tempDir, "lane-1");
                        return [4 /*yield*/, fs_1.promises.mkdir(lane1Path, { recursive: true })];
                    case 1:
                        _a.sent();
                        // Record switch from lane 1
                        return [4 /*yield*/, (0, config_1.recordLaneSwitch)(gitRoot, lane1Path)];
                    case 2:
                        // Record switch from lane 1
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 3:
                        previous = _a.sent();
                        (0, bun_test_1.expect)(previous).toBe(lane1Path);
                        lane2Path = path_1.default.join(tempDir, "lane-2");
                        return [4 /*yield*/, fs_1.promises.mkdir(lane2Path, { recursive: true })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.recordLaneSwitch)(gitRoot, lane2Path)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getPreviousLane)(gitRoot)];
                    case 6:
                        updatedPrevious = _a.sent();
                        (0, bun_test_1.expect)(updatedPrevious).toBe(lane2Path);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("persistence across config reloads", function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, reloaded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Add a lane
                    return [4 /*yield*/, (0, config_1.addLane)(gitRoot, {
                            name: "persistent-lane",
                            path: "/persistent",
                            branch: "persistent",
                        })];
                    case 1:
                        // Add a lane
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 2:
                        config = _a.sent();
                        config.settings.copyMode = "worktree";
                        config.settings.skipBuildArtifacts = true;
                        return [4 /*yield*/, (0, config_1.saveConfig)(gitRoot, config)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.loadConfig)(gitRoot)];
                    case 4:
                        reloaded = _a.sent();
                        (0, bun_test_1.expect)(reloaded.lanes).toHaveLength(1);
                        (0, bun_test_1.expect)(reloaded.lanes[0].name).toBe("persistent-lane");
                        (0, bun_test_1.expect)(reloaded.settings.copyMode).toBe("worktree");
                        (0, bun_test_1.expect)(reloaded.settings.skipBuildArtifacts).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
