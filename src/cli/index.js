#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
// Import command registerers
var new_js_1 = require("./commands/new.js");
var switch_js_1 = require("./commands/switch.js");
var list_js_1 = require("./commands/list.js");
var remove_js_1 = require("./commands/remove.js");
var init_shell_js_1 = require("./commands/init-shell.js");
var status_js_1 = require("./commands/status.js");
var sync_js_1 = require("./commands/sync.js");
var rename_js_1 = require("./commands/rename.js");
var checkout_js_1 = require("./commands/checkout.js");
var edit_js_1 = require("./commands/edit.js");
var config_js_1 = require("./commands/config.js");
var default_js_1 = require("./commands/default.js");
var program = new commander_1.Command();
program
    .name("lane")
    .description("A simple alternative to git worktrees")
    .version("0.1.0");
// Register all commands
(0, new_js_1.registerNewCommand)(program);
(0, switch_js_1.registerSwitchCommand)(program);
(0, list_js_1.registerListCommand)(program);
(0, remove_js_1.registerRemoveCommand)(program);
(0, init_shell_js_1.registerInitShellCommand)(program);
(0, status_js_1.registerStatusCommand)(program);
(0, sync_js_1.registerSyncCommand)(program);
(0, rename_js_1.registerRenameCommand)(program);
(0, checkout_js_1.registerCheckoutCommand)(program);
(0, edit_js_1.registerEditCommand)(program);
(0, config_js_1.registerConfigCommand)(program);
(0, default_js_1.registerDefaultCommand)(program);
program.parse();
