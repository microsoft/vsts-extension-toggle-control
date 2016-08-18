define(["require", "exports"], function (require, exports) {
    "use strict";
    var InputParser = (function () {
        function InputParser() {
        }
        InputParser.getFieldName = function (inputs) {
            if (inputs["FieldName"]) {
                return inputs["FieldName"];
            }
            throw ("FieldName not specified.");
        };
        InputParser.getOptions = function (inputs, allowedValues, isBoolean) {
            var trueFieldValue = "";
            var trueLabel = "";
            var falseFieldValue = "";
            var falseLabel = "";
            var allowedValuesString = allowedValues.map(String);
            if (!isBoolean) {
                if (allowedValuesString && allowedValuesString.length) {
                    if ((allowedValuesString.indexOf(inputs["TrueFieldValue"]) === -1) || (allowedValuesString.indexOf(inputs["FalseFieldValue"]) === -1)) {
                        throw "Inputs do not match allowed values.";
                    }
                }
                trueFieldValue = inputs["TrueFieldValue"];
                falseFieldValue = inputs["FalseFieldValue"];
            }
            else {
                trueFieldValue = "true";
                falseFieldValue = "false";
            }
            trueLabel = this._extractLabel(inputs["TrueLabel"], trueFieldValue);
            falseLabel = this._extractLabel(inputs["FalseLabel"], falseFieldValue);
            return this._buildOptions(trueFieldValue, trueLabel, falseFieldValue, falseLabel);
        };
        InputParser._extractLabel = function (rawLabel, fieldValue) {
            if (rawLabel) {
                return rawLabel;
            }
            return fieldValue;
        };
        InputParser._buildOptions = function (trueFieldValue, trueLabel, falseFieldValue, falseLabel) {
            return {
                True: { value: trueFieldValue, label: trueLabel },
                False: { value: falseFieldValue, label: falseLabel }
            };
        };
        return InputParser;
    }());
    exports.InputParser = InputParser;
});
