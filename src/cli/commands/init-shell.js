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
exports.registerInitShellCommand = registerInitShellCommand;
var chalk_1 = require("chalk");
function registerInitShellCommand(program) {
    var _this = this;
    program
        .command("init-shell")
        .description("Set up shell integration for automatic cd")
        .option("--print", "Print the shell function instead of installing")
        .action(function (options) { return __awaiter(_this, void 0, void 0, function () {
        var pathModule, shell, isFish, home, MARKER, MARKER_END, fishFunction, bashZshFunction, shellFunc, configFile, fishConfigDir, existingContent, configFileHandle, regex, newContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("node:path"); })];
                case 1:
                    pathModule = _a.sent();
                    shell = process.env.SHELL || "";
                    isFish = shell.includes("fish");
                    home = process.env.HOME || process.env.USERPROFILE || "";
                    MARKER = "# >>> lane shell integration >>>";
                    MARKER_END = "# <<< lane shell integration <<<";
                    fishFunction = "".concat(MARKER, "\nfunction lane\n    set -l result (command lane $argv)\n    set -l code $status\n\n    if string match -q \"*__lane_cd:*\" \"$result\"\n        set -l lines (string split \\n \"$result\")\n        for line in $lines\n            if string match -q \"__lane_cd:*\" \"$line\"\n                cd (string replace \"__lane_cd:\" \"\" \"$line\")\n            else\n                test -n \"$line\"; and echo \"$line\"\n            end\n        end\n    else\n        test -n \"$result\"; and echo \"$result\"\n    end\n    return $code\nend\n").concat(MARKER_END);
                    bashZshFunction = "".concat(MARKER, "\nlane() {\n  local result\n  result=$(command lane \"$@\")\n  local code=$?\n  if [[ \"$result\" == *__lane_cd:* ]]; then\n    local output=\"\"\n    local cdpath=\"\"\n    while IFS= read -r line; do\n      if [[ \"$line\" == __lane_cd:* ]]; then\n        cdpath=\"${line#__lane_cd:}\"\n      else\n        [[ -n \"$output\" ]] && output=\"$output\"$'\\n'\n        output=\"$output$line\"\n      fi\n    done <<< \"$result\"\n    [[ -n \"$output\" ]] && echo \"$output\"\n    [[ -n \"$cdpath\" ]] && cd \"$cdpath\"\n  else\n    [[ -n \"$result\" ]] && echo \"$result\"\n  fi\n  return $code\n}\n").concat(MARKER_END);
                    shellFunc = isFish ? fishFunction : bashZshFunction;
                    // Just print if requested
                    if (options.print) {
                        console.log(shellFunc);
                        return [2 /*return*/];
                    }
                    if (!isFish) return [3 /*break*/, 3];
                    fishConfigDir = pathModule.join(home, ".config", "fish");
                    // Ensure fish config dir exists
                    return [4 /*yield*/, Bun.write("".concat(fishConfigDir, "/.gitkeep"), "", { createPath: true })];
                case 2:
                    // Ensure fish config dir exists
                    _a.sent();
                    configFile = pathModule.join(fishConfigDir, "config.fish");
                    return [3 /*break*/, 4];
                case 3:
                    if (shell.includes("zsh")) {
                        configFile = pathModule.join(home, ".zshrc");
                    }
                    else {
                        configFile = pathModule.join(home, ".bashrc");
                    }
                    _a.label = 4;
                case 4:
                    existingContent = "";
                    configFileHandle = Bun.file(configFile);
                    return [4 /*yield*/, configFileHandle.exists()];
                case 5:
                    if (!_a.sent()) return [3 /*break*/, 7];
                    return [4 /*yield*/, configFileHandle.text()];
                case 6:
                    existingContent = _a.sent();
                    if (existingContent.includes(MARKER)) {
                        regex = new RegExp("".concat(MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "[\\s\\S]*?").concat(MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "\\n?"), "g");
                        existingContent = existingContent.replace(regex, "");
                    }
                    _a.label = 7;
                case 7:
                    newContent = existingContent.trimEnd() + "\n\n" + shellFunc + "\n";
                    return [4 /*yield*/, Bun.write(configFile, newContent)];
                case 8:
                    _a.sent();
                    console.log(chalk_1.default.green("\u2713 Shell integration installed to ".concat(configFile)));
                    console.log();
                    console.log("Run this to activate (or restart your terminal):");
                    console.log(chalk_1.default.cyan("  source ".concat(configFile)));
                    return [2 /*return*/];
            }
        });
    }); });
}
