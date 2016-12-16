import { expect } from "chai";
import { Model } from "./Model";
import { IControlConfigurations } from "./ToggleContracts";

describe("Model", () => {
    const fieldLabel: string = "Blocked";
    const config1: IControlConfigurations = { TrueLabel: "True", FalseLabel: "False" };

    it("toggles state from true to false, sets selectedValue to False and stateMetadata to False metadata", () => {
        let model: Model = new Model(fieldLabel, config1, true);
        model.toggle();
        expect(model.getToggleState()).to.be.equal(false);
        expect(model.getLabel()).to.be.equal("False");
    });

    it(`toggles state from true to false, sets selectedValue to False 
    and stateMetadata to False metadata.
    Then toggles to false again.`, () => {
            let model: Model = new Model(fieldLabel, config1, true);
            model.toggleToFalseState();
            expect(model.getToggleState()).to.be.equal(false);
            expect(model.getLabel()).to.be.equal("False");
        });

    it("toggles state from true to true, sets selectedValue to True and stateMetadata to True metadata.Then toggles to false.", () => {
        let model: Model = new Model(fieldLabel, config1, true);
        model.toggleToTrueState();
        expect(model.getToggleState()).to.be.equal(true);
        expect(model.getLabel()).to.be.equal("True");
        model.toggleToFalseState();
        expect(model.getToggleState()).to.be.equal(false);
        expect(model.getLabel()).to.be.equal("False");
    });

    it("toggles state from true to false then to true again, sets selectedValue to True and stateMetadata to True metadata", () => {
        let model = new Model(fieldLabel, config1, true);
        model.toggle();
        model.toggle();
        expect(model.getToggleState()).to.be.equal(true);
        expect(model.getLabel()).to.be.equal("True");
    });
});
