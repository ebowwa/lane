"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.getMainRepoRoot = getMainRepoRoot;
exports.getLanePath = getLanePath;
exports.copyUntrackedFiles = copyUntrackedFiles;
exports.detectPackageManagers = detectPackageManagers;
exports.runPackageInstall = runPackageInstall;
exports.createLane = createLane;
exports.removeLaneCmd = removeLaneCmd;
exports.getLaneForSwitch = getLaneForSwitch;
exports.listAllLanes = listAllLanes;
exports.findLaneByBranch = findLaneByBranch;
exports.syncLane = syncLane;
exports.renameLane = renameLane;
exports.smartLane = smartLane;
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var git_js_1 = require("./git.js");
var config_js_1 = require("./config.js");
/**
 * Get the main repo root, even if we're in a worktree or full-copy lane
 */
function getMainRepoRoot() {
    return __awaiter(this, arguments, void 0, function (cwd) {
        var repo, originFile, mainRoot;
        if (cwd === void 0) { cwd = process.cwd(); }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, git_js_1.isWorktree)(cwd)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, git_js_1.getMainWorktree)(cwd)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, (0, git_js_1.findGitRepo)(cwd)];
                case 4:
                    repo = _a.sent();
                    if (!repo)
                        return [2 /*return*/, null];
                    originFile = node_path_1.default.join(repo.root, ".lane-origin");
                    if ((0, node_fs_1.existsSync)(originFile)) {
                        try {
                            mainRoot = (0, node_fs_1.readFileSync)(originFile, "utf-8").trim();
                            if ((0, node_fs_1.existsSync)(mainRoot)) {
                                return [2 /*return*/, mainRoot];
                            }
                        }
                        catch (_b) { }
                    }
                    return [2 /*return*/, repo.root];
            }
        });
    });
}
/**
 * Generate the lane directory path
 * Replaces / in lane names with - for valid directory names
 */
function getLanePath(mainRepoRoot, laneName) {
    var repoName = node_path_1.default.basename(mainRepoRoot);
    var parentDir = node_path_1.default.dirname(mainRepoRoot);
    // Replace / with - for directory name (git branches can have /)
    var safeName = laneName.replace(/\//g, "-");
    return node_path_1.default.join(parentDir, "".concat(repoName, "-lane-").concat(safeName));
}
/**
 * Copy a file or directory recursively, skipping patterns
 */
function copyRecursive(src, dest, skipPatterns) {
    var basename = node_path_1.default.basename(src);
    // Check if this path should be skipped
    if (skipPatterns.some(function (pattern) { return basename === pattern; })) {
        return;
    }
    var stat = (0, node_fs_1.statSync)(src);
    if (stat.isDirectory()) {
        if (!(0, node_fs_1.existsSync)(dest)) {
            (0, node_fs_1.mkdirSync)(dest, { recursive: true });
        }
        var entries = (0, node_fs_1.readdirSync)(src);
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            copyRecursive(node_path_1.default.join(src, entry), node_path_1.default.join(dest, entry), skipPatterns);
        }
    }
    else {
        var destDir = node_path_1.default.dirname(dest);
        if (!(0, node_fs_1.existsSync)(destDir)) {
            (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
        }
        (0, node_fs_1.copyFileSync)(src, dest);
    }
}
/**
 * Copy untracked files from source to destination
 */
function copyUntrackedFiles(srcRoot, destRoot, skipPatterns) {
    return __awaiter(this, void 0, void 0, function () {
        var untrackedFiles, copiedFiles, _i, untrackedFiles_1, file, srcPath, destPath, pathParts, shouldSkip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, git_js_1.getUntrackedFiles)(srcRoot)];
                case 1:
                    untrackedFiles = _a.sent();
                    copiedFiles = [];
                    for (_i = 0, untrackedFiles_1 = untrackedFiles; _i < untrackedFiles_1.length; _i++) {
                        file = untrackedFiles_1[_i];
                        srcPath = node_path_1.default.join(srcRoot, file);
                        destPath = node_path_1.default.join(destRoot, file);
                        pathParts = file.split(node_path_1.default.sep);
                        shouldSkip = pathParts.some(function (part) { return skipPatterns.includes(part); });
                        if (shouldSkip) {
                            continue;
                        }
                        if ((0, node_fs_1.existsSync)(srcPath)) {
                            try {
                                copyRecursive(srcPath, destPath, skipPatterns);
                                copiedFiles.push(file);
                            }
                            catch (e) {
                                // Ignore copy errors for individual files
                            }
                        }
                    }
                    return [2 /*return*/, copiedFiles];
            }
        });
    });
}
var PACKAGE_MANAGERS = [
    // Node.js - order matters (more specific lockfiles first)
    { name: "bun", detectFiles: ["bun.lockb"], installCmd: "bun install" },
    { name: "pnpm", detectFiles: ["pnpm-lock.yaml"], installCmd: "pnpm install" },
    { name: "yarn", detectFiles: ["yarn.lock"], installCmd: "yarn install" },
    { name: "npm", detectFiles: ["package-lock.json"], installCmd: "npm install" },
    // Fallback for package.json without lockfile
    { name: "npm", detectFiles: ["package.json"], installCmd: "npm install" },
    // Python
    { name: "poetry", detectFiles: ["poetry.lock"], installCmd: "poetry install" },
    { name: "pipenv", detectFiles: ["Pipfile.lock"], installCmd: "pipenv install" },
    { name: "uv", detectFiles: ["uv.lock"], installCmd: "uv sync" },
    { name: "pip", detectFiles: ["requirements.txt"], installCmd: "pip install -r requirements.txt" },
    { name: "pip", detectFiles: ["pyproject.toml"], installCmd: "pip install -e ." },
    // Ruby
    { name: "bundler", detectFiles: ["Gemfile.lock", "Gemfile"], installCmd: "bundle install" },
    // Rust
    { name: "cargo", detectFiles: ["Cargo.lock", "Cargo.toml"], installCmd: "cargo build" },
    // Go
    { name: "go", detectFiles: ["go.sum", "go.mod"], installCmd: "go mod download" },
    // PHP
    { name: "composer", detectFiles: ["composer.lock", "composer.json"], installCmd: "composer install" },
    // Elixir
    { name: "mix", detectFiles: ["mix.lock"], installCmd: "mix deps.get" },
    // .NET
    { name: "dotnet", detectFiles: ["packages.lock.json"], installCmd: "dotnet restore" },
    { name: "nuget", detectFiles: ["packages.config"], installCmd: "nuget restore" },
    // Java
    { name: "gradle", detectFiles: ["gradle.lockfile", "build.gradle", "build.gradle.kts"], installCmd: "./gradlew build --no-daemon" },
    { name: "maven", detectFiles: ["pom.xml"], installCmd: "mvn install -DskipTests" },
    // Swift
    { name: "swift", detectFiles: ["Package.resolved", "Package.swift"], installCmd: "swift package resolve" },
];
/**
 * Detect package managers in use - only one per ecosystem
 */
