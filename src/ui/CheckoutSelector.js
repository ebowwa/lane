"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutSelector = CheckoutSelector;
var react_1 = require("react");
var ink_1 = require("ink");
function CheckoutSelector(_a) {
    var branchName = _a.branchName, branchExists = _a.branchExists, lanes = _a.lanes, onSelect = _a.onSelect;
    var _b = (0, react_1.useState)(0), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var exit = (0, ink_1.useApp)().exit;
    // Build options
    var options = [];
    // Option 1: Create new lane with this branch
    if (branchExists) {
        options.push({
            label: "Create new lane \"".concat(branchName, "\""),
            description: "Create a new lane and checkout this existing branch",
            action: { type: "create-new", branchName: branchName },
        });
    }
    else {
        options.push({
            label: "Create new lane \"".concat(branchName, "\""),
            description: "Create a new lane with a new branch",
            action: { type: "create-new", branchName: branchName },
        });
    }
    // Option 2+: Checkout in existing lanes (non-main, non-current)
    var availableLanes = lanes.filter(function (l) { return !l.isMain && !l.isCurrent; });
    for (var _i = 0, availableLanes_1 = availableLanes; _i < availableLanes_1.length; _i++) {
        var lane = availableLanes_1[_i];
        options.push({
            label: "Checkout in \"".concat(lane.name, "\""),
            description: "Currently on branch: ".concat(lane.branch),
            action: { type: "checkout-in-lane", lane: lane, branchName: branchName },
        });
    }
    (0, ink_1.useInput)(function (input, key) {
        if (key.upArrow || input === "k") {
            setSelectedIndex(function (i) { return Math.max(0, i - 1); });
        }
        else if (key.downArrow || input === "j") {
            setSelectedIndex(function (i) { return Math.min(options.length - 1, i + 1); });
        }
        else if (key.return) {
            onSelect(options[selectedIndex].action);
            exit();
        }
        else if (input === "q" || key.escape) {
            onSelect({ type: "cancel" });
            exit();
        }
    });
    return (<ink_1.Box flexDirection="column" padding={1}>
      <ink_1.Box marginBottom={1}>
        <ink_1.Text bold color="blue">
          Branch "{branchName}" {branchExists ? "exists" : "doesn't exist"}
        </ink_1.Text>
      </ink_1.Box>
      <ink_1.Box marginBottom={1}>
        <ink_1.Text color="gray">No lane currently has this branch checked out.</ink_1.Text>
      </ink_1.Box>

      {options.map(function (opt, index) {
            var isSelected = index === selectedIndex;
            return (<ink_1.Box key={index} flexDirection="column" marginBottom={1}>
            <ink_1.Box>
              <ink_1.Text color={isSelected ? "cyan" : "gray"}>
                {isSelected ? "❯ " : "  "}
              </ink_1.Text>
              <ink_1.Text bold color={isSelected ? "white" : "gray"}>
                {opt.label}
              </ink_1.Text>
            </ink_1.Box>
            <ink_1.Box marginLeft={4}>
              <ink_1.Text color="gray">{opt.description}</ink_1.Text>
            </ink_1.Box>
          </ink_1.Box>);
        })}

      <ink_1.Box marginTop={1}>
        <ink_1.Text color="gray">↑↓ navigate • Enter select • q cancel</ink_1.Text>
      </ink_1.Box>
    </ink_1.Box>);
}
