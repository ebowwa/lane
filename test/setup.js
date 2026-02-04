"use strict";
/**
 * Test setup file for Bun test framework
 * This file runs before each test file and provides common utilities
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUtils = void 0;
// Set test environment variables
process.env.NODE_ENV = 'test';
// Mock console methods to reduce noise in tests (optional)
var originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
};
// You can uncomment this to suppress console output during tests
// console.log = () => {};
// console.error = () => {};
// console.warn = () => {};
// console.info = () => {};
// Export test utilities
exports.testUtils = {
    // Restore console methods if needed
    restoreConsole: function () {
        Object.assign(console, originalConsole);
    },
    // Create a temporary directory for test isolation
    createTempDir: function (name) {
        var tempDir = "/tmp/lane-test-".concat(name, "-").concat(Date.now());
        Bun.$(templateObject_1 || (templateObject_1 = __makeTemplateObject(["mkdir -p ", ""], ["mkdir -p ", ""])), tempDir);
        return tempDir;
    },
    // Clean up temporary directory
    cleanupTempDir: function (dir) {
        Bun.$(templateObject_2 || (templateObject_2 = __makeTemplateObject(["rm -rf ", ""], ["rm -rf ", ""])), dir).quiet();
    },
};
// Global teardown (runs after all tests)
process.on('beforeExit', function () {
    // Clean up any global resources
});
var templateObject_1, templateObject_2;