function detectPackageManagers(cwd) {
    var detected = [];
    var seenEcosystems = new Set();
    // Group managers by ecosystem
    var ecosystems = {
        node: ["bun", "pnpm", "yarn", "npm"],
        python: ["poetry", "pipenv", "uv", "pip"],
        ruby: ["bundler"],
        rust: ["cargo"],
        go: ["go"],
        php: ["composer"],
        elixir: ["mix"],
        dotnet: ["dotnet", "nuget"],
        java: ["gradle", "maven"],
        swift: ["swift"],
    };
    // Find ecosystem for a manager
    var getEcosystem = function (name) {
        for (var _i = 0, _a = Object.entries(ecosystems); _i < _a.length; _i++) {
            var _b = _a[_i], eco = _b[0], managers = _b[1];
            if (managers.includes(name))
                return eco;
        }
        return null;
    };
    for (var _i = 0, PACKAGE_MANAGERS_1 = PACKAGE_MANAGERS; _i < PACKAGE_MANAGERS_1.length; _i++) {
        var pm = PACKAGE_MANAGERS_1[_i];
        var ecosystem = getEcosystem(pm.name);
        // Skip if we already have a manager for this ecosystem
        if (ecosystem && seenEcosystems.has(ecosystem))
            continue;
        var hasFiles = pm.detectFiles.some(function (file) {
            return (0, node_fs_1.existsSync)(node_path_1.default.join(cwd, file));
        });
        if (hasFiles) {
            detected.push(pm);
            if (ecosystem)
                seenEcosystems.add(ecosystem);
        }
    }
    return detected;
}
/**
 * Create symlink from lane to main repo's dependency directory
 * Handles platform differences (junction on Windows, symlink on Unix)
 */
function createDependencySymlink(source, target) {
    return __awaiter(this, void 0, void 0, function () {
        var parentDir, isWindows, symlinkType, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Check if source exists
                    if (!(0, node_fs_1.existsSync)(source)) {
                        return [2 /*return*/, { success: false, error: "Source does not exist: ".concat(source) }];
                    }
                    // Check if target already exists (could be a symlink from a previous attempt)
                    if ((0, node_fs_1.existsSync)(target)) {
                        try {
                            // Remove it so we can recreate
                            (0, node_fs_1.rmSync)(target, { recursive: true, force: true });
                        }
                        catch (e) {
                            return [2 /*return*/, { success: false, error: "Target exists and cannot be removed: ".concat(target) }];
                        }
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    parentDir = node_path_1.default.dirname(target);
                    if (!(0, node_fs_1.existsSync)(parentDir)) {
                        (0, node_fs_1.mkdirSync)(parentDir, { recursive: true });
                    }
                    isWindows = process.platform === "win32";
                    symlinkType = isWindows ? "junction" : "dir";
                    return [4 /*yield*/, Bun.$(templateObject_1 || (templateObject_1 = __makeTemplateObject(["ln -s \"", "\" \"", "\""], ["ln -s \"", "\" \"", "\""])), source, target).quiet()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { success: true }];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, { success: false, error: e_1.message || String(e_1) }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Create symlinks for dependency directories from main repo to lane
 */
function symlinkDependencies(mainRoot, lanePath) {
    return __awaiter(this, void 0, void 0, function () {
        var dependencyDirs, symlinked, errors, _i, dependencyDirs_1, dir, source, target, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dependencyDirs = [
                        "node_modules",
                        ".venv",
                        "venv",
                        "vendor",
                        "target",
                        ".next",
                        ".nuxt",
                        ".turbo",
                        "Pods",
                    ];
                    symlinked = [];
                    errors = [];
                    _i = 0, dependencyDirs_1 = dependencyDirs;
                    _a.label = 1;
                case 1:
                    if (!(_i < dependencyDirs_1.length)) return [3 /*break*/, 4];
                    dir = dependencyDirs_1[_i];
                    source = node_path_1.default.join(mainRoot, dir);
                    target = node_path_1.default.join(lanePath, dir);
                    return [4 /*yield*/, createDependencySymlink(source, target)];
                case 2:
                    result = _a.sent();
                    if (result.success) {
                        symlinked.push(dir);
                    }
                    else if (result.error) {
                        errors.push("".concat(dir, ": ").concat(result.error));
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, { success: symlinked.length > 0, symlinked: symlinked, errors: errors }];
            }
        });
    });
}
/**
 * Detect and run package manager install
 */
function runPackageInstall(cwd) {
    return __awaiter(this, void 0, void 0, function () {
        var managers, ranManagers, errors, _i, managers_1, pm, _a, cmd, args, proc, exitCode, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    managers = detectPackageManagers(cwd);
                    ranManagers = [];
                    errors = [];
                    _i = 0, managers_1 = managers;
                    _b.label = 1;
                case 1:
                    if (!(_i < managers_1.length)) return [3 /*break*/, 6];
                    pm = managers_1[_i];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    console.log("Running ".concat(pm.name, ": ").concat(pm.installCmd));
                    _a = pm.installCmd.split(" "), cmd = _a[0], args = _a.slice(1);
                    proc = Bun.spawn(__spreadArray([cmd], args, true), {
                        cwd: cwd,
                        stdout: "inherit",
                        stderr: "inherit",
                        stdin: "inherit",
                    });
                    return [4 /*yield*/, proc.exited];
                case 3:
                    exitCode = _b.sent();
                    if (exitCode !== 0) {
                        throw new Error("Process exited with code ".concat(exitCode));
                    }
                    ranManagers.push(pm.name);
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _b.sent();
                    errors.push("".concat(pm.name, ": ").concat(e_2.message));
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, { ran: ranManagers.length > 0, managers: ranManagers, errors: errors }];
            }
        });
    });
}
/**
 * Create a new lane using git worktree + copy untracked files, or full copy
 */
