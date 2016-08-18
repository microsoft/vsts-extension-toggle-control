define(["require", "exports", "TFS/WorkItemTracking/Services", "TFS/WorkItemTracking/Contracts", "./InputParser", "./Model", "./View", "./ErrorView", "q"], function (require, exports, WitService, Contracts_1, InputParser_1, Model_1, View_1, ErrorView_1, Q) {
    "use strict";
    var Controller = (function () {
        function Controller() {
            this._fieldLabel = "";
            this._fieldName = "";
            this._inputs = {
                "FieldName": "",
                "TrueFieldValue": "",
                "TrueLabel": "",
                "FalseFieldValue": "",
                "FalseLabel": ""
            };
            this._initialize();
        }
        Controller.prototype._initialize = function () {
            var _this = this;
            this._inputs = VSS.getConfiguration().witInputs;
            this._fieldName = InputParser_1.InputParser.getFieldName(this._inputs);
            WitService.WorkItemFormService.getService().then(function (service) {
                Q.spread([service.getAllowedFieldValues(_this._fieldName), service.getFieldValue(_this._fieldName), service.getFields()], function (allowedValues, currentValue, fields) {
                    var _a = _this._getFieldInformation(_this._fieldName, fields), isBoolean = _a.isBoolean, fieldLabel = _a.fieldLabel;
                    var options = InputParser_1.InputParser.getOptions(_this._inputs, allowedValues, isBoolean);
                    _this._fieldLabel = fieldLabel;
                    _this._model = new Model_1.Model(_this._fieldLabel, options, currentValue);
                    _this._view = new View_1.View(_this._model, function () {
                        _this._model.toggle();
                        _this._updateInternal();
                    }, function () {
                        _this._model.toggleToTrueState();
                        _this._updateInternal();
                    }, function () {
                        _this._model.toggleToFalseState();
                        _this._updateInternal();
                    });
                }, _this._handleError).then(null, _this._handleError);
            }, this._handleError);
        };
        Controller.prototype._getFieldInformation = function (fieldname, fields) {
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var field = fields_1[_i];
                if (field.referenceName === fieldname) {
                    if (field.type === Contracts_1.FieldType.Boolean) {
                        return { isBoolean: true, fieldLabel: field.name };
                    }
                    return { isBoolean: false, fieldLabel: field.name };
                }
            }
            throw "Field not found.";
        };
        Controller.prototype._handleError = function (error) {
            var errorView = new ErrorView_1.ErrorView(error);
        };
        Controller.prototype._updateInternal = function () {
            var _this = this;
            WitService.WorkItemFormService.getService().then(function (service) {
                service.setFieldValue(_this._fieldName, _this._model.getSelectedValue()).then(function () {
                    _this._view.refresh();
                }, _this._handleError);
            }, this._handleError);
        };
        Controller.prototype.updateExternal = function (value) {
            this._model.setSelectedValue(value);
            this._view.refresh();
        };
        Controller.prototype.getFieldName = function () {
            return this._fieldName;
        };
        return Controller;
    }());
    exports.Controller = Controller;
});
