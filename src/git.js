"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findGitRepo = findGitRepo;
exports.isWorktree = isWorktree;
exports.getMainWorktree = getMainWorktree;
exports.getUntrackedFiles = getUntrackedFiles;
exports.createWorktree = createWorktree;
exports.removeWorktree = removeWorktree;
exports.listWorktrees = listWorktrees;
exports.branchExists = branchExists;
exports.deleteBranch = deleteBranch;
exports.getCurrentBranch = getCurrentBranch;
var node_path_1 = require("node:path");
/**
 * Find the git repository root from the current directory
 */
function findGitRepo() {
    return __awaiter(this, arguments, void 0, function (cwd) {
        var root, currentBranch, _a;
        if (cwd === void 0) { cwd = process.cwd(); }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Bun.$(templateObject_1 || (templateObject_1 = __makeTemplateObject(["git rev-parse --show-toplevel"], ["git rev-parse --show-toplevel"]))).cwd(cwd).quiet().text()];
                case 1:
                    root = (_b.sent()).trim();
                    return [4 /*yield*/, Bun.$(templateObject_2 || (templateObject_2 = __makeTemplateObject(["git branch --show-current"], ["git branch --show-current"]))).cwd(root).quiet().text()];
                case 2:
                    currentBranch = (_b.sent()).trim();
                    return [2 /*return*/, {
                            root: root,
                            name: node_path_1.default.basename(root),
                            parentDir: node_path_1.default.dirname(root),
                            currentBranch: currentBranch,
                        }];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Check if we're inside a git worktree (not the main repo)
 */
function isWorktree() {
    return __awaiter(this, arguments, void 0, function (cwd) {
        var gitDir, _a;
        if (cwd === void 0) { cwd = process.cwd(); }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Bun.$(templateObject_3 || (templateObject_3 = __makeTemplateObject(["git rev-parse --git-dir"], ["git rev-parse --git-dir"]))).cwd(cwd).quiet().text()];
                case 1:
                    gitDir = (_b.sent()).trim();
                    // If git-dir contains "/worktrees/", we're in a worktree
                    return [2 /*return*/, gitDir.includes("/worktrees/")];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Get the main worktree path (the original repo)
 */
function getMainWorktree() {
    return __awaiter(this, arguments, void 0, function (cwd) {
        var output, match, _a;
        if (cwd === void 0) { cwd = process.cwd(); }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Bun.$(templateObject_4 || (templateObject_4 = __makeTemplateObject(["git worktree list --porcelain"], ["git worktree list --porcelain"]))).cwd(cwd).quiet().text()];
                case 1:
                    output = _b.sent();
                    match = output.match(/^worktree (.+)$/m);
                    return [2 /*return*/, match ? match[1] : null];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Get untracked and ignored items using git status (fast, single command)
 */
function getUntrackedFiles(cwd) {
    return __awaiter(this, void 0, void 0, function () {
        var untrackedItems, proc, output, _i, _a, line, status_1, filePath, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    untrackedItems = new Set();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    proc = Bun.spawn(["git", "status", "--ignored", "--porcelain"], {
                        cwd: cwd,
                        stdout: "pipe",
                        stderr: "pipe",
                    });
                    return [4 /*yield*/, proc.exited];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, new Response(proc.stdout).text()];
                case 3:
                    output = _b.sent();
                    for (_i = 0, _a = output.split("\n"); _i < _a.length; _i++) {
                        line = _a[_i];
                        if (!line)
                            continue;
                        status_1 = line.substring(0, 2);
                        filePath = line.substring(3);
                        // Remove trailing slash for directories
                        if (filePath.endsWith("/")) {
                            filePath = filePath.slice(0, -1);
                        }
                        // ?? = untracked, !! = ignored
                        if (status_1 === "??" || status_1 === "!!") {
                            untrackedItems.add(filePath);
                        }
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    process.stderr.write("  [git status failed: ".concat(e_1.message, "]\n"));
                    return [3 /*break*/, 5];
                case 5:
                    if (untrackedItems.size > 0) {
                        process.stderr.write("  [found ".concat(untrackedItems.size, " untracked/ignored items]\n"));
                    }
                    return [2 /*return*/, Array.from(untrackedItems)];
            }
        });
    });
}
/**
 * Create a new git worktree
 */
function createWorktree(repoPath_1, worktreePath_1, branchName_1) {
    return __awaiter(this, arguments, void 0, function (repoPath, worktreePath, branchName, createBranch) {
        var args, proc, stderr, e_2;
        if (createBranch === void 0) { createBranch = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    args = createBranch
                        ? ["worktree", "add", "-b", branchName, worktreePath]
                        : ["worktree", "add", worktreePath, branchName];
                    proc = Bun.spawn(__spreadArray(["git"], args, true), {
                        cwd: repoPath,
                        stdout: "pipe",
                        stderr: "pipe",
                    });
                    return [4 /*yield*/, proc.exited];
                case 1:
                    _a.sent();
                    if (!(proc.exitCode !== 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Response(proc.stderr).text()];
                case 2:
                    stderr = _a.sent();
                    return [2 /*return*/, { success: false, error: stderr || "Unknown error" }];
                case 3: return [2 /*return*/, { success: true }];
                case 4:
                    e_2 = _a.sent();
                    return [2 /*return*/, { success: false, error: e_2.message || String(e_2) }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Remove a git worktree
 */
function removeWorktree(repoPath, worktreePath) {
    return __awaiter(this, void 0, void 0, function () {
        var proc, stderr, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    proc = Bun.spawn(["git", "worktree", "remove", worktreePath, "--force"], {
                        cwd: repoPath,
                        stdout: "pipe",
                        stderr: "pipe",
                    });
                    return [4 /*yield*/, proc.exited];
                case 1:
                    _a.sent();
                    if (!(proc.exitCode !== 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Response(proc.stderr).text()];
                case 2:
                    stderr = _a.sent();
                    return [2 /*return*/, { success: false, error: stderr || "Unknown error" }];
                case 3: return [2 /*return*/, { success: true }];
                case 4:
                    e_3 = _a.sent();
                    return [2 /*return*/, { success: false, error: e_3.message || String(e_3) }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * List all worktrees
 */
function listWorktrees(repoPath) {
    return __awaiter(this, void 0, void 0, function () {
        var proc, output, worktrees, entries, _i, entries_1, entry, pathMatch, branchMatch, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    proc = Bun.spawn(["git", "worktree", "list", "--porcelain"], {
                        cwd: repoPath,
                        stdout: "pipe",
                        stderr: "pipe",
                    });
                    return [4 /*yield*/, proc.exited];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, new Response(proc.stdout).text()];
                case 2:
                    output = _b.sent();
                    worktrees = [];
                    entries = output.split("\n\n").filter(function (e) { return e.trim(); });
                    for (_i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                        entry = entries_1[_i];
                        pathMatch = entry.match(/^worktree (.+)$/m);
                        branchMatch = entry.match(/^branch refs\/heads\/(.+)$/m);
                        if (pathMatch) {
                            worktrees.push({
                                path: pathMatch[1],
                                branch: branchMatch ? branchMatch[1] : "(detached)",
                                isMain: worktrees.length === 0, // First one is main
                            });
                        }
                    }
                    return [2 /*return*/, worktrees];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Check if a branch exists
 */
function branchExists(repoPath, branchName) {
    return __awaiter(this, void 0, void 0, function () {
        var proc, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    proc = Bun.spawn(["git", "show-ref", "--verify", "--quiet", "refs/heads/".concat(branchName)], {
                        cwd: repoPath,
                        stdout: "pipe",
                        stderr: "pipe",
                    });
                    return [4 /*yield*/, proc.exited];
                case 1:
                    _b.sent();
                    return [2 /*return*/, proc.exitCode === 0];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Delete a branch
 */
function deleteBranch(repoPath_1, branchName_1) {
    return __awaiter(this, arguments, void 0, function (repoPath, branchName, force) {
        var flag, proc, stderr, e_4;
        if (force === void 0) { force = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    flag = force ? "-D" : "-d";
                    proc = Bun.spawn(["git", "branch", flag, branchName], {
                        cwd: repoPath,
                        stdout: "pipe",
                        stderr: "pipe",
                    });
                    return [4 /*yield*/, proc.exited];
                case 1:
                    _a.sent();
                    if (!(proc.exitCode !== 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Response(proc.stderr).text()];
                case 2:
                    stderr = _a.sent();
                    return [2 /*return*/, { success: false, error: stderr || "Unknown error" }];
                case 3: return [2 /*return*/, { success: true }];
                case 4:
                    e_4 = _a.sent();
                    return [2 /*return*/, { success: false, error: e_4.message || String(e_4) }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Get the current branch of a git repo/worktree
 */
function getCurrentBranch(repoPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Bun.$(templateObject_5 || (templateObject_5 = __makeTemplateObject(["git branch --show-current"], ["git branch --show-current"]))).cwd(repoPath).quiet().text()];
                case 1: return [2 /*return*/, (_b.sent()).trim() || null];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