function createLane(laneName_1) {
    return __awaiter(this, arguments, void 0, function (laneName, options) {
        var cwd, mainRoot, config, copyMode, lanePath, branchName, worktrees, branchInUse, _a, lane, skipArtifacts, excludePatterns, alwaysExclude, allExcludes, excludeArgs, startTime_1, spinner_1, i_1, lastSize_1, interval, rsync, exitCode, worktreesPath, elapsed, symlinkResult, _i, _b, err, _c, _d, err, packageManagers, _e, packageManagers_1, pm, _f, cmd, args, proc, exitCode_1, _g, packageManagers, _h, packageManagers_2, pm, _j, cmd, args, proc, exitCode_2, _k, e_3, branchAlreadyExists, worktreeResult, alwaysSkip, skipPatterns, buildPatterns, allExcludes, copyStartTime, topLevelItems, itemsToCopy, _l, topLevelItems_1, item, ignoredText, _m, trackedText, tracked, _o, _p, itemsToCopy_1, item, src, dest, e_4, elapsed, configPatterns, findPattern, proc, nestedConfigs, copiedNested, _q, nestedConfigs_1, file, src, dest, destDir, cpProc, _r, _s, e_5, symlinkResult, _t, _u, err, _v, _w, err, packageManagers, _x, packageManagers_3, pm, _y, cmd, args, proc, exitCode, err_1, packageManagers, succeeded, failed, _z, packageManagers_4, pm, _0, cmd, args, proc, exitCode, err_2;
        var _this = this;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_1) {
            switch (_1.label) {
                case 0:
                    cwd = options.cwd || process.cwd();
                    return [4 /*yield*/, getMainRepoRoot(cwd)];
                case 1:
                    mainRoot = _1.sent();
                    if (!mainRoot) {
                        return [2 /*return*/, { success: false, error: "Not in a git repository" }];
                    }
                    return [4 /*yield*/, (0, config_js_1.loadConfig)(mainRoot)];
                case 2:
                    config = _1.sent();
                    copyMode = config.settings.copyMode;
                    lanePath = getLanePath(mainRoot, laneName);
                    branchName = options.branch || laneName;
                    // Lane creation uses 4 config settings:
                    //
                    // 1. copyMode: "worktree" | "full"
                    //    - worktree: Uses git worktree (shares .git objects, lightweight)
                    //    - full: Complete rsync copy (isolated but uses more disk space)
                    //
                    // 2. skipBuildArtifacts: boolean (applies to BOTH modes)
                    //    - full mode: Excludes dist/, node_modules/.cache/ from rsync
                    //    - worktree mode: Excludes those patterns when copying untracked files
                    //
                    // 3. symlinkDeps: boolean (applies to BOTH modes)
                    //    - After lane creation, symlinks node_modules from main repo
                    //    - Saves 500MB-2GB per lane
                    //
                    // 4. autoInstall: boolean (applies to BOTH modes)
                    //    - If symlinkDeps fails or is disabled, runs package install
                    //    - Uses detected package manager (bun, npm, pnpm, yarn, etc.)
                    // Check if lane already exists
                    if ((0, node_fs_1.existsSync)(lanePath)) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Lane directory already exists: ".concat(lanePath),
                            }];
                    }
                    _1.label = 3;
                case 3:
                    _1.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, Bun.$(templateObject_2 || (templateObject_2 = __makeTemplateObject(["git worktree list --porcelain"], ["git worktree list --porcelain"]))).cwd(mainRoot).quiet().text()];
                case 4:
                    worktrees = _1.sent();
                    branchInUse = worktrees.includes("branch refs/heads/".concat(branchName));
                    if (branchInUse) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Branch \"".concat(branchName, "\" is already used by another worktree. Use a different name or remove the existing worktree."),
                            }];
                    }
                    return [3 /*break*/, 6];
                case 5:
                    _a = _1.sent();
                    return [3 /*break*/, 6];
                case 6:
                    process.stderr.write("\nCreating lane ".concat(laneName, "\n"));
                    process.stderr.write("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
                    process.stderr.write("Mode: ".concat(copyMode === "full" ? "Full copy" : "Worktree", "\n"));
                    // Phase 1: Register lane
                    process.stderr.write("\u25E6 Registering lane...");
                    lane = {
                        name: laneName,
                        path: lanePath,
                        branch: branchName,
                    };
                    return [4 /*yield*/, (0, config_js_1.addLane)(mainRoot, lane)];
                case 7:
                    _1.sent();
                    process.stderr.write("\r\u2713 Registered lane".padEnd(40) + "\n");
                    if (!(copyMode === "full")) return [3 /*break*/, 29];
                    skipArtifacts = config.settings.skipBuildArtifacts;
                    excludePatterns = skipArtifacts ? config_js_1.BUILD_ARTIFACT_PATTERNS : [];
                    alwaysExclude = [".DS_Store", "Thumbs.db"];
                    allExcludes = __spreadArray(__spreadArray([], excludePatterns, true), alwaysExclude, true);
                    excludeArgs = allExcludes.flatMap(function (p) { return ["--exclude", p]; });
                    process.stderr.write("\u25E6 Copying repository".concat(skipArtifacts ? " (skipping build artifacts)" : "", "...\n"));
                    startTime_1 = Date.now();
                    _1.label = 8;
                case 8:
                    _1.trys.push([8, 26, , 28]);
                    (0, node_fs_1.mkdirSync)(lanePath, { recursive: true });
                    spinner_1 = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
                    i_1 = 0;
                    lastSize_1 = 0;
                    interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var elapsed, destDu, destSizeKB, destMB, speed, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    elapsed = ((Date.now() - startTime_1) / 1000).toFixed(0);
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, Bun.$(templateObject_3 || (templateObject_3 = __makeTemplateObject(["du -sk \"", "\""], ["du -sk \"", "\""])), lanePath).quiet().text()];
                                case 2:
                                    destDu = _b.sent();
                                    destSizeKB = parseInt(destDu.split("\t")[0], 10) || 0;
                                    destMB = (destSizeKB / 1024).toFixed(0);
                                    speed = destSizeKB > lastSize_1 ? "".concat(((destSizeKB - lastSize_1) / 1024 / 0.5).toFixed(0), " MB/s") : "";
                                    lastSize_1 = destSizeKB;
                                    process.stderr.write("\r  ".concat(spinner_1[i_1++ % spinner_1.length], " Copying... ").concat(destMB, " MB ").concat(speed, " (").concat(elapsed, "s)").padEnd(60));
                                    return [3 /*break*/, 4];
                                case 3:
                                    _a = _b.sent();
                                    process.stderr.write("\r  ".concat(spinner_1[i_1++ % spinner_1.length], " Copying... ").concat(elapsed, "s"));
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }, 500);
                    rsync = Bun.spawn(__spreadArray(__spreadArray([
                        "rsync",
                        "-a",
                        "--delete"
                    ], excludeArgs, true), [
                        "".concat(mainRoot, "/"),
                        "".concat(lanePath, "/"),
                    ], false), {
                        stdout: "ignore",
                        stderr: "ignore",
                    });
                    return [4 /*yield*/, rsync.exited];
                case 9:
                    exitCode = _1.sent();
                    if (exitCode !== 0) {
                        throw new Error("rsync failed with code ".concat(exitCode));
                    }
                    clearInterval(interval);
                    worktreesPath = node_path_1.default.join(lanePath, ".git", "worktrees");
                    if ((0, node_fs_1.existsSync)(worktreesPath)) {
                        (0, node_fs_1.rmSync)(worktreesPath, { recursive: true, force: true });
                    }
                    // Create and switch to branch
                    return [4 /*yield*/, Bun.$(templateObject_4 || (templateObject_4 = __makeTemplateObject(["git checkout -B \"", "\""], ["git checkout -B \"", "\""])), branchName).cwd(lanePath).quiet()];
                case 10:
                    // Create and switch to branch
                    _1.sent();
                    // Write marker file so we can find the main repo from the lane
                    (0, node_fs_1.writeFileSync)(node_path_1.default.join(lanePath, ".lane-origin"), mainRoot);
                    elapsed = ((Date.now() - startTime_1) / 1000).toFixed(1);
                    process.stderr.write("\r\u2713 Copied repository in ".concat(elapsed, "s").padEnd(60) + "\n");
                    if (!config.settings.symlinkDeps) return [3 /*break*/, 19];
                    process.stderr.write("\u25E6 Symlinking dependencies...\n");
                    return [4 /*yield*/, symlinkDependencies(mainRoot, lanePath)];
                case 11:
                    symlinkResult = _1.sent();
                    if (!symlinkResult.success) return [3 /*break*/, 12];
                    process.stderr.write("  \u2713 Symlinked: ".concat(symlinkResult.symlinked.join(", "), "\n"));
                    // Log any non-fatal errors
                    if (symlinkResult.errors.length > 0) {
                        for (_i = 0, _b = symlinkResult.errors; _i < _b.length; _i++) {
                            err = _b[_i];
                            process.stderr.write("  \u26A0 ".concat(err, "\n"));
                        }
                    }
                    return [3 /*break*/, 18];
                case 12:
                    // Symlink failed completely, fall back to package install
                    process.stderr.write("  \u2717 Symlinking failed, falling back to package install\n");
                    for (_c = 0, _d = symlinkResult.errors; _c < _d.length; _c++) {
                        err = _d[_c];
                        process.stderr.write("    ".concat(err, "\n"));
                    }
                    if (!config.settings.autoInstall) return [3 /*break*/, 18];
                    packageManagers = detectPackageManagers(lanePath);
                    if (!(packageManagers.length > 0)) return [3 /*break*/, 18];
                    process.stderr.write("\u25E6 Installing dependencies (fallback)...\n");
                    _e = 0, packageManagers_1 = packageManagers;
                    _1.label = 13;
                case 13:
                    if (!(_e < packageManagers_1.length)) return [3 /*break*/, 18];
                    pm = packageManagers_1[_e];
                    _1.label = 14;
                case 14:
                    _1.trys.push([14, 16, , 17]);
                    process.stderr.write("  $ ".concat(pm.installCmd, "\n"));
                    _f = pm.installCmd.split(" "), cmd = _f[0], args = _f.slice(1);
                    proc = Bun.spawn(__spreadArray([cmd], args, true), {
                        cwd: lanePath,
                        stdout: "inherit",
                        stderr: "inherit",
                        stdin: "inherit",
                        env: __assign(__assign({}, process.env), { FORCE_COLOR: "1" }),
                    });
                    return [4 /*yield*/, proc.exited];
                case 15:
                    exitCode_1 = _1.sent();
                    if (exitCode_1 !== 0) {
                        throw new Error("Exit code ".concat(exitCode_1));
                    }
                    process.stderr.write("  \u2713 ".concat(pm.name, " done\n"));
                    return [3 /*break*/, 17];
                case 16:
                    _g = _1.sent();
                    process.stderr.write("  \u2717 ".concat(pm.name, " failed\n"));
                    return [3 /*break*/, 17];
                case 17:
                    _e++;
                    return [3 /*break*/, 13];
                case 18: return [3 /*break*/, 25];
                case 19:
                    if (!(skipArtifacts && config.settings.autoInstall)) return [3 /*break*/, 25];
                    packageManagers = detectPackageManagers(lanePath);
                    if (!(packageManagers.length > 0)) return [3 /*break*/, 25];
                    process.stderr.write("\u25E6 Installing dependencies...\n");
                    _h = 0, packageManagers_2 = packageManagers;
                    _1.label = 20;
                case 20:
                    if (!(_h < packageManagers_2.length)) return [3 /*break*/, 25];
                    pm = packageManagers_2[_h];
                    _1.label = 21;
                case 21:
                    _1.trys.push([21, 23, , 24]);
                    process.stderr.write("  $ ".concat(pm.installCmd, "\n"));
                    _j = pm.installCmd.split(" "), cmd = _j[0], args = _j.slice(1);
                    proc = Bun.spawn(__spreadArray([cmd], args, true), {
                        cwd: lanePath,
                        stdout: "inherit",
                        stderr: "inherit",
                        stdin: "inherit",
                        env: __assign(__assign({}, process.env), { FORCE_COLOR: "1" }),
                    });
                    return [4 /*yield*/, proc.exited];
                case 22:
                    exitCode_2 = _1.sent();
                    if (exitCode_2 !== 0) {
                        throw new Error("Exit code ".concat(exitCode_2));
                    }
                    process.stderr.write("  \u2713 ".concat(pm.name, " done\n"));
                    return [3 /*break*/, 24];
                case 23:
                    _k = _1.sent();
                    process.stderr.write("  \u2717 ".concat(pm.name, " failed\n"));
                    return [3 /*break*/, 24];
                case 24:
                    _h++;
                    return [3 /*break*/, 20];
                case 25: return [3 /*break*/, 28];
                case 26:
                    e_3 = _1.sent();
                    process.stderr.write("\r\u2717 Copy failed: ".concat(e_3.message).padEnd(60) + "\n");
                    return [4 /*yield*/, (0, config_js_1.removeLane)(mainRoot, laneName)];
                case 27:
                    _1.sent();
                    return [2 /*return*/, { success: false, error: e_3.message }];
                case 28: return [3 /*break*/, 80];
                case 29:
                    // Worktree mode (default)
                    // Phase 2: Create git worktree
                    process.stderr.write("\u25E6 Creating worktree...");
                    return [4 /*yield*/, (0, git_js_1.branchExists)(mainRoot, branchName)];
                case 30:
                    branchAlreadyExists = _1.sent();
                    return [4 /*yield*/, (0, git_js_1.createWorktree)(mainRoot, lanePath, branchName, !branchAlreadyExists)];
                case 31:
                    worktreeResult = _1.sent();
                    if (!!worktreeResult.success) return [3 /*break*/, 33];
                    process.stderr.write("\r\u2717 Worktree failed".padEnd(40) + "\n");
                    return [4 /*yield*/, (0, config_js_1.removeLane)(mainRoot, laneName)];
                case 32:
                    _1.sent();
                    return [2 /*return*/, { success: false, error: worktreeResult.error }];
                case 33:
                    process.stderr.write("\r\u2713 Created worktree (branch: ".concat(branchName, ")").padEnd(50) + "\n");
                    alwaysSkip = [".DS_Store", "Thumbs.db", ".Spotlight-V100", ".Trashes"];
                    skipPatterns = config.settings.skipPatterns || [];
                    buildPatterns = config.settings.skipBuildArtifacts ? config_js_1.BUILD_ARTIFACT_PATTERNS : [];
                    allExcludes = new Set(__spreadArray(__spreadArray(__spreadArray([], alwaysSkip, true), skipPatterns, true), buildPatterns, true));
                    process.stderr.write("\u25E6 Copying local files...\n");
                    copyStartTime = Date.now();
                    _1.label = 34;
                case 34:
                    _1.trys.push([34, 63, , 64]);
                    topLevelItems = (0, node_fs_1.readdirSync)(mainRoot).filter(function (f) { return f !== ".git"; });
                    itemsToCopy = [];
                    _l = 0, topLevelItems_1 = topLevelItems;
                    _1.label = 35;
                case 35:
                    if (!(_l < topLevelItems_1.length)) return [3 /*break*/, 43];
                    item = topLevelItems_1[_l];
                    // Skip if in exclude list
                    if (allExcludes.has(item))
                        return [3 /*break*/, 42];
                    _1.label = 36;
                case 36:
                    _1.trys.push([36, 38, , 39]);
                    return [4 /*yield*/, Bun.$(templateObject_5 || (templateObject_5 = __makeTemplateObject(["git check-ignore --quiet \"", "\""], ["git check-ignore --quiet \"", "\""])), item).cwd(mainRoot).quiet().text()];
                case 37:
                    ignoredText = _1.sent();
                    // If git check-ignore succeeds (exit code 0), the file is ignored - skip it
                    if (ignoredText === "") {
                        return [3 /*break*/, 42];
                    }
                    return [3 /*break*/, 39];
                case 38:
                    _m = _1.sent();
                    return [3 /*break*/, 39];
                case 39:
                    _1.trys.push([39, 41, , 42]);
                    return [4 /*yield*/, Bun.$(templateObject_6 || (templateObject_6 = __makeTemplateObject(["git ls-files \"", "\" | head -1"], ["git ls-files \"", "\" | head -1"])), item).cwd(mainRoot).quiet().text()];
                case 40:
                    trackedText = _1.sent();
                    tracked = trackedText.trim();
                    // If nothing tracked, it's fully untracked - copy it
                    if (!tracked) {
                        itemsToCopy.push(item);
                    }
                    return [3 /*break*/, 42];
                case 41:
                    _o = _1.sent();
                    // If git command fails, assume untracked
                    itemsToCopy.push(item);
                    return [3 /*break*/, 42];
                case 42:
                    _l++;
                    return [3 /*break*/, 35];
                case 43:
                    if (!(itemsToCopy.length === 0)) return [3 /*break*/, 44];
                    process.stderr.write("\u2713 No local files to copy\n");
                    return [3 /*break*/, 51];
                case 44:
                    process.stderr.write("  Copying ".concat(itemsToCopy.length, " items...\n"));
                    _p = 0, itemsToCopy_1 = itemsToCopy;
                    _1.label = 45;
                case 45:
                    if (!(_p < itemsToCopy_1.length)) return [3 /*break*/, 50];
                    item = itemsToCopy_1[_p];
                    src = node_path_1.default.join(mainRoot, item);
                    dest = node_path_1.default.join(lanePath, item);
                    process.stderr.write("    ".concat(item, "..."));
                    _1.label = 46;
                case 46:
                    _1.trys.push([46, 48, , 49]);
                    return [4 /*yield*/, Bun.$(templateObject_7 || (templateObject_7 = __makeTemplateObject(["cp -R \"", "\" \"", "\""], ["cp -R \"", "\" \"", "\""])), src, dest).quiet()];
                case 47:
                    _1.sent();
                    process.stderr.write(" done\n");
                    return [3 /*break*/, 49];
                case 48:
                    e_4 = _1.sent();
                    process.stderr.write(" failed\n");
                    return [3 /*break*/, 49];
                case 49:
                    _p++;
                    return [3 /*break*/, 45];
                case 50:
                    elapsed = ((Date.now() - copyStartTime) / 1000).toFixed(1);
                    process.stderr.write("\u2713 Copied ".concat(itemsToCopy.length, " items in ").concat(elapsed, "s\n"));
                    _1.label = 51;
                case 51:
                    // Also copy nested config files (.env*, *.local, etc.) that git ignores
                    process.stderr.write("  Checking for nested config files...\n");
                    _1.label = 52;
                case 52:
                    _1.trys.push([52, 61, , 62]);
                    configPatterns = [".env", ".env.*", "*.local", ".secret*"];
                    findPattern = configPatterns.map(function (p) { return "-name \"".concat(p, "\""); }).join(" -o ");
                    proc = Bun.spawn(__spreadArray(__spreadArray(["find", ".", "-type", "f", "("], findPattern.split(" "), true), ["!", "-path", "./.git/*"], false), {
                        cwd: mainRoot,
                        stdout: "pipe",
                        stderr: "ignore",
                    });
                    return [4 /*yield*/, proc.exited];
                case 53:
                    _1.sent();
                    return [4 /*yield*/, new Response(proc.stdout).text()];
                case 54:
                    nestedConfigs = (_1.sent()).trim().split("\n").filter(function (f) { return f && f !== "."; });
                    copiedNested = 0;
                    _q = 0, nestedConfigs_1 = nestedConfigs;
                    _1.label = 55;
                case 55:
                    if (!(_q < nestedConfigs_1.length)) return [3 /*break*/, 60];
                    file = nestedConfigs_1[_q];
                    src = node_path_1.default.join(mainRoot, file);
                    dest = node_path_1.default.join(lanePath, file);
                    if (!((0, node_fs_1.existsSync)(src) && !(0, node_fs_1.existsSync)(dest))) return [3 /*break*/, 59];
                    destDir = node_path_1.default.dirname(dest);
                    if (!(0, node_fs_1.existsSync)(destDir))
                        (0, node_fs_1.mkdirSync)(destDir, { recursive: true });
                    _1.label = 56;
                case 56:
                    _1.trys.push([56, 58, , 59]);
                    cpProc = Bun.spawn(["cp", src, dest], { stdout: "ignore", stderr: "ignore" });
                    return [4 /*yield*/, cpProc.exited];
                case 57:
                    _1.sent();
                    copiedNested++;
                    return [3 /*break*/, 59];
                case 58:
                    _r = _1.sent();
                    return [3 /*break*/, 59];
                case 59:
                    _q++;
                    return [3 /*break*/, 55];
                case 60:
                    if (copiedNested > 0) {
                        process.stderr.write("  \u2713 Copied ".concat(copiedNested, " nested config files\n"));
                    }
                    return [3 /*break*/, 62];
                case 61:
                    _s = _1.sent();
                    return [3 /*break*/, 62];
                case 62: return [3 /*break*/, 64];
                case 63:
                    e_5 = _1.sent();
                    process.stderr.write("\u26A0 Copy failed: ".concat(e_5.message, "\n"));
                    return [3 /*break*/, 64];
                case 64:
                    if (!config.settings.symlinkDeps) return [3 /*break*/, 73];
                    process.stderr.write("\n\u25E6 Symlinking dependencies...\n");
                    return [4 /*yield*/, symlinkDependencies(mainRoot, lanePath)];
                case 65:
                    symlinkResult = _1.sent();
                    if (!symlinkResult.success) return [3 /*break*/, 66];
                    process.stderr.write("  \u2713 Symlinked: ".concat(symlinkResult.symlinked.join(", "), "\n"));
                    // Log any non-fatal errors
                    if (symlinkResult.errors.length > 0) {
                        for (_t = 0, _u = symlinkResult.errors; _t < _u.length; _t++) {
                            err = _u[_t];
                            process.stderr.write("  \u26A0 ".concat(err, "\n"));
                        }
                    }
                    return [3 /*break*/, 72];
                case 66:
                    // Symlink failed completely, fall back to package install
                    process.stderr.write("  \u2717 Symlinking failed, falling back to package install\n");
                    for (_v = 0, _w = symlinkResult.errors; _v < _w.length; _v++) {
                        err = _w[_v];
                        process.stderr.write("    ".concat(err, "\n"));
                    }
                    if (!config.settings.autoInstall) return [3 /*break*/, 72];
                    packageManagers = detectPackageManagers(lanePath);
                    if (!(packageManagers.length > 0)) return [3 /*break*/, 72];
                    process.stderr.write("\n\u25E6 Installing dependencies (fallback)...\n");
                    _x = 0, packageManagers_3 = packageManagers;
                    _1.label = 67;
                case 67:
                    if (!(_x < packageManagers_3.length)) return [3 /*break*/, 72];
                    pm = packageManagers_3[_x];
                    _1.label = 68;
                case 68:
                    _1.trys.push([68, 70, , 71]);
                    process.stderr.write("  $ ".concat(pm.installCmd, "\n"));
                    _y = pm.installCmd.split(" "), cmd = _y[0], args = _y.slice(1);
                    proc = Bun.spawn(__spreadArray([cmd], args, true), {
                        cwd: lanePath,
                        stdout: "inherit",
                        stderr: "inherit",
                        stdin: "inherit",
                        env: __assign(__assign({}, process.env), { FORCE_COLOR: "1", npm_config_color: "always" }),
                    });
                    return [4 /*yield*/, proc.exited];
                case 69:
                    exitCode = _1.sent();
                    if (exitCode === 0) {
                        process.stderr.write("  \u2713 ".concat(pm.name, " done\n"));
                    }
                    else {
                        process.stderr.write("  \u2717 ".concat(pm.name, " failed\n"));
                    }
                    return [3 /*break*/, 71];
                case 70:
                    err_1 = _1.sent();
                    process.stderr.write("  \u2717 ".concat(pm.name, " failed\n"));
                    return [3 /*break*/, 71];
                case 71:
                    _x++;
                    return [3 /*break*/, 67];
                case 72: return [3 /*break*/, 80];
                case 73:
                    if (!config.settings.autoInstall) return [3 /*break*/, 80];
                    packageManagers = detectPackageManagers(lanePath);
                    if (!(packageManagers.length > 0)) return [3 /*break*/, 80];
                    process.stderr.write("\n\u25E6 Installing dependencies...\n");
                    succeeded = 0;
                    failed = 0;
                    _z = 0, packageManagers_4 = packageManagers;
                    _1.label = 74;
                case 74:
                    if (!(_z < packageManagers_4.length)) return [3 /*break*/, 79];
                    pm = packageManagers_4[_z];
                    _1.label = 75;
                case 75:
                    _1.trys.push([75, 77, , 78]);
                    process.stderr.write("  $ ".concat(pm.installCmd, "\n"));
                    _0 = pm.installCmd.split(" "), cmd = _0[0], args = _0.slice(1);
                    proc = Bun.spawn(__spreadArray([cmd], args, true), {
                        cwd: lanePath,
                        stdout: "inherit",
                        stderr: "inherit",
                        stdin: "inherit",
                        env: __assign(__assign({}, process.env), { FORCE_COLOR: "1", npm_config_color: "always" }),
                    });
                    return [4 /*yield*/, proc.exited];
                case 76:
                    exitCode = _1.sent();
                    if (exitCode === 0) {
                        succeeded++;
                        process.stderr.write("  \u2713 ".concat(pm.name, " done\n"));
                    }
                    else {
                        failed++;
                        process.stderr.write("  \u2717 ".concat(pm.name, " failed\n"));
                    }
                    return [3 /*break*/, 78];
                case 77:
                    err_2 = _1.sent();
                    failed++;
                    process.stderr.write("  \u2717 ".concat(pm.name, " failed\n"));
                    return [3 /*break*/, 78];
                case 78:
                    _z++;
                    return [3 /*break*/, 74];
                case 79:
                    if (failed === 0) {
                        process.stderr.write("\u2713 Dependencies installed\n");
                    }
                    else if (succeeded > 0) {
                        process.stderr.write("\u26A0 Some dependencies failed to install\n");
                    }
                    else {
                        process.stderr.write("\u2717 Failed to install dependencies\n");
                    }
                    _1.label = 80;
                case 80:
                    process.stderr.write("\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
                    process.stderr.write("\u2713 Lane \"".concat(laneName, "\" ready at ").concat(lanePath, "\n"));
                    process.stderr.write("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
                    return [2 /*return*/, {
                            success: true,
                            lane: __assign(__assign({}, lane), { createdAt: new Date().toISOString() }),
                        }];
            }
        });
    });
}
/**
 * Remove a lane with progress
 */
