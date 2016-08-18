import { expect } from 'chai';
import { Model } from './Model';
import { IControlConfigurations } from './IControlConfigurations';
import {IStateMetadata} from "./IStateMetadata"
import {ToggleState} from "./ToggleState"

describe("Model", () => {

    const fieldLabel: string = "Blocked"; 

    const TrueTrueMetadata: IStateMetadata = { value: "True", label: "True" };
    const FalseFalseMetadata: IStateMetadata = { value: "False", label: "False" };
    const TrueYesMetadata: IStateMetadata = { value: "True", label: "Yes" };
    const FalseNoMetadata: IStateMetadata = { value: "False", label: "No" };

    const config1: IControlConfigurations = { True: TrueTrueMetadata, False: FalseFalseMetadata };
    const config2: IControlConfigurations = { True: TrueYesMetadata, False: FalseNoMetadata };

    it("toggles state from true to false, sets selectedValue to False and stateMetadata to False metadata", () => {
        let model: Model = new Model(fieldLabel, config1, "True");
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.False);
        expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
    });

    it("toggles state from true to false, sets selectedValue to False and stateMetadata to False metadata.Then toggles to false again.", () => {
        let model: Model = new Model(fieldLabel, config1, "True");
        model.toggleToFalseState();
        model.toggleToFalseState();
        expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.False);
        expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
    });
    
    it("toggles state from true to true, sets selectedValue to True and stateMetadata to True metadata.Then toggles to false.", () => {
        let model: Model = new Model(fieldLabel, config1, "True");
        model.toggleToTrueState();
        expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.True);
        expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
        model.toggleToFalseState();
        expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.False);
        expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
    });

     it("toggles state from true to false, sets selectedValue to False and stateMetadata to False metadata.Then toggles to true.", () => {
        let model: Model = new Model(fieldLabel, config1, "True");
        model.toggleToFalseState();
        model.toggleToTrueState();
        expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.True);
        expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
    });

    it("toggles state from true to false then to true again, sets selectedValue to True and stateMetadata to True metadata", () => {
        let model = new Model(fieldLabel, config1, "True");
        model.toggle();
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.True);
        expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
    });

    it("sets selectedValue to a value not found in the configurations, then the toggleState is changed to indeterminate, then updates stateMetadata", () => {
        let model = new Model(fieldLabel, config1, "True");
        model.setSelectedValue("Foo");
        expect(model.getSelectedValue()).to.be.deep.equal("Foo");
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.Indeterminate);
        expect(model.getLabel()).to.be.deep.equal("Foo");
    });

    it("sets selectedValue to a value not found in the configurations, then toggles the state", () => {
        let model = new Model(fieldLabel, config1, "True");
        model.setSelectedValue("Foo");
        expect(model.getSelectedValue()).to.be.deep.equal("Foo");
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.Indeterminate);
        expect(model.getLabel()).to.be.deep.equal("Foo");
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.True);
        expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
    });

    it("sets selectedValue to a value not found in the configurations, then toggles the state, then toggles again", () => {
        let model = new Model(fieldLabel, config1, "True");
        model.setSelectedValue("Foo");
        expect(model.getSelectedValue()).to.be.deep.equal("Foo");
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.Indeterminate);
        expect(model.getLabel()).to.be.deep.equal("Foo");
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.True);
        expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.False);
        expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
    });

    it("sets selectedValue with an initial value not found in the configurations", () => {
        let model: Model = new Model(fieldLabel, config1, "Foo");
        expect(model.getSelectedValue()).to.be.deep.equal("Foo");
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.Indeterminate);
        expect(model.getLabel()).to.be.deep.equal("Foo");
    });

    it("sets selectedValue with an initial value not found in the configurations, then toggles", () => {
        let model: Model = new Model(fieldLabel, config2, "");
        expect(model.getSelectedValue()).to.be.deep.equal("");
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.Indeterminate);
        expect(model.getLabel()).to.be.deep.equal("");
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(TrueYesMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.True);
        expect(model.getLabel()).to.be.deep.equal(TrueYesMetadata.label);
    });

    it("sets selectedValue with an initial value not found in the configurations, toggles, then toggles again", () => {
        let model: Model = new Model(fieldLabel, config2, "blah");
        expect(model.getSelectedValue()).to.be.deep.equal("blah");
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.Indeterminate);
        expect(model.getLabel()).to.be.deep.equal("blah");
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(TrueYesMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.True);
        expect(model.getLabel()).to.be.deep.equal(TrueYesMetadata.label);
        model.toggle();
        expect(model.getSelectedValue()).to.be.deep.equal(FalseNoMetadata.value);
        expect(model.getToggleState()).to.be.deep.equal(ToggleState.False);
        expect(model.getLabel()).to.be.deep.equal(FalseNoMetadata.label);
    });
});