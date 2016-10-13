import { expect } from 'chai';
import { IControlConfigurations } from './IControlConfigurations';
import { InputParser } from "./InputParser"

describe("InputParser", () => {
    const FieldName: string = "FieldName";
    const TrueLabel: string = "TrueLabel";
    const FalseLabel: string = "FalseLabel";
    const Empty: string = "";
    const Blocked: string = "Blocked";
    const Unblocked: string = "Unblocked";

    //Test case: No labels provided
    const NoLabels: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueLabel: Empty,
        FalseLabel: Empty
    };

    //Test case: Both labels provided
    const All: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueLabel: Blocked,
        FalseLabel: Unblocked
    };

    //Test case: Only one label provided 
    const OneLabel: IDictionaryStringTo<string> = {
        FieldName: Blocked,
        TrueLabel: Blocked,
        FalseLabel: Empty
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

    //No Labels for a string field
    it("returns an interface with configurations. No labels are provided.", () => {
        expect(InputParser.getOptions(NoLabels, [], false)).to.be.deep.equal(
            { TrueLabel: "", FalseLabel: "" });
    });

    //Both Labels are provided for a string field
    it("returns an interface with configurations. Both labels are provided.", () => {
        expect(InputParser.getOptions(All, [], false)).to.be.deep.equal(
            { TrueLabel: "Blocked", FalseLabel: "Unblocked" });
    });

    //Only one label provided 
    it("returns an interface with configurations. In this case the user did not provide one label.", () => {
        expect(InputParser.getOptions(OneLabel, [], false)).to.be.deep.equal(
            { TrueLabel: "Blocked", FalseLabel: "" });
    });
});  