function removeLaneCmd(laneName_1) {
    return __awaiter(this, arguments, void 0, function (laneName, options) {
        var cwd, mainRoot, lane, trashPath, e_6, _a;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cwd = options.cwd || process.cwd();
                    return [4 /*yield*/, getMainRepoRoot(cwd)];
                case 1:
                    mainRoot = _b.sent();
                    if (!mainRoot) {
                        return [2 /*return*/, { success: false, error: "Not in a git repository" }];
                    }
                    return [4 /*yield*/, (0, config_js_1.getLane)(mainRoot, laneName)];
                case 2:
                    lane = _b.sent();
                    if (!lane) {
                        return [2 /*return*/, { success: false, error: "Lane not found: ".concat(laneName) }];
                    }
                    if (!(0, node_fs_1.existsSync)(lane.path)) return [3 /*break*/, 10];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 10]);
                    trashPath = "".concat(lane.path, ".deleting.").concat(Date.now());
                    return [4 /*yield*/, Bun.$(templateObject_8 || (templateObject_8 = __makeTemplateObject(["mv \"", "\" \"", "\""], ["mv \"", "\" \"", "\""])), lane.path, trashPath).quiet()];
                case 4:
                    _b.sent();
                    if (!options.silent) {
                        process.stderr.write("\u2713 Deleted ".concat(laneName, "\n"));
                    }
                    // Delete in background (don't wait)
                    Bun.spawn(["rm", "-rf", trashPath], { stdout: "ignore", stderr: "ignore", stdin: "ignore" });
                    return [3 /*break*/, 10];
                case 5:
                    e_6 = _b.sent();
                    // Fallback to direct delete if rename fails
                    if (!options.silent) {
                        process.stderr.write("\u25E6 Deleting ".concat(laneName, "..."));
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, Bun.$(templateObject_9 || (templateObject_9 = __makeTemplateObject(["rm -rf \"", "\""], ["rm -rf \"", "\""])), lane.path).quiet()];
                case 7:
                    _b.sent();
                    if (!options.silent) {
                        process.stderr.write(" done\n");
                    }
                    return [3 /*break*/, 9];
                case 8:
                    _a = _b.sent();
                    if (!options.silent) {
                        process.stderr.write(" failed\n");
                    }
                    return [2 /*return*/, { success: false, error: "Failed to remove directory" }];
                case 9: return [3 /*break*/, 10];
                case 10:
                    // Delete branch from main repo if requested
                    if (options.deleteBranch && lane.branch) {
                        (0, git_js_1.deleteBranch)(mainRoot, lane.branch, options.force);
                    }
                    // Remove from config
                    return [4 /*yield*/, (0, config_js_1.removeLane)(mainRoot, laneName)];
                case 11:
                    // Remove from config
                    _b.sent();
                    return [2 /*return*/, { success: true }];
            }
        });
    });
}
/**
 * Get lane to switch to
 */
