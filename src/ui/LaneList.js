"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaneList = LaneList;
var react_1 = require("react");
var ink_1 = require("ink");
function LaneList(_a) {
    var lanes = _a.lanes, onSelect = _a.onSelect, onBulkDelete = _a.onBulkDelete;
    var _b = (0, react_1.useState)(Math.max(0, lanes.findIndex(function (l) { return l.isCurrent; }))), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = (0, react_1.useState)(new Set()), checked = _c[0], setChecked = _c[1];
    var _d = (0, react_1.useState)("navigate"), mode = _d[0], setMode = _d[1];
    var exit = (0, ink_1.useApp)().exit;
    var isRawModeSupported = (0, ink_1.useStdin)().isRawModeSupported;
    var selectedLane = lanes[selectedIndex];
    var checkedLanes = lanes.filter(function (l) { return checked.has(l.name); });
    var deletableLanes = checkedLanes.filter(function (l) { return !l.isMain && !l.isCurrent; });
    (0, react_1.useEffect)(function () {
        if (!isRawModeSupported) {
            exit();
        }
    }, [isRawModeSupported, exit]);
    (0, ink_1.useInput)(function (input, key) {
        if (mode === "confirm-delete") {
            if (input === "y" || input === "Y") {
                if (deletableLanes.length > 0 && onBulkDelete) {
                    onBulkDelete(deletableLanes);
                }
                else if (deletableLanes.length === 1) {
                    onSelect(deletableLanes[0], "delete");
                }
                exit();
            }
            else {
                setMode(checked.size > 0 ? "select" : "navigate");
            }
            return;
        }
        // Navigation
        if (key.upArrow || input === "k") {
            setSelectedIndex(function (i) { return Math.max(0, i - 1); });
        }
        else if (key.downArrow || input === "j") {
            setSelectedIndex(function (i) { return Math.min(lanes.length - 1, i + 1); });
        }
        // Enter to switch (only in navigate mode with no selections)
        else if (key.return && mode === "navigate" && checked.size === 0) {
            if (selectedLane) {
                onSelect(selectedLane, "switch");
                exit();
            }
        }
        // Space to toggle checkbox
        else if (input === " ") {
            if (selectedLane && !selectedLane.isMain) {
                var newChecked = new Set(checked);
                if (newChecked.has(selectedLane.name)) {
                    newChecked.delete(selectedLane.name);
                }
                else {
                    newChecked.add(selectedLane.name);
                }
                setChecked(newChecked);
                setMode(newChecked.size > 0 ? "select" : "navigate");
            }
        }
        // a to select all (non-main, non-current)
        else if (input === "a") {
            var allDeletable = lanes.filter(function (l) { return !l.isMain && !l.isCurrent; });
            if (checked.size === allDeletable.length) {
                // Deselect all if all selected
                setChecked(new Set());
                setMode("navigate");
            }
            else {
                setChecked(new Set(allDeletable.map(function (l) { return l.name; })));
                setMode("select");
            }
        }
        // d/x to delete selected
        else if (input === "d" || input === "x") {
            if (checked.size > 0) {
                if (deletableLanes.length > 0) {
                    setMode("confirm-delete");
                }
            }
            else if (selectedLane && !selectedLane.isMain && !selectedLane.isCurrent) {
                setChecked(new Set([selectedLane.name]));
                setMode("confirm-delete");
            }
        }
        // Escape to clear selection or quit
        else if (key.escape) {
            if (checked.size > 0) {
                setChecked(new Set());
                setMode("navigate");
            }
            else {
                exit();
            }
        }
        // q to quit
        else if (input === "q") {
            exit();
        }
    });
    if (mode === "confirm-delete") {
        return (<ink_1.Box flexDirection="column" padding={1}>
        <ink_1.Text bold color="red">
          Delete {deletableLanes.length} lane{deletableLanes.length !== 1 ? "s" : ""}?
        </ink_1.Text>
        <ink_1.Box flexDirection="column" marginY={1}>
          {deletableLanes.map(function (lane) { return (<ink_1.Text key={lane.name} color="yellow">  • {lane.name}</ink_1.Text>); })}
        </ink_1.Box>
        <ink_1.Text color="gray">This will remove the directories and branches.</ink_1.Text>
        <ink_1.Box marginTop={1}>
          <ink_1.Text>
            Press <ink_1.Text color="red" bold>y</ink_1.Text> to confirm, any other key to cancel
          </ink_1.Text>
        </ink_1.Box>
      </ink_1.Box>);
    }
    return (<ink_1.Box flexDirection="column" padding={1}>
      <ink_1.Box marginBottom={1}>
        <ink_1.Text bold color="blue">
          {mode === "select" ? "".concat(checked.size, " selected") : "Lanes"}
        </ink_1.Text>
      </ink_1.Box>

      {lanes.map(function (lane, index) {
            var isSelected = index === selectedIndex;
            var isChecked = checked.has(lane.name);
            var checkbox = lane.isMain ? "  " : isChecked ? "☑ " : "☐ ";
            var pointer = isSelected ? "❯" : " ";
            var nameColor = "white";
            if (lane.isCurrent)
                nameColor = "green";
            else if (isChecked)
                nameColor = "yellow";
            else if (isSelected)
                nameColor = "cyan";
            return (<ink_1.Box key={lane.name}>
            <ink_1.Text color={isSelected ? "cyan" : "gray"}>{pointer}</ink_1.Text>
            <ink_1.Text color={isChecked ? "yellow" : "gray"}>{checkbox}</ink_1.Text>
            <ink_1.Text bold color={nameColor}>
              {lane.name}
            </ink_1.Text>
            {lane.branch && (<ink_1.Text color="gray"> [{lane.branch}]</ink_1.Text>)}
            {lane.isMain && <ink_1.Text color="magenta"> ★</ink_1.Text>}
            {lane.isCurrent && <ink_1.Text color="green"> ← here</ink_1.Text>}
          </ink_1.Box>);
        })}

      <ink_1.Box marginTop={1} flexDirection="column">
        <ink_1.Text color="gray">
          ↑↓ move • Space select • a all • Enter switch • d delete • q quit
        </ink_1.Text>
        {checked.size > 0 && (<ink_1.Text color="yellow">
            {deletableLanes.length} selected (d to delete, Esc to clear)
          </ink_1.Text>)}
      </ink_1.Box>
    </ink_1.Box>);
}
