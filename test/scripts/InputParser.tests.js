define(["require", "exports", 'chai', "./InputParser"], function (require, exports, chai_1, InputParser_1) {
    "use strict";
    describe("InputParser", function () {
        var FieldName = "FieldName";
        var TrueFieldValue = "TrueFieldValue";
        var FalseFieldValue = "FalseFieldValue";
        var TrueLabel = "TrueLabel";
        var FalseLabel = "FalseLabel";
        var Yes = "Yes";
        var No = "No";
        var Empty = "";
        var Blocked = "Blocked";
        var Unblocked = "Unblocked";
        var NoLabels = {
            FieldName: Blocked,
            TrueFieldValue: Yes,
            TrueLabel: Empty,
            FalseFieldValue: No,
            FalseLabel: Empty
        };
        var All = {
            FieldName: Blocked,
            TrueFieldValue: Yes,
            TrueLabel: Blocked,
            FalseFieldValue: No,
            FalseLabel: Unblocked
        };
        var NoValuesNoLabels = {
            FieldName: Blocked,
            TrueFieldValue: Empty,
            TrueLabel: Empty,
            FalseFieldValue: Empty,
            FalseLabel: Empty
        };
        var NoValues = {
            FieldName: Blocked,
            TrueFieldValue: Empty,
            TrueLabel: Yes,
            FalseFieldValue: Empty,
            FalseLabel: No
        };
        var OneLabel = {
            FieldName: Blocked,
            TrueFieldValue: Yes,
            TrueLabel: Blocked,
            FalseFieldValue: No,
            FalseLabel: Empty
        };
        var OneValue = {
            FieldName: Blocked,
            TrueFieldValue: Yes,
            TrueLabel: Blocked,
            FalseFieldValue: Empty,
            FalseLabel: Unblocked
        };
        it("gets the field name specified in dictionary", function () {
            chai_1.expect(InputParser_1.InputParser.getFieldName(NoLabels)).to.be.deep.equal("Blocked");
        });
        it("throws when field name not specified", function () {
            chai_1.expect(function () { return InputParser_1.InputParser.getFieldName({
                "FieldName": ""
            }); }).throw("FieldName not specified.");
        });
        it("returns an interface with configurations. In this case just FieldValues are provided. Also, this was not a boolean field. ", function () {
            chai_1.expect(InputParser_1.InputParser.getOptions(NoLabels, [], false)).to.be.deep.equal({ True: { value: "Yes", label: "Yes" }, False: { value: "No", label: "No" } });
        });
        it("returns an interface with configurations. In this case FieldValues and Labels are provided. Also, this was not a boolean field.", function () {
            chai_1.expect(InputParser_1.InputParser.getOptions(All, [], false)).to.be.deep.equal({ True: { value: "Yes", label: "Blocked" }, False: { value: "No", label: "Unblocked" } });
        });
        it("returns an interface with configurations. In this case FieldValues and Labels are not provided. Also, this was a boolean field.", function () {
            chai_1.expect(InputParser_1.InputParser.getOptions(NoValuesNoLabels, [], true)).to.be.deep.equal({ True: { value: "true", label: "true" }, False: { value: "false", label: "false" } });
        });
        it("returns an interface with configurations. In this case just Labels are provided. Also, this is a boolean field.", function () {
            chai_1.expect(InputParser_1.InputParser.getOptions(NoValues, [], true)).to.be.deep.equal({ True: { value: "true", label: "Yes" }, False: { value: "false", label: "No" } });
        });
        it("returns an interface with configurations. In this case the user did not provide any input in a String field or provided empty strings.", function () {
            chai_1.expect(InputParser_1.InputParser.getOptions(NoValuesNoLabels, [], false)).to.be.deep.equal({ True: { value: "", label: "" }, False: { value: "", label: "" } });
        });
        it("returns an interface with configurations. In this case the user did not provide one label.", function () {
            chai_1.expect(InputParser_1.InputParser.getOptions(OneLabel, [], false)).to.be.deep.equal({ True: { value: "Yes", label: "Blocked" }, False: { value: "No", label: "No" } });
        });
        it("returns an interface with configurations. In this case the user did not provide one value.", function () {
            chai_1.expect(InputParser_1.InputParser.getOptions(OneValue, [], false)).to.be.deep.equal({ True: { value: "Yes", label: "Blocked" }, False: { value: "", label: "Unblocked" } });
        });
        it("throws when TrueFieldValue is not found in allowedFieldValues", function () {
            chai_1.expect(function () { return InputParser_1.InputParser.getOptions(NoLabels, ["allowed1", "No"], false); }).throw("Inputs do not match allowed values.");
        });
        it("throws when FalseFieldValue is not found in allowedFieldValues", function () {
            chai_1.expect(function () { return InputParser_1.InputParser.getOptions(NoLabels, ["Yes", "allowed2"], false); }).throw("Inputs do not match allowed values.");
        });
    });
});