function getLaneForSwitch(laneName_1) {
    return __awaiter(this, arguments, void 0, function (laneName, cwd) {
        var mainRoot, lane, repo;
        if (cwd === void 0) { cwd = process.cwd(); }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMainRepoRoot(cwd)];
                case 1:
                    mainRoot = _a.sent();
                    if (!mainRoot) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, (0, config_js_1.getLane)(mainRoot, laneName)];
                case 2:
                    lane = _a.sent();
                    if (lane && (0, node_fs_1.existsSync)(lane.path)) {
                        return [2 /*return*/, { path: lane.path, branch: lane.branch }];
                    }
                    if (!(laneName === "main" || laneName === "origin")) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, git_js_1.findGitRepo)(mainRoot)];
                case 3:
                    repo = _a.sent();
                    return [2 /*return*/, repo ? { path: mainRoot, branch: repo.currentBranch } : null];
                case 4: return [2 /*return*/, null];
            }
        });
    });
}
/**
 * List all lanes including the main repo
 */
function listAllLanes() {
    return __awaiter(this, arguments, void 0, function (cwd) {
        var mainRoot, currentRepo, currentPath, lanes, repo, result, _i, lanes_1, lane, actualBranch, _a;
        if (cwd === void 0) { cwd = process.cwd(); }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getMainRepoRoot(cwd)];
                case 1:
                    mainRoot = _b.sent();
                    if (!mainRoot) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, (0, git_js_1.findGitRepo)(cwd)];
                case 2:
                    currentRepo = _b.sent();
                    currentPath = (currentRepo === null || currentRepo === void 0 ? void 0 : currentRepo.root) || cwd;
                    return [4 /*yield*/, (0, config_js_1.getAllLanes)(mainRoot)];
                case 3:
                    lanes = _b.sent();
                    return [4 /*yield*/, (0, git_js_1.findGitRepo)(mainRoot)];
                case 4:
                    repo = _b.sent();
                    result = [];
                    // Add main repo
                    if (repo) {
                        result.push({
                            name: "main",
                            path: mainRoot,
                            branch: repo.currentBranch,
                            isMain: true,
                            isCurrent: currentPath === mainRoot,
                        });
                    }
                    _i = 0, lanes_1 = lanes;
                    _b.label = 5;
                case 5:
                    if (!(_i < lanes_1.length)) return [3 /*break*/, 10];
                    lane = lanes_1[_i];
                    if (!(0, node_fs_1.existsSync)(lane.path)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, git_js_1.getCurrentBranch)(lane.path)];
                case 6:
                    _a = (_b.sent()) || lane.branch;
                    return [3 /*break*/, 8];
                case 7:
                    _a = lane.branch;
                    _b.label = 8;
                case 8:
                    actualBranch = _a;
                    result.push({
                        name: lane.name,
                        path: lane.path,
                        branch: actualBranch,
                        isMain: false,
                        isCurrent: currentPath === lane.path,
                    });
                    _b.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 5];
                case 10: return [2 /*return*/, result];
            }
        });
    });
}
/**
 * Find a lane by its current branch
 */
