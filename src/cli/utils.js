"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CD_PREFIX = void 0;
exports.renderUI = renderUI;
var ink_1 = require("ink");
// Magic prefix for shell function to detect cd commands
exports.CD_PREFIX = "__lane_cd:";
// Render Ink to stderr so it shows while shell wrapper captures stdout
function renderUI(element) {
    return (0, ink_1.render)(element, {
        stdout: process.stderr,
        stdin: process.stdin,
    });
}
