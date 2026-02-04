"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = Settings;
var react_1 = require("react");
var ink_1 = require("ink");
function Settings(_a) {
    var currentMode = _a.currentMode, autoInstall = _a.autoInstall, skipBuildArtifacts = _a.skipBuildArtifacts, symlinkDeps = _a.symlinkDeps, onSave = _a.onSave;
    var _b = (0, react_1.useState)(0), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = (0, react_1.useState)(currentMode), copyMode = _c[0], setCopyMode = _c[1];
    var _d = (0, react_1.useState)(autoInstall), install = _d[0], setInstall = _d[1];
    var _e = (0, react_1.useState)(skipBuildArtifacts), skipArtifacts = _e[0], setSkipArtifacts = _e[1];
    var _f = (0, react_1.useState)(symlinkDeps), symlink = _f[0], setSymlink = _f[1];
    var exit = (0, ink_1.useApp)().exit;
    var options = [
        {
            key: "copyMode",
            label: "Copy Mode",
            value: copyMode,
            options: ["worktree", "full"],
            descriptions: {
                worktree: "Fast: git worktree + copy untracked files",
                full: "Full copy: copies entire repo directory",
            },
        },
        {
            key: "skipBuildArtifacts",
            label: "Skip Build Artifacts",
            value: skipArtifacts ? "yes" : "no",
            options: ["no", "yes"],
            descriptions: {
                yes: "Skip node_modules, dist, .next, etc (run install instead)",
                no: "Copy everything including build artifacts",
            },
        },
        {
            key: "autoInstall",
            label: "Auto Install",
            value: install ? "yes" : "no",
            options: ["yes", "no"],
            descriptions: {
                yes: "Run package manager install after creating lane",
                no: "Skip automatic dependency installation",
            },
        },
        {
            key: "symlinkDeps",
            label: "Symlink Dependencies",
            value: symlink ? "yes" : "no",
            options: ["no", "yes"],
            descriptions: {
                yes: "Create symlinks to main repo's node_modules (fast, saves disk space)",
                no: "Copy or install dependencies separately for each lane",
            },
        },
    ];
    (0, ink_1.useInput)(function (input, key) {
        if (key.upArrow || input === "k") {
            setSelectedIndex(function (i) { return Math.max(0, i - 1); });
        }
        else if (key.downArrow || input === "j") {
            setSelectedIndex(function (i) { return Math.min(options.length - 1, i + 1); });
        }
        else if (key.leftArrow || input === "h" || key.rightArrow || input === "l") {
            var opt = options[selectedIndex];
            var currentIdx = opt.options.indexOf(opt.value);
            var direction = (key.leftArrow || input === "h") ? -1 : 1;
            var newIdx = Math.max(0, Math.min(opt.options.length - 1, currentIdx + direction));
            if (opt.key === "copyMode") {
                setCopyMode(opt.options[newIdx]);
            }
            else if (opt.key === "skipBuildArtifacts") {
                setSkipArtifacts(opt.options[newIdx] === "yes");
            }
            else if (opt.key === "autoInstall") {
                setInstall(opt.options[newIdx] === "yes");
            }
            else if (opt.key === "symlinkDeps") {
                setSymlink(opt.options[newIdx] === "yes");
            }
        }
        else if (key.return || input === "s") {
            onSave({ copyMode: copyMode, autoInstall: install, skipBuildArtifacts: skipArtifacts, symlinkDeps: symlink });
            exit();
        }
        else if (input === "q" || key.escape) {
            exit();
        }
    });
    return (<ink_1.Box flexDirection="column" padding={1}>
      <ink_1.Box marginBottom={1}>
        <ink_1.Text bold color="blue">Lane Settings</ink_1.Text>
      </ink_1.Box>

      {options.map(function (opt, idx) {
            var isSelected = idx === selectedIndex;
            var desc = opt.descriptions[opt.value];
            return (<ink_1.Box key={opt.key} flexDirection="column" marginBottom={1}>
            <ink_1.Box>
              <ink_1.Text color={isSelected ? "cyan" : "gray"}>{isSelected ? "❯ " : "  "}</ink_1.Text>
              <ink_1.Text bold color={isSelected ? "white" : "gray"}>{opt.label}: </ink_1.Text>
              <ink_1.Text color="yellow">{opt.value}</ink_1.Text>
              <ink_1.Text color="gray"> (←/→ to change)</ink_1.Text>
            </ink_1.Box>
            <ink_1.Box marginLeft={4}>
              <ink_1.Text color="gray">{desc}</ink_1.Text>
            </ink_1.Box>
          </ink_1.Box>);
        })}

      <ink_1.Box marginTop={1} flexDirection="column">
        <ink_1.Text color="gray">↑↓ navigate • ←→ change • Enter save • q cancel</ink_1.Text>
      </ink_1.Box>
    </ink_1.Box>);
}
