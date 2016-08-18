define(["require", "exports", "./ToggleState"], function (require, exports, ToggleState_1) {
    "use strict";
    var Model = (function () {
        function Model(fieldLabel, configurations, initialValue) {
            this._fieldLabel = "";
            this._selectedValue = "";
            this._configurations = {
                True: { value: "", label: "" },
                False: { value: "", label: "" }
            };
            this._stateMetadata = { value: "", label: "" };
            this._toggleState = ToggleState_1.ToggleState.Indeterminate;
            this._fieldLabel = fieldLabel;
            this._configurations = configurations;
            this.setSelectedValue(initialValue);
        }
        Model.prototype.toggle = function () {
            switch (this._toggleState) {
                case ToggleState_1.ToggleState.True:
                    this.setSelectedValue(this._configurations.False.value);
                    break;
                case ToggleState_1.ToggleState.False:
                    this.setSelectedValue(this._configurations.True.value);
                    break;
                case ToggleState_1.ToggleState.Indeterminate:
                    this.setSelectedValue(this._configurations.True.value);
                    break;
            }
        };
        Model.prototype.toggleToTrueState = function () {
            if (this._toggleState !== ToggleState_1.ToggleState.True) {
                this.setSelectedValue(this._configurations.True.value);
            }
        };
        Model.prototype.toggleToFalseState = function () {
            if (this._toggleState === ToggleState_1.ToggleState.True) {
                this.setSelectedValue(this._configurations.False.value);
            }
        };
        Model.prototype.setSelectedValue = function (val) {
            this._selectedValue = String(val);
            if (this._selectedValue === this._configurations.True.value) {
                this._toggleState = ToggleState_1.ToggleState.True;
                this._stateMetadata = this._configurations.True;
            }
            else if (this._selectedValue === this._configurations.False.value) {
                this._toggleState = ToggleState_1.ToggleState.False;
                this._stateMetadata = this._configurations.False;
            }
            else {
                this._toggleState = ToggleState_1.ToggleState.Indeterminate;
                this._stateMetadata = { value: this._selectedValue, label: this._selectedValue };
            }
        };
        Model.prototype.getSelectedValue = function () {
            return this._selectedValue;
        };
        Model.prototype.getLabel = function () {
            return this._stateMetadata.label;
        };
        Model.prototype.getFieldLabel = function () {
            return this._fieldLabel;
        };
        Model.prototype.getToggleState = function () {
            return this._toggleState;
        };
        return Model;
    }());
    exports.Model = Model;
});
