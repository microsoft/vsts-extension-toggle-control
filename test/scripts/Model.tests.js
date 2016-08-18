define(["require", "exports", 'chai', './Model', "./ToggleState"], function (require, exports, chai_1, Model_1, ToggleState_1) {
    "use strict";
    describe("Model", function () {
        var fieldLabel = "Blocked";
        var TrueTrueMetadata = { value: "True", label: "True" };
        var FalseFalseMetadata = { value: "False", label: "False" };
        var TrueYesMetadata = { value: "True", label: "Yes" };
        var FalseNoMetadata = { value: "False", label: "No" };
        var config1 = { True: TrueTrueMetadata, False: FalseFalseMetadata };
        var config2 = { True: TrueYesMetadata, False: FalseNoMetadata };
        it("toggles state from true to false, sets selectedValue to False and stateMetadata to False metadata", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.False);
            chai_1.expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
        });
        it("toggles state from true to false, sets selectedValue to False and stateMetadata to False metadata.Then toggles to false again.", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.toggleToFalseState();
            model.toggleToFalseState();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.False);
            chai_1.expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
        });
        it("toggles state from true to true, sets selectedValue to True and stateMetadata to True metadata.Then toggles to false.", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.toggleToTrueState();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.True);
            chai_1.expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
            model.toggleToFalseState();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.False);
            chai_1.expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
        });
        it("toggles state from true to false, sets selectedValue to False and stateMetadata to False metadata.Then toggles to true.", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.toggleToFalseState();
            model.toggleToTrueState();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.True);
            chai_1.expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
        });
        it("toggles state from true to false then to true again, sets selectedValue to True and stateMetadata to True metadata", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.toggle();
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.True);
            chai_1.expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
        });
        it("sets selectedValue to a value not found in the configurations, then the toggleState is changed to indeterminate, then updates stateMetadata", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.setSelectedValue("Foo");
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal("Foo");
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.Indeterminate);
            chai_1.expect(model.getLabel()).to.be.deep.equal("Foo");
        });
        it("sets selectedValue to a value not found in the configurations, then toggles the state", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.setSelectedValue("Foo");
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal("Foo");
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.Indeterminate);
            chai_1.expect(model.getLabel()).to.be.deep.equal("Foo");
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.True);
            chai_1.expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
        });
        it("sets selectedValue to a value not found in the configurations, then toggles the state, then toggles again", function () {
            var model = new Model_1.Model(fieldLabel, config1, "True");
            model.setSelectedValue("Foo");
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal("Foo");
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.Indeterminate);
            chai_1.expect(model.getLabel()).to.be.deep.equal("Foo");
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(TrueTrueMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.True);
            chai_1.expect(model.getLabel()).to.be.deep.equal(TrueTrueMetadata.label);
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(FalseFalseMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.False);
            chai_1.expect(model.getLabel()).to.be.deep.equal(FalseFalseMetadata.label);
        });
        it("sets selectedValue with an initial value not found in the configurations", function () {
            var model = new Model_1.Model(fieldLabel, config1, "Foo");
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal("Foo");
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.Indeterminate);
            chai_1.expect(model.getLabel()).to.be.deep.equal("Foo");
        });
        it("sets selectedValue with an initial value not found in the configurations, then toggles", function () {
            var model = new Model_1.Model(fieldLabel, config2, "");
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal("");
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.Indeterminate);
            chai_1.expect(model.getLabel()).to.be.deep.equal("");
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(TrueYesMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.True);
            chai_1.expect(model.getLabel()).to.be.deep.equal(TrueYesMetadata.label);
        });
        it("sets selectedValue with an initial value not found in the configurations, toggles, then toggles again", function () {
            var model = new Model_1.Model(fieldLabel, config2, "blah");
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal("blah");
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.Indeterminate);
            chai_1.expect(model.getLabel()).to.be.deep.equal("blah");
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(TrueYesMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.True);
            chai_1.expect(model.getLabel()).to.be.deep.equal(TrueYesMetadata.label);
            model.toggle();
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(FalseNoMetadata.value);
            chai_1.expect(model.getToggleState()).to.be.deep.equal(ToggleState_1.ToggleState.False);
            chai_1.expect(model.getLabel()).to.be.deep.equal(FalseNoMetadata.label);
        });
    });
});