function findLaneByBranch(branchName_1) {
    return __awaiter(this, arguments, void 0, function (branchName, cwd) {
        var lanes;
        if (cwd === void 0) { cwd = process.cwd(); }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, listAllLanes(cwd)];
                case 1:
                    lanes = _a.sent();
                    return [2 /*return*/, lanes.find(function (l) { return l.branch === branchName; }) || null];
            }
        });
    });
}
/**
 * Sync untracked files from main repo to current lane (or specified lane)
 */
function syncLane(laneName_1) {
    return __awaiter(this, arguments, void 0, function (laneName, options) {
        var cwd, mainRoot, config, targetPath, lane, currentRepo, copiedFiles;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cwd = options.cwd || process.cwd();
                    return [4 /*yield*/, getMainRepoRoot(cwd)];
                case 1:
                    mainRoot = _a.sent();
                    if (!mainRoot) {
                        return [2 /*return*/, { success: false, copiedFiles: [], error: "Not in a git repository" }];
                    }
                    return [4 /*yield*/, (0, config_js_1.loadConfig)(mainRoot)];
                case 2:
                    config = _a.sent();
                    if (!laneName) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, config_js_1.getLane)(mainRoot, laneName)];
                case 3:
                    lane = _a.sent();
                    if (!lane) {
                        return [2 /*return*/, { success: false, copiedFiles: [], error: "Lane not found: ".concat(laneName) }];
                    }
                    targetPath = lane.path;
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, (0, git_js_1.findGitRepo)(cwd)];
                case 5:
                    currentRepo = _a.sent();
                    if (!currentRepo || currentRepo.root === mainRoot) {
                        return [2 /*return*/, { success: false, copiedFiles: [], error: "Not in a lane. Use 'lane sync <name>' to sync a specific lane." }];
                    }
                    targetPath = currentRepo.root;
                    _a.label = 6;
                case 6: return [4 /*yield*/, copyUntrackedFiles(mainRoot, targetPath, config.settings.skipPatterns)];
                case 7:
                    copiedFiles = _a.sent();
                    return [2 /*return*/, { success: true, copiedFiles: copiedFiles }];
            }
        });
    });
}
/**
 * Rename a lane
 */
