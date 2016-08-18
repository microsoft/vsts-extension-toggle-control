import { expect } from 'chai';
import { IControlConfigurations } from './IControlConfigurations';
import { IStateMetadata } from "./IStateMetadata"
import { InputParser } from "./InputParser"

describe("InputParser", () => {
    const FieldName: string = "FieldName";
    const TrueFieldValue: string = "TrueFieldValue";
    const FalseFieldValue: string = "FalseFieldValue";
    const TrueLabel: string = "TrueLabel";
    const FalseLabel: string = "FalseLabel";
    const Yes: string = "Yes";
    const No: string = "No";
    const Empty: string = "";
    const Blocked: string = "Blocked";
    const Unblocked: string = "Unblocked";

    //Test case: No labels provided
    const NoLabels: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueFieldValue: Yes,
        TrueLabel: Empty,
        FalseFieldValue: No,
        FalseLabel: Empty
    };

    //Test case: Values and labels provided
    const All: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueFieldValue: Yes,
        TrueLabel: Blocked,
        FalseFieldValue: No,
        FalseLabel: Unblocked
    };

    //Test case: No values and no labels provided 
    const NoValuesNoLabels: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueFieldValue: Empty,
        TrueLabel: Empty,
        FalseFieldValue: Empty,
        FalseLabel: Empty
    };

    //Test case: No values provided 
    const NoValues: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueFieldValue: Empty,
        TrueLabel: Yes,
        FalseFieldValue: Empty,
        FalseLabel: No
    };
    
    //Test case: Only one label provided 
    const OneLabel: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueFieldValue: Yes,
        TrueLabel: Blocked,
        FalseFieldValue: No,
        FalseLabel: Empty
    };

    //Test case: Only one value provided 
    const OneValue: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueFieldValue: Yes,
        TrueLabel: Blocked,
        FalseFieldValue: Empty,
        FalseLabel: Unblocked
    };

    //FieldName is specified 
    it("gets the field name specified in dictionary", () => {
        expect(InputParser.getFieldName(NoLabels)).to.be.deep.equal("Blocked");
    });

    //FieldName is not specified
    it("throws when field name not specified", () => {
        expect(() => InputParser.getFieldName({
            "FieldName": ""
        })).throw("FieldName not specified.");
    });

    //Only Values are provided, no Labels for a string field
    it("returns an interface with configurations. In this case just FieldValues are provided. Also, this was not a boolean field. ", () => {
        expect(InputParser.getOptions(NoLabels, [], false)).to.be.deep.equal(
            { True: { value: "Yes", label: "Yes" }, False: { value: "No", label: "No" } })
    });

    //Both Values and Labels are provided for a string field
    it("returns an interface with configurations. In this case FieldValues and Labels are provided. Also, this was not a boolean field.", () => {
        expect(InputParser.getOptions(All, [], false)).to.be.deep.equal(
            { True: { value: "Yes", label: "Blocked" }, False: { value: "No", label: "Unblocked" } })
    });

    //No Values or Labels provided for a boolean field
    it("returns an interface with configurations. In this case FieldValues and Labels are not provided. Also, this was a boolean field.", () => {
        expect(InputParser.getOptions(NoValuesNoLabels, [], true)).to.be.deep.equal(
            { True: { value: "true", label: "true" }, False: { value: "false", label: "false" } })
    });

    //Only Labels provided, no Values for a boolean field
    it("returns an interface with configurations. In this case just Labels are provided. Also, this is a boolean field.", () => {
        expect(InputParser.getOptions(NoValues, [], true)).to.be.deep.equal(
            { True: { value: "true", label: "Yes" }, False: { value: "false", label: "No" } })
    });

    //No Values or Labels provided for a string field
    it("returns an interface with configurations. In this case the user did not provide any input in a String field or provided empty strings.", () => {
        expect(InputParser.getOptions(NoValuesNoLabels, [], false)).to.be.deep.equal(
            { True: { value: "", label: "" }, False: { value: "", label: "" } })
    });
    
    //Only one label provided 
    it("returns an interface with configurations. In this case the user did not provide one label.", () => {
        expect(InputParser.getOptions(OneLabel, [], false)).to.be.deep.equal(
            { True: { value: "Yes", label: "Blocked" }, False: { value: "No", label: "No" } })
    });

    //Only one value provided
    it("returns an interface with configurations. In this case the user did not provide one value.", () => {
        expect(InputParser.getOptions(OneValue, [], false)).to.be.deep.equal(
            { True: { value: "Yes", label: "Blocked" }, False: { value: "", label: "Unblocked" } })
    });

    //No TrueFieldValue was found
    it("throws when TrueFieldValue is not found in allowedFieldValues", () => {
        expect(() => InputParser.getOptions(NoLabels, ["allowed1", "No"], false)).throw("Inputs do not match allowed values.");
    });

    //No FalseFieldValue was found
    it("throws when FalseFieldValue is not found in allowedFieldValues", () => {
        expect(() => InputParser.getOptions(NoLabels, ["Yes", "allowed2"], false)).throw("Inputs do not match allowed values.");
    });
});  