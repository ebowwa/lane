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
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var git = require("../src/git");
(0, bun_test_1.describe)("git.ts", function () {
    var testRepoPath = "/Users/ebowwa/lane";
    var testBranchPrefix = "test-lane-branch-";
    var testWorktreePrefix = "test-lane-worktree-";
    var createdBranches = [];
    var createdWorktrees = [];
    // Cleanup function to remove test artifacts
    function cleanup() {
        return __awaiter(this, void 0, void 0, function () {
            var _i, createdWorktrees_1, worktreePath, _a, createdBranches_1, branchName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, createdWorktrees_1 = createdWorktrees;
                        _b.label = 1;
                    case 1:
                        if (!(_i < createdWorktrees_1.length)) return [3 /*break*/, 4];
                        worktreePath = createdWorktrees_1[_i];
                        if (!(0, node_fs_1.existsSync)(worktreePath)) return [3 /*break*/, 3];
                        return [4 /*yield*/, git.removeWorktree(testRepoPath, worktreePath)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _a = 0, createdBranches_1 = createdBranches;
                        _b.label = 5;
                    case 5:
                        if (!(_a < createdBranches_1.length)) return [3 /*break*/, 8];
                        branchName = createdBranches_1[_a];
                        return [4 /*yield*/, git.deleteBranch(testRepoPath, branchName, true)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    (0, bun_test_1.beforeEach)(function () {
        // Clean up any previous test artifacts
        cleanup();
    });
    (0, bun_test_1.afterEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clean up after each test
                return [4 /*yield*/, cleanup()];
                case 1:
                    // Clean up after each test
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, bun_test_1.describe)("findGitRepo", function () {
        (0, bun_test_1.test)("should find git repository root from current directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.findGitRepo(testRepoPath)];
                    case 1:
                        repo = _a.sent();
                        (0, bun_test_1.expect)(repo).not.toBeNull();
                        (0, bun_test_1.expect)(repo === null || repo === void 0 ? void 0 : repo.root).toBe(testRepoPath);
                        (0, bun_test_1.expect)(repo === null || repo === void 0 ? void 0 : repo.name).toBe("lane");
                        (0, bun_test_1.expect)(repo === null || repo === void 0 ? void 0 : repo.parentDir).toBe("/Users/ebowwa");
                        (0, bun_test_1.expect)(repo === null || repo === void 0 ? void 0 : repo.currentBranch).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should find git repository from subdirectory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.findGitRepo(node_path_1.default.join(testRepoPath, "src"))];
                    case 1:
                        repo = _a.sent();
                        (0, bun_test_1.expect)(repo).not.toBeNull();
                        (0, bun_test_1.expect)(repo === null || repo === void 0 ? void 0 : repo.root).toBe(testRepoPath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return null for non-git directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonGitDir, repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonGitDir = "/tmp/non-git-dir-" + Date.now();
                        (0, node_fs_1.mkdirSync)(nonGitDir, { recursive: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, git.findGitRepo(nonGitDir)];
                    case 2:
                        repo = _a.sent();
                        (0, bun_test_1.expect)(repo).toBeNull();
                        return [3 /*break*/, 4];
                    case 3:
                        (0, node_fs_1.rmSync)(nonGitDir, { recursive: true, force: true });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return valid GitRepo interface structure", function () { return __awaiter(void 0, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.findGitRepo(testRepoPath)];
                    case 1:
                        repo = _a.sent();
                        (0, bun_test_1.expect)(repo).toMatchObject({
                            root: bun_test_1.expect.any(String),
                            name: bun_test_1.expect.any(String),
                            parentDir: bun_test_1.expect.any(String),
                            currentBranch: bun_test_1.expect.any(String),
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("isWorktree", function () {
        (0, bun_test_1.test)("should return false for main repository", function () { return __awaiter(void 0, void 0, void 0, function () {
            var isWorktreeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.isWorktree(testRepoPath)];
                    case 1:
                        isWorktreeResult = _a.sent();
                        (0, bun_test_1.expect)(isWorktreeResult).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return true for a git worktree", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, isWorktreeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath);
                        return [4 /*yield*/, git.isWorktree(worktreePath)];
                    case 2:
                        isWorktreeResult = _a.sent();
                        (0, bun_test_1.expect)(isWorktreeResult).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return false for non-git directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonGitDir, isWorktreeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonGitDir = "/tmp/non-git-dir-" + Date.now();
                        (0, node_fs_1.mkdirSync)(nonGitDir, { recursive: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, git.isWorktree(nonGitDir)];
                    case 2:
                        isWorktreeResult = _a.sent();
                        (0, bun_test_1.expect)(isWorktreeResult).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        (0, node_fs_1.rmSync)(nonGitDir, { recursive: true, force: true });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("getMainWorktree", function () {
        (0, bun_test_1.test)("should return main worktree path for main repository", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mainWorktree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.getMainWorktree(testRepoPath)];
                    case 1:
                        mainWorktree = _a.sent();
                        (0, bun_test_1.expect)(mainWorktree).toBe(testRepoPath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return main worktree path from a worktree", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, mainWorktree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath);
                        return [4 /*yield*/, git.getMainWorktree(worktreePath)];
                    case 2:
                        mainWorktree = _a.sent();
                        (0, bun_test_1.expect)(mainWorktree).toBe(testRepoPath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return null for non-git directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonGitDir, mainWorktree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonGitDir = "/tmp/non-git-dir-" + Date.now();
                        (0, node_fs_1.mkdirSync)(nonGitDir, { recursive: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, git.getMainWorktree(nonGitDir)];
                    case 2:
                        mainWorktree = _a.sent();
                        (0, bun_test_1.expect)(mainWorktree).toBeNull();
                        return [3 /*break*/, 4];
                    case 3:
                        (0, node_fs_1.rmSync)(nonGitDir, { recursive: true, force: true });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("getCurrentBranch", function () {
        (0, bun_test_1.test)("should return current branch name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.getCurrentBranch(testRepoPath)];
                    case 1:
                        branch = _a.sent();
                        (0, bun_test_1.expect)(branch).not.toBeNull();
                        (0, bun_test_1.expect)(branch).toBeTruthy();
                        (0, bun_test_1.expect)(typeof branch).toBe("string");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return null for non-git directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonGitDir, branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonGitDir = "/tmp/non-git-dir-" + Date.now();
                        (0, node_fs_1.mkdirSync)(nonGitDir, { recursive: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, git.getCurrentBranch(nonGitDir)];
                    case 2:
                        branch = _a.sent();
                        (0, bun_test_1.expect)(branch).toBeNull();
                        return [3 /*break*/, 4];
                    case 3:
                        (0, node_fs_1.rmSync)(nonGitDir, { recursive: true, force: true });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return correct branch for worktree", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath);
                        return [4 /*yield*/, git.getCurrentBranch(worktreePath)];
                    case 2:
                        branch = _a.sent();
                        (0, bun_test_1.expect)(branch).toBe(branchName);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("getUntrackedFiles", function () {
        (0, bun_test_1.test)("should return empty array when no untracked files", function () { return __awaiter(void 0, void 0, void 0, function () {
            var untracked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.getUntrackedFiles(testRepoPath)];
                    case 1:
                        untracked = _a.sent();
                        (0, bun_test_1.expect)(Array.isArray(untracked)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should detect untracked files", function () { return __awaiter(void 0, void 0, void 0, function () {
            var testFile, untracked, fileName_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testFile = node_path_1.default.join(testRepoPath, "temp-untracked-" + Date.now() + ".txt");
                        Bun.write(testFile, "test content");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, git.getUntrackedFiles(testRepoPath)];
                    case 2:
                        untracked = _a.sent();
                        fileName_1 = node_path_1.default.basename(testFile);
                        (0, bun_test_1.expect)(untracked.some(function (f) { return f.includes(fileName_1); })).toBe(true);
                        return [3 /*break*/, 4];
                    case 3:
                        // Clean up the test file
                        (0, node_fs_1.rmSync)(testFile, { force: true });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should detect ignored files", function () { return __awaiter(void 0, void 0, void 0, function () {
            var testFile, originalContent, tempIgnoreName, _a, _b, _c, tempIgnoredFile, untracked, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        testFile = node_path_1.default.join(testRepoPath, ".gitignore");
                        originalContent = (0, node_fs_1.existsSync)(testFile) ? Bun.file(testFile).text() : "";
                        tempIgnoreName = "temp-ignore-" + Date.now() + ".txt";
                        _b = (_a = Bun).write;
                        _c = [testFile];
                        return [4 /*yield*/, originalContent];
                    case 1:
                        _b.apply(_a, _c.concat([(_g.sent()) + "\n" + tempIgnoreName]));
                        tempIgnoredFile = node_path_1.default.join(testRepoPath, tempIgnoreName);
                        Bun.write(tempIgnoredFile, "ignored content");
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, , 4, 8]);
                        return [4 /*yield*/, git.getUntrackedFiles(testRepoPath)];
                    case 3:
                        untracked = _g.sent();
                        (0, bun_test_1.expect)(untracked.some(function (f) { return f.includes(tempIgnoreName); })).toBe(true);
                        return [3 /*break*/, 8];
                    case 4:
                        // Clean up
                        (0, node_fs_1.rmSync)(tempIgnoredFile, { force: true });
                        if (!originalContent) return [3 /*break*/, 6];
                        _e = (_d = Bun).write;
                        _f = [testFile];
                        return [4 /*yield*/, originalContent];
                    case 5:
                        _e.apply(_d, _f.concat([_g.sent()]));
                        return [3 /*break*/, 7];
                    case 6:
                        (0, node_fs_1.rmSync)(testFile, { force: true });
                        _g.label = 7;
                    case 7: return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("createWorktree", function () {
        (0, bun_test_1.test)("should create worktree with new branch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, result, branchExistsResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(true);
                        (0, bun_test_1.expect)(result.error).toBeUndefined();
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(worktreePath)).toBe(true);
                        return [4 /*yield*/, git.branchExists(testRepoPath, branchName)];
                    case 2:
                        branchExistsResult = _a.sent();
                        (0, bun_test_1.expect)(branchExistsResult).toBe(true);
                        // Clean up
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should create worktree with existing detached HEAD", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath1, result1, proc, commitHash, worktreePath2, result2, worktrees, wt2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath1 = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + "1-" + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath1, branchName, true)];
                    case 1:
                        result1 = _a.sent();
                        (0, bun_test_1.expect)(result1.success).toBe(true);
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath1);
                        proc = Bun.spawn(["git", "rev-parse", "HEAD"], {
                            cwd: worktreePath1,
                            stdout: "pipe",
                            stderr: "pipe",
                        });
                        return [4 /*yield*/, proc.exited];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, new Response(proc.stdout).text()];
                    case 3:
                        commitHash = (_a.sent()).trim();
                        worktreePath2 = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + "2-" + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath2, commitHash, false)];
                    case 4:
                        result2 = _a.sent();
                        (0, bun_test_1.expect)(result2.success).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(worktreePath2)).toBe(true);
                        createdWorktrees.push(worktreePath2);
                        return [4 /*yield*/, git.listWorktrees(testRepoPath)];
                    case 5:
                        worktrees = _a.sent();
                        wt2 = worktrees.find(function (w) { return w.path === worktreePath2; });
                        (0, bun_test_1.expect)(wt2 === null || wt2 === void 0 ? void 0 : wt2.branch).toBe("(detached)");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when creating worktree with invalid path", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, invalidPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        invalidPath = "/dev/null/invalid-worktree";
                        return [4 /*yield*/, git.createWorktree(testRepoPath, invalidPath, branchName, true)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when creating worktree in non-git directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonGitDir, branchName, worktreePath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonGitDir = "/tmp/non-git-dir-" + Date.now();
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(nonGitDir, "worktree");
                        return [4 /*yield*/, git.createWorktree(nonGitDir, worktreePath, branchName, true)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("removeWorktree", function () {
        (0, bun_test_1.test)("should remove existing worktree", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, removeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        return [4 /*yield*/, git.removeWorktree(testRepoPath, worktreePath)];
                    case 2:
                        removeResult = _a.sent();
                        (0, bun_test_1.expect)(removeResult.success).toBe(true);
                        (0, bun_test_1.expect)(removeResult.error).toBeUndefined();
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(worktreePath)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when removing non-existent worktree", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonExistentPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonExistentPath = "/tmp/non-existent-worktree-" + Date.now();
                        return [4 /*yield*/, git.removeWorktree(testRepoPath, nonExistentPath)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should use force flag to remove worktree with uncommitted changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, testFile, removeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        testFile = node_path_1.default.join(worktreePath, "uncommitted.txt");
                        Bun.write(testFile, "uncommitted changes");
                        return [4 /*yield*/, git.removeWorktree(testRepoPath, worktreePath)];
                    case 2:
                        removeResult = _a.sent();
                        (0, bun_test_1.expect)(removeResult.success).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(worktreePath)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("listWorktrees", function () {
        (0, bun_test_1.test)("should list all worktrees including main", function () { return __awaiter(void 0, void 0, void 0, function () {
            var worktrees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.listWorktrees(testRepoPath)];
                    case 1:
                        worktrees = _a.sent();
                        (0, bun_test_1.expect)(Array.isArray(worktrees)).toBe(true);
                        (0, bun_test_1.expect)(worktrees.length).toBeGreaterThanOrEqual(1);
                        // First worktree should be main
                        (0, bun_test_1.expect)(worktrees[0].isMain).toBe(true);
                        (0, bun_test_1.expect)(worktrees[0].path).toBe(testRepoPath);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should list newly created worktree", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, worktrees, createdWorktree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath);
                        return [4 /*yield*/, git.listWorktrees(testRepoPath)];
                    case 2:
                        worktrees = _a.sent();
                        // Should have at least 2 worktrees (main + the new one)
                        (0, bun_test_1.expect)(worktrees.length).toBeGreaterThanOrEqual(2);
                        createdWorktree = worktrees.find(function (w) { return w.path === worktreePath; });
                        (0, bun_test_1.expect)(createdWorktree).toBeDefined();
                        (0, bun_test_1.expect)(createdWorktree === null || createdWorktree === void 0 ? void 0 : createdWorktree.branch).toBe(branchName);
                        (0, bun_test_1.expect)(createdWorktree === null || createdWorktree === void 0 ? void 0 : createdWorktree.isMain).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return worktree with branch info", function () { return __awaiter(void 0, void 0, void 0, function () {
            var worktrees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.listWorktrees(testRepoPath)];
                    case 1:
                        worktrees = _a.sent();
                        (0, bun_test_1.expect)(worktrees[0]).toMatchObject({
                            path: bun_test_1.expect.any(String),
                            branch: bun_test_1.expect.any(String),
                            isMain: bun_test_1.expect.any(Boolean),
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("branchExists", function () {
        (0, bun_test_1.test)("should return true for existing branch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentBranch, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.getCurrentBranch(testRepoPath)];
                    case 1:
                        currentBranch = _a.sent();
                        if (!currentBranch) return [3 /*break*/, 3];
                        return [4 /*yield*/, git.branchExists(testRepoPath, currentBranch)];
                    case 2:
                        exists = _a.sent();
                        (0, bun_test_1.expect)(exists).toBe(true);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return false for non-existent branch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonExistentBranch, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonExistentBranch = "definitely-non-existent-branch-" + Date.now();
                        return [4 /*yield*/, git.branchExists(testRepoPath, nonExistentBranch)];
                    case 1:
                        exists = _a.sent();
                        (0, bun_test_1.expect)(exists).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return true for newly created branch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath);
                        return [4 /*yield*/, git.branchExists(testRepoPath, branchName)];
                    case 2:
                        exists = _a.sent();
                        (0, bun_test_1.expect)(exists).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return false for non-git directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonGitDir, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonGitDir = "/tmp/non-git-dir-" + Date.now();
                        (0, node_fs_1.mkdirSync)(nonGitDir, { recursive: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, git.branchExists(nonGitDir, "any-branch")];
                    case 2:
                        exists = _a.sent();
                        (0, bun_test_1.expect)(exists).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        (0, node_fs_1.rmSync)(nonGitDir, { recursive: true, force: true });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("deleteBranch", function () {
        (0, bun_test_1.test)("should delete existing branch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, exists, deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdWorktrees.push(worktreePath);
                        return [4 /*yield*/, git.branchExists(testRepoPath, branchName)];
                    case 2:
                        exists = _a.sent();
                        (0, bun_test_1.expect)(exists).toBe(true);
                        // Remove the worktree first (required to delete branch)
                        return [4 /*yield*/, git.removeWorktree(testRepoPath, worktreePath)];
                    case 3:
                        // Remove the worktree first (required to delete branch)
                        _a.sent();
                        return [4 /*yield*/, git.deleteBranch(testRepoPath, branchName, false)];
                    case 4:
                        deleteResult = _a.sent();
                        (0, bun_test_1.expect)(deleteResult.success).toBe(true);
                        (0, bun_test_1.expect)(deleteResult.error).toBeUndefined();
                        return [4 /*yield*/, git.branchExists(testRepoPath, branchName)];
                    case 5:
                        // Verify branch no longer exists
                        exists = _a.sent();
                        (0, bun_test_1.expect)(exists).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should force delete branch with unmerged changes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdWorktrees.push(worktreePath);
                        // Remove the worktree
                        return [4 /*yield*/, git.removeWorktree(testRepoPath, worktreePath)];
                    case 2:
                        // Remove the worktree
                        _a.sent();
                        return [4 /*yield*/, git.deleteBranch(testRepoPath, branchName, true)];
                    case 3:
                        deleteResult = _a.sent();
                        (0, bun_test_1.expect)(deleteResult.success).toBe(true);
                        createdBranches.push(branchName); // Skip cleanup since already deleted
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when deleting non-existent branch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonExistentBranch, deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonExistentBranch = "definitely-non-existent-branch-" + Date.now();
                        return [4 /*yield*/, git.deleteBranch(testRepoPath, nonExistentBranch, false)];
                    case 1:
                        deleteResult = _a.sent();
                        (0, bun_test_1.expect)(deleteResult.success).toBe(false);
                        (0, bun_test_1.expect)(deleteResult.error).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when deleting current branch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentBranch, deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.getCurrentBranch(testRepoPath)];
                    case 1:
                        currentBranch = _a.sent();
                        if (!currentBranch) return [3 /*break*/, 3];
                        return [4 /*yield*/, git.deleteBranch(testRepoPath, currentBranch, false)];
                    case 2:
                        deleteResult = _a.sent();
                        (0, bun_test_1.expect)(deleteResult.success).toBe(false);
                        (0, bun_test_1.expect)(deleteResult.error).toBeTruthy();
                        (0, bun_test_1.expect)(deleteResult.error).toContain("cannot delete");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("integration tests", function () {
        (0, bun_test_1.test)("should handle complete worktree lifecycle", function () { return __awaiter(void 0, void 0, void 0, function () {
            var branchName, worktreePath, createResult, worktrees, createdWorktree, isWorktreeResult, currentBranch, mainWorktree, removeResult, worktreesAfter, removedWorktree, branchExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        branchName = testBranchPrefix + "lifecycle-" + Date.now();
                        worktreePath = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + "lifecycle-" + Date.now());
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktreePath, branchName, true)];
                    case 1:
                        createResult = _a.sent();
                        (0, bun_test_1.expect)(createResult.success).toBe(true);
                        createdBranches.push(branchName);
                        createdWorktrees.push(worktreePath);
                        return [4 /*yield*/, git.listWorktrees(testRepoPath)];
                    case 2:
                        worktrees = _a.sent();
                        createdWorktree = worktrees.find(function (w) { return w.path === worktreePath; });
                        (0, bun_test_1.expect)(createdWorktree).toBeDefined();
                        return [4 /*yield*/, git.isWorktree(worktreePath)];
                    case 3:
                        isWorktreeResult = _a.sent();
                        (0, bun_test_1.expect)(isWorktreeResult).toBe(true);
                        return [4 /*yield*/, git.getCurrentBranch(worktreePath)];
                    case 4:
                        currentBranch = _a.sent();
                        (0, bun_test_1.expect)(currentBranch).toBe(branchName);
                        return [4 /*yield*/, git.getMainWorktree(worktreePath)];
                    case 5:
                        mainWorktree = _a.sent();
                        (0, bun_test_1.expect)(mainWorktree).toBe(testRepoPath);
                        return [4 /*yield*/, git.removeWorktree(testRepoPath, worktreePath)];
                    case 6:
                        removeResult = _a.sent();
                        (0, bun_test_1.expect)(removeResult.success).toBe(true);
                        return [4 /*yield*/, git.listWorktrees(testRepoPath)];
                    case 7:
                        worktreesAfter = _a.sent();
                        removedWorktree = worktreesAfter.find(function (w) { return w.path === worktreePath; });
                        (0, bun_test_1.expect)(removedWorktree).toBeUndefined();
                        // 8. Clean up branch
                        return [4 /*yield*/, git.deleteBranch(testRepoPath, branchName, true)];
                    case 8:
                        // 8. Clean up branch
                        _a.sent();
                        return [4 /*yield*/, git.branchExists(testRepoPath, branchName)];
                    case 9:
                        branchExists = _a.sent();
                        (0, bun_test_1.expect)(branchExists).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should handle multiple concurrent worktrees", function () { return __awaiter(void 0, void 0, void 0, function () {
            var timestamp, worktree1Path, worktree2Path, branch1, branch2, result1, result2, worktrees, wt1, wt2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now();
                        worktree1Path = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + "multi-1-" + timestamp);
                        worktree2Path = node_path_1.default.join(testRepoPath, "..", testWorktreePrefix + "multi-2-" + timestamp);
                        branch1 = testBranchPrefix + "multi-1-" + timestamp;
                        branch2 = testBranchPrefix + "multi-2-" + timestamp;
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktree1Path, branch1, true)];
                    case 1:
                        result1 = _a.sent();
                        return [4 /*yield*/, git.createWorktree(testRepoPath, worktree2Path, branch2, true)];
                    case 2:
                        result2 = _a.sent();
                        (0, bun_test_1.expect)(result1.success).toBe(true);
                        (0, bun_test_1.expect)(result2.success).toBe(true);
                        createdBranches.push(branch1, branch2);
                        createdWorktrees.push(worktree1Path, worktree2Path);
                        return [4 /*yield*/, git.listWorktrees(testRepoPath)];
                    case 3:
                        worktrees = _a.sent();
                        // Should have at least 3 (main + 2 new)
                        (0, bun_test_1.expect)(worktrees.length).toBeGreaterThanOrEqual(3);
                        wt1 = worktrees.find(function (w) { return w.path === worktree1Path; });
                        wt2 = worktrees.find(function (w) { return w.path === worktree2Path; });
                        (0, bun_test_1.expect)(wt1).toBeDefined();
                        (0, bun_test_1.expect)(wt2).toBeDefined();
                        (0, bun_test_1.expect)(wt1 === null || wt1 === void 0 ? void 0 : wt1.branch).toBe(branch1);
                        (0, bun_test_1.expect)(wt2 === null || wt2 === void 0 ? void 0 : wt2.branch).toBe(branch2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("error handling", function () {
        (0, bun_test_1.test)("should handle git command failures gracefully", function () { return __awaiter(void 0, void 0, void 0, function () {
            var invalidPath, repo, isWt, mainWt, branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invalidPath = "/this/path/does/not/exist";
                        return [4 /*yield*/, git.findGitRepo(invalidPath)];
                    case 1:
                        repo = _a.sent();
                        (0, bun_test_1.expect)(repo).toBeNull();
                        return [4 /*yield*/, git.isWorktree(invalidPath)];
                    case 2:
                        isWt = _a.sent();
                        (0, bun_test_1.expect)(isWt).toBe(false);
                        return [4 /*yield*/, git.getMainWorktree(invalidPath)];
                    case 3:
                        mainWt = _a.sent();
                        (0, bun_test_1.expect)(mainWt).toBeNull();
                        return [4 /*yield*/, git.getCurrentBranch(invalidPath)];
                    case 4:
                        branch = _a.sent();
                        (0, bun_test_1.expect)(branch).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should handle invalid worktree operations", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, git.createWorktree("/invalid/repo", "/invalid/worktree", "test-branch")];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
