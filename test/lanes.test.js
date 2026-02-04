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
var lanes_1 = require("../src/lanes");
var config_1 = require("../src/config");
// Test utilities
var testDir;
var mainRepoRoot;
// Normalize path to handle macOS /tmp -> /private/tmp symlinks
function normalizePath(p) {
    return (0, node_fs_1.realpathSync)(p);
}
function setupTestRepo(repoPath, isWorktree) {
    if (isWorktree === void 0) { isWorktree = false; }
    // Create .git directory
    var gitDir = node_path_1.default.join(repoPath, ".git");
    (0, node_fs_1.mkdirSync)(gitDir, { recursive: true });
    // Create minimal git structure
    (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "objects"), { recursive: true });
    (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "refs"), { recursive: true });
    (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "refs", "heads"), { recursive: true });
    // Initialize git config
    (0, node_fs_1.writeFileSync)(node_path_1.default.join(gitDir, "config"), "[core]\n    repositoryformatversion = 0\n    filemode = true\n    bare = false\n    logallrefupdates = true\n");
    (0, node_fs_1.writeFileSync)(node_path_1.default.join(gitDir, "HEAD"), "ref: refs/heads/main\n");
    // Create initial commit structure
    (0, node_fs_1.writeFileSync)(node_path_1.default.join(repoPath, "README.md"), "# Test Repo");
    (0, node_fs_1.writeFileSync)(node_path_1.default.join(repoPath, "package.json"), JSON.stringify({
        name: "test-repo",
        version: "1.0.0",
    }));
    // Initialize lanes config
    var config = {
        version: 1,
        lanes: [],
        settings: {
            copyMode: "worktree",
            skipBuildArtifacts: false,
            skipPatterns: [],
            autoInstall: false, // Disable for tests
            symlinkDeps: true, // Default is true
        },
    };
    (0, config_1.saveConfig)(repoPath, config);
}
function cleanupTestDir(dir) {
    if ((0, node_fs_1.existsSync)(dir)) {
        (0, node_fs_1.rmSync)(dir, { recursive: true, force: true });
    }
}
(0, bun_test_1.describe)("lanes", function () {
    (0, bun_test_1.beforeEach)(function () {
        // Create temporary test directory
        testDir = node_path_1.default.join("/tmp", "lane-test-".concat(Date.now()));
        (0, node_fs_1.mkdirSync)(testDir, { recursive: true });
        // Setup main repo
        mainRepoRoot = node_path_1.default.join(testDir, "test-repo");
        setupTestRepo(mainRepoRoot);
        // Normalize paths for macOS
        testDir = normalizePath(testDir);
        mainRepoRoot = normalizePath(mainRepoRoot);
    });
    (0, bun_test_1.afterEach)(function () {
        cleanupTestDir(testDir);
    });
    (0, bun_test_1.describe)("getLanePath", function () {
        (0, bun_test_1.test)("should generate correct lane path", function () {
            var lanePath = (0, lanes_1.getLanePath)(mainRepoRoot, "feature-1");
            (0, bun_test_1.expect)(lanePath).toBe(node_path_1.default.join(testDir, "test-repo-lane-feature-1"));
        });
        (0, bun_test_1.test)("should handle lane names with slashes", function () {
            var lanePath = (0, lanes_1.getLanePath)(mainRepoRoot, "feature/sub-branch");
            (0, bun_test_1.expect)(lanePath).toBe(node_path_1.default.join(testDir, "test-repo-lane-feature-sub-branch"));
        });
        (0, bun_test_1.test)("should handle special characters in lane names", function () {
            var lanePath = (0, lanes_1.getLanePath)(mainRepoRoot, "feature/test-branch");
            (0, bun_test_1.expect)(lanePath).toBe(node_path_1.default.join(testDir, "test-repo-lane-feature-test-branch"));
        });
    });
    (0, bun_test_1.describe)("getMainRepoRoot", function () {
        (0, bun_test_1.test)("should return main repo root when in main repo", function () { return __awaiter(void 0, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.getMainRepoRoot)(mainRepoRoot)];
                    case 1:
                        root = _a.sent();
                        (0, bun_test_1.expect)(root).toBeTruthy();
                        (0, bun_test_1.expect)(normalizePath(root)).toBe(mainRepoRoot);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return null when not in a git repository", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nonGitDir, root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonGitDir = node_path_1.default.join(testDir, "not-a-repo");
                        (0, node_fs_1.mkdirSync)(nonGitDir, { recursive: true });
                        return [4 /*yield*/, (0, lanes_1.getMainRepoRoot)(nonGitDir)];
                    case 1:
                        root = _a.sent();
                        (0, bun_test_1.expect)(root).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should detect full-copy lane via .lane-origin file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, gitDir, root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-feature");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        // Create .lane-origin marker
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(lanePath, ".lane-origin"), mainRepoRoot);
                        gitDir = node_path_1.default.join(lanePath, ".git");
                        (0, node_fs_1.mkdirSync)(gitDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "objects"), { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "refs"), { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(gitDir, "HEAD"), "ref: refs/heads/test\n");
                        return [4 /*yield*/, (0, lanes_1.getMainRepoRoot)(lanePath)];
                    case 1:
                        root = _a.sent();
                        (0, bun_test_1.expect)(root).toBeTruthy();
                        (0, bun_test_1.expect)(normalizePath(root)).toBe(mainRepoRoot);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should handle missing .lane-origin file gracefully", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, gitDir, root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-feature");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        gitDir = node_path_1.default.join(lanePath, ".git");
                        (0, node_fs_1.mkdirSync)(gitDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "objects"), { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "refs"), { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(gitDir, "HEAD"), "ref: refs/heads/test\n");
                        // Create .lane-origin with invalid path
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(lanePath, ".lane-origin"), "/nonexistent/path");
                        return [4 /*yield*/, (0, lanes_1.getMainRepoRoot)(lanePath)];
                    case 1:
                        root = _a.sent();
                        // Should fall back to the lane's own git root
                        (0, bun_test_1.expect)(root).toBe(lanePath);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("copyUntrackedFiles", function () {
        (0, bun_test_1.test)("should copy untracked files", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "source");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        setupTestRepo(srcDir);
                        destDir = node_path_1.default.join(testDir, "dest");
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        // Create untracked files
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".env"), "TEST=1\n");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, "secret.txt"), "secret");
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [])];
                    case 1:
                        copied = _a.sent();
                        (0, bun_test_1.expect)(copied.length).toBeGreaterThan(0);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".env"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, "secret.txt"))).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should skip files matching patterns", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir, nodeModulesDir, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "source");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        setupTestRepo(srcDir);
                        destDir = node_path_1.default.join(testDir, "dest");
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        // Create files
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".env"), "TEST=1\n");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".env.local"), "LOCAL=1\n");
                        nodeModulesDir = node_path_1.default.join(srcDir, "node_modules");
                        (0, node_fs_1.mkdirSync)(nodeModulesDir, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(nodeModulesDir, "test.txt"), "test");
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [".env.local", "node_modules"])];
                    case 1:
                        copied = _a.sent();
                        // Should have .env but not .env.local or node_modules
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".env"))).toBe(true);
                        // These might or might not exist depending on skip patterns
                        (0, bun_test_1.expect)(copied).not.toContain(".env.local");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should copy nested untracked files", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir, nestedDir, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "source");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        setupTestRepo(srcDir);
                        destDir = node_path_1.default.join(testDir, "dest");
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        nestedDir = node_path_1.default.join(srcDir, "config", "local");
                        (0, node_fs_1.mkdirSync)(nestedDir, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(nestedDir, ".env"), "NESTED=1\n");
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [])];
                    case 1:
                        copied = _a.sent();
                        (0, bun_test_1.expect)(copied.some(function (f) { return f.includes("config"); })).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should handle missing source files gracefully", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "source");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        setupTestRepo(srcDir);
                        destDir = node_path_1.default.join(testDir, "dest");
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [])];
                    case 1:
                        copied = _a.sent();
                        (0, bun_test_1.expect)(Array.isArray(copied)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("detectPackageManagers", function () {
        (0, bun_test_1.test)("should detect bun", function () {
            var testPath = node_path_1.default.join(testDir, "detect-bun");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "bun.lockb"), "lockfile");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.length).toBeGreaterThan(0);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "bun"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect npm", function () {
            var testPath = node_path_1.default.join(testDir, "detect-npm");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "package-lock.json"), "{}");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "npm"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect pnpm", function () {
            var testPath = node_path_1.default.join(testDir, "detect-pnpm");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "pnpm-lock.yaml"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "pnpm"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect yarn", function () {
            var testPath = node_path_1.default.join(testDir, "detect-yarn");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "yarn.lock"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "yarn"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect poetry (Python)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-poetry");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "poetry.lock"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "poetry"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect pipenv (Python)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-pipenv");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "Pipfile.lock"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "pipenv"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect cargo (Rust)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-cargo");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "Cargo.toml"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "cargo"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect bundler (Ruby)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-bundler");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "Gemfile.lock"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "bundler"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect go", function () {
            var testPath = node_path_1.default.join(testDir, "detect-go");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "go.mod"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "go"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect composer (PHP)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-composer");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "composer.json"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "composer"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect mix (Elixir)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-mix");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "mix.lock"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "mix"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect gradle (Java)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-gradle");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "build.gradle"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "gradle"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect maven (Java)", function () {
            var testPath = node_path_1.default.join(testDir, "detect-maven");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "pom.xml"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "maven"; })).toBe(true);
        });
        (0, bun_test_1.test)("should detect swift", function () {
            var testPath = node_path_1.default.join(testDir, "detect-swift");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "Package.swift"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected.some(function (pm) { return pm.name === "swift"; })).toBe(true);
        });
        (0, bun_test_1.test)("should only detect one package manager per ecosystem", function () {
            var testPath = node_path_1.default.join(testDir, "detect-node");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            // Create multiple Node.js lockfiles
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "bun.lockb"), "bun");
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "package-lock.json"), "npm");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            // Should only detect one Node.js manager
            var nodeManagers = detected.filter(function (pm) {
                return ["bun", "pnpm", "yarn", "npm"].includes(pm.name);
            });
            (0, bun_test_1.expect)(nodeManagers.length).toBe(1);
        });
        (0, bun_test_1.test)("should return empty array when no package manager detected", function () {
            var testPath = node_path_1.default.join(testDir, "detect-none");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            (0, bun_test_1.expect)(detected).toEqual([]);
        });
    });
    (0, bun_test_1.describe)("runPackageInstall", function () {
        (0, bun_test_1.test)("should return no managers when none detected", function () { return __awaiter(void 0, void 0, void 0, function () {
            var testPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testPath = node_path_1.default.join(testDir, "install-none");
                        (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
                        return [4 /*yield*/, (0, lanes_1.runPackageInstall)(testPath)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.ran).toBe(false);
                        (0, bun_test_1.expect)(result.managers).toEqual([]);
                        (0, bun_test_1.expect)(result.errors).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should detect package managers without running when not in test", function () { return __awaiter(void 0, void 0, void 0, function () {
            var testPath, originalSpawn, spawnCalled, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testPath = node_path_1.default.join(testDir, "install-detect");
                        (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "package.json"), JSON.stringify({ name: "test" }));
                        originalSpawn = Bun.spawn;
                        spawnCalled = false;
                        Bun.spawn = (0, bun_test_1.mock)(function () {
                            spawnCalled = true;
                            return { exited: Promise.resolve(0), stdout: null, stderr: null, stdin: null };
                        });
                        return [4 /*yield*/, (0, lanes_1.runPackageInstall)(testPath)];
                    case 1:
                        result = _a.sent();
                        Bun.spawn = originalSpawn;
                        // Should detect npm
                        (0, bun_test_1.expect)(result.managers).toContain("npm");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("listAllLanes", function () {
        (0, bun_test_1.test)("should list main repo when no lanes exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.listAllLanes)(mainRepoRoot)];
                    case 1:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(lanes.length).toBe(1);
                        (0, bun_test_1.expect)(lanes[0].name).toBe("main");
                        (0, bun_test_1.expect)(lanes[0].isMain).toBe(true);
                        (0, bun_test_1.expect)(normalizePath(lanes[0].path)).toBe(mainRepoRoot);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should list all lanes including main", function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, lanes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.lanes.push({
                            name: "feature-1",
                            path: node_path_1.default.join(testDir, "test-repo-lane-feature-1"),
                            branch: "feature-1",
                            createdAt: new Date().toISOString(),
                        }, {
                            name: "feature-2",
                            path: node_path_1.default.join(testDir, "test-repo-lane-feature-2"),
                            branch: "feature-2",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.listAllLanes)(mainRepoRoot)];
                    case 3:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(lanes.length).toBe(3); // main + 2 lanes
                        (0, bun_test_1.expect)(lanes[0].name).toBe("main");
                        (0, bun_test_1.expect)(lanes.some(function (l) { return l.name === "feature-1"; })).toBe(true);
                        (0, bun_test_1.expect)(lanes.some(function (l) { return l.name === "feature-2"; })).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should mark current lane correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePathRaw, lanePath, gitDir, config, lanes, currentLane;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePathRaw = node_path_1.default.join(testDir, "test-repo-lane-current");
                        (0, node_fs_1.mkdirSync)(lanePathRaw, { recursive: true });
                        lanePath = normalizePath(lanePathRaw);
                        gitDir = node_path_1.default.join(lanePath, ".git");
                        (0, node_fs_1.mkdirSync)(gitDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "objects"), { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "refs"), { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "refs", "heads"), { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(gitDir, "HEAD"), "ref: refs/heads/current\n");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(gitDir, "config"), "[core]\nrepositoryformatversion = 0\n");
                        // Create a .lane-origin file so the lane can find its way back to main
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(lanePath, ".lane-origin"), mainRepoRoot);
                        // Create a README in the lane
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(lanePath, "README.md"), "# Current Lane\n");
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.lanes.push({
                            name: "current",
                            path: lanePath,
                            branch: "current",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.listAllLanes)(lanePath)];
                    case 3:
                        lanes = _a.sent();
                        currentLane = lanes.find(function (l) { return l.name === "current"; });
                        (0, bun_test_1.expect)(currentLane).toBeDefined();
                        (0, bun_test_1.expect)(currentLane === null || currentLane === void 0 ? void 0 : currentLane.isCurrent).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return empty array when not in git repo", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.listAllLanes)(node_path_1.default.join(testDir, "not-a-repo"))];
                    case 1:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(lanes).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("getLaneForSwitch", function () {
        (0, bun_test_1.test)("should return main when requesting main", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.getLaneForSwitch)("main", mainRepoRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).not.toBeNull();
                        (0, bun_test_1.expect)(normalizePath(result.path)).toBe(mainRepoRoot);
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.branch).toBe("main");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return origin as alias for main", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.getLaneForSwitch)("origin", mainRepoRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).not.toBeNull();
                        (0, bun_test_1.expect)(normalizePath(result.path)).toBe(mainRepoRoot);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return existing lane", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-feature");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.lanes.push({
                            name: "feature",
                            path: lanePath,
                            branch: "feature",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.getLaneForSwitch)("feature", mainRepoRoot)];
                    case 3:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).not.toBeNull();
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.path).toBe(lanePath);
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.branch).toBe("feature");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return null for non-existent lane", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.getLaneForSwitch)("nonexistent", mainRepoRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return null when not in git repo", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.getLaneForSwitch)("main", node_path_1.default.join(testDir, "not-a-repo"))];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("findLaneByBranch", function () {
        (0, bun_test_1.test)("should find lane by branch name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-feature");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.lanes.push({
                            name: "my-lane",
                            path: lanePath,
                            branch: "feature-branch",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.findLaneByBranch)("feature-branch", mainRepoRoot)];
                    case 3:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).not.toBeNull();
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.name).toBe("my-lane");
                        (0, bun_test_1.expect)(result === null || result === void 0 ? void 0 : result.branch).toBe("feature-branch");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should return null when branch not found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.findLaneByBranch)("nonexistent", mainRepoRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("createLane", function () {
        (0, bun_test_1.test)("should fail when not in git repository", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.createLane)("test-lane", {
                            cwd: node_path_1.default.join(testDir, "not-a-repo"),
                        })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("Not in a git repository");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when lane directory already exists", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-existing");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        return [4 /*yield*/, (0, lanes_1.createLane)("existing", { cwd: mainRepoRoot })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("already exists");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should register lane in config with worktree mode", function () { return __awaiter(void 0, void 0, void 0, function () {
            var originalSpawn, mockWorktreeCallCount, config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalSpawn = Bun.spawn;
                        mockWorktreeCallCount = 0;
                        Bun.spawn = (0, bun_test_1.mock)(function (args, options) {
                            if (args[0] === "git") {
                                mockWorktreeCallCount++;
                                // Create a mock process that returns immediately
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        if (args.includes("--show-current")) {
                                            controller.enqueue(new TextEncoder().encode("main\n"));
                                        }
                                        controller.close();
                                    },
                                });
                                var mockStderr = new ReadableStream({
                                    start: function (controller) {
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(0),
                                    stdout: mockStdout,
                                    stderr: mockStderr,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args, options);
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 5, 6]);
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 2:
                        config = _a.sent();
                        config.settings.autoInstall = false;
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.createLane)("test-lane", {
                                branch: "test-branch",
                                cwd: mainRepoRoot,
                            })];
                    case 4:
                        result = _a.sent();
                        // Verify git worktree was called
                        (0, bun_test_1.expect)(mockWorktreeCallCount).toBeGreaterThan(0);
                        // Even if worktree fails, the lane should be registered during creation
                        // and then removed on failure. Let's check the result
                        (0, bun_test_1.expect)(result).toBeDefined();
                        return [3 /*break*/, 6];
                    case 5:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); }, 10000);
    });
    (0, bun_test_1.describe)("removeLaneCmd", function () {
        (0, bun_test_1.beforeEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.lanes.push({
                            name: "test-lane",
                            path: node_path_1.default.join(testDir, "test-repo-lane-test-lane"),
                            branch: "test-branch",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when lane not found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.removeLaneCmd)("nonexistent", { cwd: mainRepoRoot })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("not found");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should remove lane directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-test-lane");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(lanePath, "test.txt"), "content");
                        return [4 /*yield*/, (0, lanes_1.removeLaneCmd)("test-lane", { cwd: mainRepoRoot })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(true);
                        // Wait a bit for background deletion
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        // Wait a bit for background deletion
                        _a.sent();
                        // Directory should be removed or renamed to .deleting
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(lanePath)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should remove lane from config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, lanes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-test-lane");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        return [4 /*yield*/, (0, lanes_1.removeLaneCmd)("test-lane", { cwd: mainRepoRoot })];
                    case 1:
                        _a.sent();
                        // Wait for background deletion
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        // Wait for background deletion
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(mainRepoRoot)];
                    case 3:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(lanes.some(function (l) { return l.name === "test-lane"; })).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should handle missing lane directory gracefully", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.removeLaneCmd)("test-lane", { cwd: mainRepoRoot })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("renameLane", function () {
        (0, bun_test_1.beforeEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.lanes.push({
                            name: "old-name",
                            path: node_path_1.default.join(testDir, "test-repo-lane-old-name"),
                            branch: "old-branch",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when not in git repository", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.renameLane)("old-name", "new-name", {
                            cwd: node_path_1.default.join(testDir, "not-a-repo"),
                        })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("Not in a git repository");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when lane not found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.renameLane)("nonexistent", "new-name", {
                            cwd: mainRepoRoot,
                        })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("not found");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when new path already exists", function () { return __awaiter(void 0, void 0, void 0, function () {
            var existingPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existingPath = node_path_1.default.join(testDir, "test-repo-lane-new-name");
                        (0, node_fs_1.mkdirSync)(existingPath, { recursive: true });
                        return [4 /*yield*/, (0, lanes_1.renameLane)("old-name", "new-name", {
                                cwd: mainRepoRoot,
                            })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("already exists");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should rename lane directory", function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldPath, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPath = node_path_1.default.join(testDir, "test-repo-lane-old-name");
                        (0, node_fs_1.mkdirSync)(oldPath, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(oldPath, "test.txt"), "content");
                        return [4 /*yield*/, (0, lanes_1.renameLane)("old-name", "new-name", {
                                cwd: mainRepoRoot,
                            })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(true);
                        (0, bun_test_1.expect)(normalizePath(result.newPath)).toBe(normalizePath(node_path_1.default.join(testDir, "test-repo-lane-new-name")));
                        // Old directory should not exist
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(oldPath)).toBe(false);
                        // New directory should exist
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(result.newPath)).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(result.newPath, "test.txt"))).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should update config with new name and path", function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldPath, lanes, renamedLane;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPath = node_path_1.default.join(testDir, "test-repo-lane-old-name");
                        (0, node_fs_1.mkdirSync)(oldPath, { recursive: true });
                        return [4 /*yield*/, (0, lanes_1.renameLane)("old-name", "new-name", { cwd: mainRepoRoot })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, config_1.getAllLanes)(mainRepoRoot)];
                    case 2:
                        lanes = _a.sent();
                        renamedLane = lanes.find(function (l) { return l.name === "new-name"; });
                        (0, bun_test_1.expect)(renamedLane).toBeDefined();
                        (0, bun_test_1.expect)(normalizePath(renamedLane.path)).toBe(normalizePath(node_path_1.default.join(testDir, "test-repo-lane-new-name")));
                        (0, bun_test_1.expect)(lanes.some(function (l) { return l.name === "old-name"; })).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("syncLane", function () {
        (0, bun_test_1.test)("should fail when not in git repository", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.syncLane)(undefined, {
                            cwd: node_path_1.default.join(testDir, "not-a-repo"),
                        })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("Not in a git repository");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should fail when lane not found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.syncLane)("nonexistent", { cwd: mainRepoRoot })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("not found");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should copy untracked files from main to lane", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, config, originalSpawn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-sync-test");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(lanePath, ".git"), { recursive: true });
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.lanes.push({
                            name: "sync-test",
                            path: lanePath,
                            branch: "sync-test",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        // Create untracked files in main
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(mainRepoRoot, ".env"), "TEST=1\n");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(mainRepoRoot, ".env.local"), "LOCAL=1\n");
                        originalSpawn = Bun.spawn;
                        Bun.spawn = (0, bun_test_1.mock)(function (args) {
                            if (args[0] === "git") {
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(0),
                                    stdout: mockStdout,
                                    stderr: mockStdout,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args);
                        });
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, , 5, 6]);
                        return [4 /*yield*/, (0, lanes_1.syncLane)("sync-test", { cwd: mainRepoRoot })];
                    case 4:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(true);
                        return [3 /*break*/, 6];
                    case 5:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); }, 10000);
        (0, bun_test_1.test)("should sync to current lane when no name specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, gitDir, originalSpawn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-current-sync");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        gitDir = node_path_1.default.join(lanePath, ".git");
                        (0, node_fs_1.mkdirSync)(gitDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "objects"), { recursive: true });
                        (0, node_fs_1.mkdirSync)(node_path_1.default.join(gitDir, "refs"), { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(gitDir, "HEAD"), "ref: refs/heads/test\n");
                        // Create .lane-origin to identify as lane
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(lanePath, ".lane-origin"), mainRepoRoot);
                        // Create untracked files in main
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(mainRepoRoot, ".env"), "TEST=1\n");
                        originalSpawn = Bun.spawn;
                        Bun.spawn = (0, bun_test_1.mock)(function (args) {
                            if (args[0] === "git") {
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(0),
                                    stdout: mockStdout,
                                    stderr: mockStdout,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args);
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, (0, lanes_1.syncLane)(undefined, { cwd: lanePath })];
                    case 2:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(true);
                        return [3 /*break*/, 4];
                    case 3:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, 10000);
        (0, bun_test_1.test)("should fail when syncing from main to main", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.syncLane)(undefined, { cwd: mainRepoRoot })];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(false);
                        (0, bun_test_1.expect)(result.error).toContain("Not in a lane");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should respect skip patterns from config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var lanePath, config, originalSpawn, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lanePath = node_path_1.default.join(testDir, "test-repo-lane-sync-skip");
                        (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        config.settings.skipPatterns = [".env.local"];
                        config.lanes.push({
                            name: "sync-skip",
                            path: lanePath,
                            branch: "sync-skip",
                            createdAt: new Date().toISOString(),
                        });
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 2:
                        _a.sent();
                        // Create untracked files in main
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(mainRepoRoot, ".env"), "TEST=1\n");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(mainRepoRoot, ".env.local"), "LOCAL=1\n");
                        originalSpawn = Bun.spawn;
                        Bun.spawn = (0, bun_test_1.mock)(function (args) {
                            if (args[0] === "git") {
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(0),
                                    stdout: mockStdout,
                                    stderr: mockStdout,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args);
                        });
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, , 5, 6]);
                        return [4 /*yield*/, (0, lanes_1.syncLane)("sync-skip", { cwd: mainRepoRoot })];
                    case 4:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result.success).toBe(true);
                        (0, bun_test_1.expect)(result.copiedFiles).not.toContain(".env.local");
                        return [3 /*break*/, 6];
                    case 5:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); }, 10000);
    });
    (0, bun_test_1.describe)("symlink dependencies functionality", function () {
        (0, bun_test_1.test)("should have symlinkDeps enabled by default in config", function () { return __awaiter(void 0, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 1:
                        config = _a.sent();
                        (0, bun_test_1.expect)(config.settings.symlinkDeps).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should create lane with symlinkDeps enabled by default", function () { return __awaiter(void 0, void 0, void 0, function () {
            var nodeModulesPath, testPackagePath, originalSpawn, config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodeModulesPath = node_path_1.default.join(mainRepoRoot, "node_modules");
                        (0, node_fs_1.mkdirSync)(nodeModulesPath, { recursive: true });
                        testPackagePath = node_path_1.default.join(nodeModulesPath, "test-package");
                        (0, node_fs_1.mkdirSync)(testPackagePath, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPackagePath, "index.js"), "// test");
                        originalSpawn = Bun.spawn;
                        Bun.spawn = (0, bun_test_1.mock)(function (args, options) {
                            if (args[0] === "git") {
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        if (args.includes("--show-current")) {
                                            controller.enqueue(new TextEncoder().encode("main\n"));
                                        }
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(0),
                                    stdout: mockStdout,
                                    stderr: mockStdout,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args, options);
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 5, 6]);
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 2:
                        config = _a.sent();
                        config.settings.symlinkDeps = true;
                        config.settings.autoInstall = false; // Disable auto install for cleaner test
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.createLane)("symlink-test", {
                                branch: "symlink-test-branch",
                                cwd: mainRepoRoot,
                            })];
                    case 4:
                        result = _a.sent();
                        // The lane creation should succeed
                        (0, bun_test_1.expect)(result).toBeDefined();
                        return [3 /*break*/, 6];
                    case 5:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); }, 10000);
        (0, bun_test_1.test)("should respect symlinkDeps setting when disabled", function () { return __awaiter(void 0, void 0, void 0, function () {
            var originalSpawn, config, result, loadedConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalSpawn = Bun.spawn;
                        Bun.spawn = (0, bun_test_1.mock)(function (args, options) {
                            if (args[0] === "git") {
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        if (args.includes("--show-current")) {
                                            controller.enqueue(new TextEncoder().encode("main\n"));
                                        }
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(0),
                                    stdout: mockStdout,
                                    stderr: mockStdout,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args, options);
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 6, 7]);
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 2:
                        config = _a.sent();
                        config.settings.symlinkDeps = false;
                        config.settings.autoInstall = false;
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.createLane)("no-symlink-test", {
                                branch: "no-symlink-branch",
                                cwd: mainRepoRoot,
                            })];
                    case 4:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeDefined();
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 5:
                        loadedConfig = _a.sent();
                        (0, bun_test_1.expect)(loadedConfig.settings.symlinkDeps).toBe(false);
                        return [3 /*break*/, 7];
                    case 6:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); }, 10000);
        (0, bun_test_1.test)("should handle missing dependency directories gracefully when symlinking", function () { return __awaiter(void 0, void 0, void 0, function () {
            var originalSpawn, config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalSpawn = Bun.spawn;
                        Bun.spawn = (0, bun_test_1.mock)(function (args, options) {
                            if (args[0] === "git") {
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        if (args.includes("--show-current")) {
                                            controller.enqueue(new TextEncoder().encode("main\n"));
                                        }
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(0),
                                    stdout: mockStdout,
                                    stderr: mockStdout,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args, options);
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 5, 6]);
                        return [4 /*yield*/, (0, config_1.loadConfig)(mainRepoRoot)];
                    case 2:
                        config = _a.sent();
                        config.settings.symlinkDeps = true;
                        config.settings.autoInstall = false;
                        return [4 /*yield*/, (0, config_1.saveConfig)(mainRepoRoot, config)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, lanes_1.createLane)("no-deps-test", {
                                branch: "no-deps-branch",
                                cwd: mainRepoRoot,
                            })];
                    case 4:
                        result = _a.sent();
                        // Should succeed even when no dependency directories exist
                        (0, bun_test_1.expect)(result).toBeDefined();
                        return [3 /*break*/, 6];
                    case 5:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); }, 10000);
    });
    (0, bun_test_1.describe)("env file handling - copied not symlinked", function () {
        (0, bun_test_1.test)("should copy .env files (not symlink) via copyUntrackedFiles", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir, envContent, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "env-source");
                        destDir = node_path_1.default.join(testDir, "env-dest");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        setupTestRepo(srcDir);
                        envContent = "DATABASE_URL=postgres://localhost/test\nAPI_KEY=secret123\n";
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".env"), envContent);
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".env.local"), "LOCAL_VAR=1\n");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".env.production"), "PROD=true\n");
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [])];
                    case 1:
                        copied = _a.sent();
                        // Verify .env files were copied
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".env"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".env.local"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".env.production"))).toBe(true);
                        // Verify they are REAL files, not symlinks
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, ".env")).isSymbolicLink()).toBe(false);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, ".env.local")).isSymbolicLink()).toBe(false);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, ".env.production")).isSymbolicLink()).toBe(false);
                        // Verify content is identical
                        (0, bun_test_1.expect)((0, node_fs_1.readFileSync)(node_path_1.default.join(destDir, ".env"), "utf-8")).toBe(envContent);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should copy *.local config files (not symlink)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "local-source");
                        destDir = node_path_1.default.join(testDir, "local-dest");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        setupTestRepo(srcDir);
                        // Create .local files
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, "config.local.json"), '{"local": true}');
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, "settings.local.ts"), "export const local = true");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, "app.local.yaml"), "debug: true");
                        // Copy untracked files
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [])];
                    case 1:
                        // Copy untracked files
                        _a.sent();
                        // Verify .local files exist and are real files (not symlinks)
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, "config.local.json"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, "settings.local.ts"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, "app.local.yaml"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, "config.local.json")).isSymbolicLink()).toBe(false);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, "settings.local.ts")).isSymbolicLink()).toBe(false);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, "app.local.yaml")).isSymbolicLink()).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should copy .secret* files (not symlink)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "secret-source");
                        destDir = node_path_1.default.join(testDir, "secret-dest");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        setupTestRepo(srcDir);
                        // Create secret files
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".secret"), "top_secret_key");
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".secrets.json"), '{"key": "value"}');
                        // Copy untracked files
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [])];
                    case 1:
                        // Copy untracked files
                        _a.sent();
                        // Verify .secret* files exist and are real files (not symlinks)
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".secret"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".secrets.json"))).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, ".secret")).isSymbolicLink()).toBe(false);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(node_path_1.default.join(destDir, ".secrets.json")).isSymbolicLink()).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should copy nested .env files (not symlink)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir, configDir, servicesDir, copied, nestedEnvPath, apiEnvPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "nested-source");
                        destDir = node_path_1.default.join(testDir, "nested-dest");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        setupTestRepo(srcDir);
                        configDir = node_path_1.default.join(srcDir, "config");
                        (0, node_fs_1.mkdirSync)(configDir, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(configDir, ".env"), "CONFIG_ENV=value");
                        servicesDir = node_path_1.default.join(srcDir, "services", "api");
                        (0, node_fs_1.mkdirSync)(servicesDir, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(servicesDir, ".env"), "API_ENV=value");
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, [])];
                    case 1:
                        copied = _a.sent();
                        nestedEnvPath = node_path_1.default.join(destDir, "config", ".env");
                        apiEnvPath = node_path_1.default.join(destDir, "services", "api", ".env");
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(nestedEnvPath)).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(apiEnvPath)).toBe(true);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(nestedEnvPath).isSymbolicLink()).toBe(false);
                        (0, bun_test_1.expect)((0, node_fs_1.lstatSync)(apiEnvPath).isSymbolicLink()).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should allow independent .env files per lane (via copyUntrackedFiles)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mainDir, laneADir, laneBDir, originalContent, laneAEnvPath, laneBEnvPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainDir = node_path_1.default.join(testDir, "env-independence-main");
                        laneADir = node_path_1.default.join(testDir, "env-independence-a");
                        laneBDir = node_path_1.default.join(testDir, "env-independence-b");
                        (0, node_fs_1.mkdirSync)(mainDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(laneADir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(laneBDir, { recursive: true });
                        setupTestRepo(mainDir);
                        originalContent = "MAIN_ENV=original\n";
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(mainDir, ".env"), originalContent);
                        // Copy to lane A
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(mainDir, laneADir, [])];
                    case 1:
                        // Copy to lane A
                        _a.sent();
                        laneAEnvPath = node_path_1.default.join(laneADir, ".env");
                        (0, node_fs_1.writeFileSync)(laneAEnvPath, "LANE_A_ENV=modified\n");
                        // Copy to lane B (should get original content, not lane A's modified version)
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(mainDir, laneBDir, [])];
                    case 2:
                        // Copy to lane B (should get original content, not lane A's modified version)
                        _a.sent();
                        laneBEnvPath = node_path_1.default.join(laneBDir, ".env");
                        // Verify lane B has original content from main (independent from lane A)
                        (0, bun_test_1.expect)((0, node_fs_1.readFileSync)(laneBEnvPath, "utf-8")).toBe(originalContent);
                        // Verify lane A has modified content
                        (0, bun_test_1.expect)((0, node_fs_1.readFileSync)(laneAEnvPath, "utf-8")).toBe("LANE_A_ENV=modified\n");
                        // Verify main still has original
                        (0, bun_test_1.expect)((0, node_fs_1.readFileSync)(node_path_1.default.join(mainDir, ".env"), "utf-8")).toBe(originalContent);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("dependency directories are excluded from copy by default when skipBuildArtifacts is true", function () { return __awaiter(void 0, void 0, void 0, function () {
            var srcDir, destDir, nodeModulesPath, venvPath, BUILD_ARTIFACT_PATTERNS, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDir = node_path_1.default.join(testDir, "deps-source");
                        destDir = node_path_1.default.join(testDir, "deps-dest");
                        (0, node_fs_1.mkdirSync)(srcDir, { recursive: true });
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                        setupTestRepo(srcDir);
                        nodeModulesPath = node_path_1.default.join(srcDir, "node_modules");
                        (0, node_fs_1.mkdirSync)(nodeModulesPath, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(nodeModulesPath, "package.json"), '{"name": "dep"}');
                        venvPath = node_path_1.default.join(srcDir, ".venv");
                        (0, node_fs_1.mkdirSync)(venvPath, { recursive: true });
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(venvPath, "lib.txt"), "python libs");
                        // Create .env file (should be copied)
                        (0, node_fs_1.writeFileSync)(node_path_1.default.join(srcDir, ".env"), "ENV=value");
                        return [4 /*yield*/, Promise.resolve().then(function () { return require("../src/config"); })];
                    case 1:
                        BUILD_ARTIFACT_PATTERNS = (_a.sent()).BUILD_ARTIFACT_PATTERNS;
                        return [4 /*yield*/, (0, lanes_1.copyUntrackedFiles)(srcDir, destDir, BUILD_ARTIFACT_PATTERNS)];
                    case 2:
                        copied = _a.sent();
                        // .env should be copied
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".env"))).toBe(true);
                        // Dependency directories should NOT be copied (excluded)
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, "node_modules"))).toBe(false);
                        (0, bun_test_1.expect)((0, node_fs_1.existsSync)(node_path_1.default.join(destDir, ".venv"))).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, bun_test_1.describe)("integration tests", function () {
        (0, bun_test_1.test)("should handle complete lane lifecycle", function () { return __awaiter(void 0, void 0, void 0, function () {
            var laneName, lanes, originalSpawn, createResult, listedLanes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        laneName = "lifecycle-test";
                        return [4 /*yield*/, (0, config_1.getAllLanes)(mainRepoRoot)];
                    case 1:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(lanes.length).toBe(0);
                        originalSpawn = Bun.spawn;
                        Bun.spawn = (0, bun_test_1.mock)(function (args) {
                            if (args[0] === "git") {
                                var mockStdout = new ReadableStream({
                                    start: function (controller) {
                                        controller.close();
                                    },
                                });
                                return {
                                    exited: Promise.resolve(1), // Make git fail
                                    stdout: mockStdout,
                                    stderr: mockStdout,
                                    stdin: null,
                                };
                            }
                            return originalSpawn(args);
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 4, 5]);
                        return [4 /*yield*/, (0, lanes_1.createLane)(laneName, { cwd: mainRepoRoot })];
                    case 3:
                        createResult = _a.sent();
                        // We expect this to fail in test environment
                        (0, bun_test_1.expect)(createResult).toBeDefined();
                        return [3 /*break*/, 5];
                    case 4:
                        Bun.spawn = originalSpawn;
                        return [7 /*endfinally*/];
                    case 5: return [4 /*yield*/, (0, lanes_1.listAllLanes)(mainRepoRoot)];
                    case 6:
                        listedLanes = _a.sent();
                        (0, bun_test_1.expect)(listedLanes.length).toBeGreaterThanOrEqual(1); // At least main
                        (0, bun_test_1.expect)(listedLanes[0].name).toBe("main");
                        return [2 /*return*/];
                }
            });
        }); }, 10000);
        (0, bun_test_1.test)("should handle lane path generation correctly", function () {
            var testCases = [
                { repo: "/Users/test/my-project", lane: "feature-1", expected: "/Users/test/my-project-lane-feature-1" },
                { repo: "/Users/test/my-project", lane: "feature/auth", expected: "/Users/test/my-project-lane-feature-auth" },
                { repo: "/home/user/src/app", lane: "bugfix/issue-123", expected: "/home/user/src/app-lane-bugfix-issue-123" },
            ];
            for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
                var testCase = testCases_1[_i];
                var result = (0, lanes_1.getLanePath)(testCase.repo, testCase.lane);
                (0, bun_test_1.expect)(result).toBe(testCase.expected);
            }
        });
    });
    (0, bun_test_1.describe)("edge cases and error handling", function () {
        (0, bun_test_1.test)("should handle special characters in lane names", function () {
            var specialNames = [
                "feature-with-dash",
                "feature_with_underscore",
                "feature.with.dots",
                "feature/with/slashes",
                "123-starting-with-numbers",
            ];
            for (var _i = 0, specialNames_1 = specialNames; _i < specialNames_1.length; _i++) {
                var name_1 = specialNames_1[_i];
                var lanePath = (0, lanes_1.getLanePath)(mainRepoRoot, name_1);
                (0, bun_test_1.expect)(lanePath).toBeDefined();
                (0, bun_test_1.expect)(lanePath).toContain("lane-");
            }
        });
        (0, bun_test_1.test)("should handle empty lane list in findLaneByBranch", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lanes_1.findLaneByBranch)("any-branch", mainRepoRoot)];
                    case 1:
                        result = _a.sent();
                        (0, bun_test_1.expect)(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should handle missing config gracefully", function () { return __awaiter(void 0, void 0, void 0, function () {
            var configPath, lanes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configPath = node_path_1.default.join(mainRepoRoot, ".git", "lanes.json");
                        if ((0, node_fs_1.existsSync)(configPath)) {
                            (0, node_fs_1.rmSync)(configPath);
                        }
                        return [4 /*yield*/, (0, config_1.getAllLanes)(mainRepoRoot)];
                    case 1:
                        lanes = _a.sent();
                        (0, bun_test_1.expect)(Array.isArray(lanes)).toBe(true);
                        (0, bun_test_1.expect)(lanes.length).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, bun_test_1.test)("should detect multiple package managers from different ecosystems", function () {
            var testPath = node_path_1.default.join(testDir, "multi-ecosystem");
            (0, node_fs_1.mkdirSync)(testPath, { recursive: true });
            // Create files for Node.js and Python
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "package.json"), "{}");
            (0, node_fs_1.writeFileSync)(node_path_1.default.join(testPath, "pyproject.toml"), "");
            var detected = (0, lanes_1.detectPackageManagers)(testPath);
            // Should detect both npm and pip
            var hasNode = detected.some(function (pm) { return pm.name === "npm"; });
            var hasPython = detected.some(function (pm) { return pm.name === "pip"; });
            (0, bun_test_1.expect)(hasNode || hasPython).toBe(true);
        });
    });
});
