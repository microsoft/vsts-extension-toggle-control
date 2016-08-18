define(["require", "exports"], function (require, exports) {
    "use strict";
    (function (ToggleState) {
        ToggleState[ToggleState["True"] = 0] = "True";
        ToggleState[ToggleState["False"] = 1] = "False";
        ToggleState[ToggleState["Indeterminate"] = 2] = "Indeterminate";
    })(exports.ToggleState || (exports.ToggleState = {}));
    var ToggleState = exports.ToggleState;
});
