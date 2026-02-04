"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaneManager = LaneManager;
var react_1 = require("react");
var ink_1 = require("ink");
function LaneManager(_a) {
    var lanes = _a.lanes, onAction = _a.onAction;
    var _b = (0, react_1.useState)(Math.max(0, lanes.findIndex(function (l) { return l.isCurrent; }))), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = (0, react_1.useState)("list"), mode = _c[0], setMode = _c[1];
    var exit = (0, ink_1.useApp)().exit;
    var isRawModeSupported = (0, ink_1.useStdin)().isRawModeSupported;
    var selectedLane = lanes[selectedIndex];
    (0, react_1.useEffect)(function () {
        if (!isRawModeSupported) {
            exit();
        }
    }, [isRawModeSupported, exit]);
    (0, ink_1.useInput)(function (input, key) {
        if (mode === "confirm-delete") {
            if (input === "y" || input === "Y") {
                onAction("delete", selectedLane);
                exit();
            }
            else {
                setMode("list");
            }
            return;
        }
        if (key.upArrow || input === "k") {
            setSelectedIndex(function (i) { return Math.max(0, i - 1); });
        }
        else if (key.downArrow || input === "j") {
            setSelectedIndex(function (i) { return Math.min(lanes.length - 1, i + 1); });
        }
        else if (key.return || input === " ") {
            if (!selectedLane.isCurrent) {
                exit();
                onAction("switch", selectedLane);
            }
        }
        else if (input === "d" || input === "x") {
            if (!selectedLane.isMain && !selectedLane.isCurrent) {
                setMode("confirm-delete");
            }
        }
        else if (input === "s") {
            if (!selectedLane.isMain) {
                exit();
                onAction("sync", selectedLane);
            }
        }
        else if (input === "q" || key.escape) {
            exit();
            onAction("cancel", selectedLane);
        }
    });
    if (mode === "confirm-delete") {
        return (<ink_1.Box flexDirection="column" padding={1}>
        <ink_1.Text bold color="red">
          Delete lane "{selectedLane.name}"?
        </ink_1.Text>
        <ink_1.Text color="gray">
          This will remove the worktree at {selectedLane.path}
        </ink_1.Text>
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
          Manage Lanes
        </ink_1.Text>
      </ink_1.Box>

      {lanes.map(function (lane, index) {
            var isSelected = index === selectedIndex;
            var pointer = isSelected ? "❯" : " ";
            var nameColor = lane.isCurrent
                ? "green"
                : isSelected
                    ? "cyan"
                    : "white";
            return (<ink_1.Box key={lane.name} flexDirection="column">
            <ink_1.Box>
              <ink_1.Text color={isSelected ? "cyan" : "gray"}>{pointer} </ink_1.Text>
              <ink_1.Text bold color={nameColor}>
                {lane.name}
              </ink_1.Text>
              {lane.isMain && <ink_1.Text color="gray"> (main)</ink_1.Text>}
              {lane.isCurrent && <ink_1.Text color="green"> ← current</ink_1.Text>}
            </ink_1.Box>
            {isSelected && (<ink_1.Box marginLeft={3} flexDirection="column">
                <ink_1.Text color="gray">Branch: {lane.branch}</ink_1.Text>
                <ink_1.Text color="gray" dimColor>
                  {lane.path}
                </ink_1.Text>
              </ink_1.Box>)}
          </ink_1.Box>);
        })}

      <ink_1.Box marginTop={1} flexDirection="column">
        <ink_1.Text color="gray">
          ↑↓/jk: navigate • Enter/Space: switch • d: delete • s: sync • q: quit
        </ink_1.Text>
        {selectedLane.isMain && (<ink_1.Text color="yellow" dimColor>
            (Cannot delete main repository)
          </ink_1.Text>)}
        {selectedLane.isCurrent && !selectedLane.isMain && (<ink_1.Text color="yellow" dimColor>
            (Cannot delete current lane)
          </ink_1.Text>)}
      </ink_1.Box>
    </ink_1.Box>);
}