function renameLane(oldName_1, newName_1) {
    return __awaiter(this, arguments, void 0, function (oldName, newName, options) {
        var cwd, mainRoot, lane, newPath, e_7, config, laneConfig;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cwd = options.cwd || process.cwd();
                    return [4 /*yield*/, getMainRepoRoot(cwd)];
                case 1:
                    mainRoot = _a.sent();
                    if (!mainRoot) {
                        return [2 /*return*/, { success: false, error: "Not in a git repository" }];
                    }
                    return [4 /*yield*/, (0, config_js_1.getLane)(mainRoot, oldName)];
                case 2:
                    lane = _a.sent();
                    if (!lane) {
                        return [2 /*return*/, { success: false, error: "Lane not found: ".concat(oldName) }];
                    }
                    newPath = getLanePath(mainRoot, newName);
                    // Check if new path already exists
                    if ((0, node_fs_1.existsSync)(newPath)) {
                        return [2 /*return*/, { success: false, error: "Path already exists: ".concat(newPath) }];
                    }
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, Bun.$(templateObject_10 || (templateObject_10 = __makeTemplateObject(["mv \"", "\" \"", "\""], ["mv \"", "\" \"", "\""])), lane.path, newPath).quiet()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_7 = _a.sent();
                    return [2 /*return*/, { success: false, error: "Failed to rename directory: ".concat(e_7.message) }];
                case 6: return [4 /*yield*/, (0, config_js_1.loadConfig)(mainRoot)];
                case 7:
                    config = _a.sent();
                    laneConfig = config.lanes.find(function (l) { return l.name === oldName; });
                    if (!laneConfig) return [3 /*break*/, 9];
                    laneConfig.name = newName;
                    laneConfig.path = newPath;
                    return [4 /*yield*/, (0, config_js_1.saveConfig)(mainRoot, config)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, { success: true, newPath: newPath }];
            }
        });
    });
}
/**
 * Smart lane command - switches to existing lane, or creates new one
 * Logic:
 * 1. If lane exists -> switch to it
 * 2. If "main" -> switch to main repo
 * 3. If branch exists but no lane -> create lane from that branch
 * 4. If nothing exists -> create new lane with new branch
 */
