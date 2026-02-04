"use strict";
/**
 * Example test file demonstrating Bun's built-in test framework
 *
 * Run tests with: bun test
 * Watch mode: bun test --watch
 * Coverage: bun test --coverage
 */
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
var setup_1 = require("./setup");
// Example test suite
(0, bun_test_1.describe)('Example Test Suite', function () {
    var tempDir;
    (0, bun_test_1.beforeEach)(function () {
        // Setup before each test
        tempDir = setup_1.testUtils.createTempDir('example');
    });
    (0, bun_test_1.afterEach)(function () {
        // Cleanup after each test
        setup_1.testUtils.cleanupTempDir(tempDir);
    });
    (0, bun_test_1.test)('basic assertion', function () {
        (0, bun_test_1.expect)(1 + 1).toBe(2);
    });
    (0, bun_test_1.test)('string matching', function () {
        var message = 'Hello, Lane!';
        (0, bun_test_1.expect)(message).toContain('Lane');
        (0, bun_test_1.expect)(message).toMatch(/lane/i);
    });
    (0, bun_test_1.test)('array operations', function () {
        var items = [1, 2, 3];
        (0, bun_test_1.expect)(items).toHaveLength(3);
        (0, bun_test_1.expect)(items).toContain(2);
        (0, bun_test_1.expect)(items).toEqual([1, 2, 3]);
    });
    (0, bun_test_1.test)('object matching', function () {
        var config = {
            name: 'lane',
            version: '0.1.0',
            features: ['worktree', 'git'],
        };
        (0, bun_test_1.expect)(config).toHaveProperty('name', 'lane');
        (0, bun_test_1.expect)(config.features).toBeArray();
        (0, bun_test_1.expect)(config.features[0]).toBe('worktree');
    });
    (0, bun_test_1.test)('async operations', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve(42)];
                case 1:
                    result = _a.sent();
                    (0, bun_test_1.expect)(result).toBeGreaterThan(40);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, bun_test_1.test)('temp directory creation', function () {
        (0, bun_test_1.expect)(tempDir).toContain('/tmp/lane-test-example-');
    });
});
// Example: Testing a hypothetical CLI command
(0, bun_test_1.describe)('CLI Command Tests (Example)', function () {
    (0, bun_test_1.test)('should parse command line arguments', function () {
        // This is a placeholder showing how you might test CLI parsing
        var args = ['create', 'my-feature'];
        (0, bun_test_1.expect)(args[0]).toBe('create');
        (0, bun_test_1.expect)(args[1]).toMatch(/^my-/);
    });
    (0, bun_test_1.test)('should handle git operations', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gitCommand;
        return __generator(this, function (_a) {
            gitCommand = 'git status';
            (0, bun_test_1.expect)(gitCommand).toContain('git');
            return [2 /*return*/];
        });
    }); });
});
