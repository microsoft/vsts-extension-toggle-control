import { expect } from "chai";
import { IToggleConfiguration } from "./ToggleContracts";
import { InputParser } from "./InputParser";

describe("InputParser", () => {
    const Empty: string = "";
    const Blocked: string = "Blocked";
    const Unblocked: string = "Unblocked";

    // test case: No labels provided
    const NoLabels: IToggleConfiguration = {
        FieldName: Blocked,
        TrueLabel: Empty,
        FalseLabel: Empty
    };

    // test case: Both labels provided
    const All: IToggleConfiguration = {
        FieldName: Blocked,
        TrueLabel: Blocked,
        FalseLabel: Unblocked
    };

    // test case: Only one label provided 
    const OneLabel: IToggleConfiguration = {
        FieldName: Blocked,
        TrueLabel: Blocked,
        FalseLabel: Empty
    };

    // fieldName is specified 
    it("gets the field name specified in dictionary", () => {
        expect(InputParser.getFieldName(NoLabels)).to.be.deep.equal("Blocked");
    });

    // fieldName is not specified
    it("throws when field name not specified", () => {
        expect(() => InputParser.getFieldName({
            "FieldName": ""
        } as any)).throw("FieldName not specified.");
    });

    // no Labels for a string field
    it("returns an interface with configurations. No labels are provided.", () => {
        expect(InputParser.getOptions(NoLabels, [], false)).to.be.deep.equal(
            { TrueLabel: "", FalseLabel: "" });
    });

    // both Labels are provided for a string field
    it("returns an interface with configurations. Both labels are provided.", () => {
        expect(InputParser.getOptions(All, [], false)).to.be.deep.equal(
            { TrueLabel: "Blocked", FalseLabel: "Unblocked" });
    });

    // only one label provided 
    it("returns an interface with configurations. In this case the user did not provide one label.", () => {
        expect(InputParser.getOptions(OneLabel, [], false)).to.be.deep.equal(
            { TrueLabel: "Blocked", FalseLabel: "" });
    });
});