function smartLane(name_1) {
    return __awaiter(this, arguments, void 0, function (name, options) {
        var cwd, mainRoot, existingLane, createResult;
        var _a;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cwd = options.cwd || process.cwd();
                    return [4 /*yield*/, getMainRepoRoot(cwd)];
                case 1:
                    mainRoot = _b.sent();
                    if (!mainRoot) {
                        return [2 /*return*/, { success: false, action: "none", error: "Not in a git repository" }];
                    }
                    // 1. Check if it's "main"
                    if (name === "main" || name === "origin") {
                        return [2 /*return*/, {
                                success: true,
                                action: "switched",
                                path: mainRoot,
                            }];
                    }
                    return [4 /*yield*/, (0, config_js_1.getLane)(mainRoot, name)];
                case 2:
                    existingLane = _b.sent();
                    if (existingLane && (0, node_fs_1.existsSync)(existingLane.path)) {
                        return [2 /*return*/, {
                                success: true,
                                action: "switched",
                                lane: existingLane,
                                path: existingLane.path,
                            }];
                    }
                    return [4 /*yield*/, createLane(name, {
                            branch: name,
                            cwd: cwd,
                        })];
                case 3:
                    createResult = _b.sent();
                    if (!createResult.success) {
                        return [2 /*return*/, {
                                success: false,
                                action: "none",
                                error: createResult.error,
                            }];
                    }
                    return [2 /*return*/, {
                            success: true,
                            action: "created",
                            lane: createResult.lane,
                            path: (_a = createResult.lane) === null || _a === void 0 ? void 0 : _a.path,
                        }];
            }
        });
    });
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
