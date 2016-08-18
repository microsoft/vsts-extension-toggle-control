import { IControlConfigurations } from "./IControlConfigurations";
import { IStateMetadata } from "./IStateMetadata";
import { ToggleState } from "./ToggleState";


/**
 * Model takes inputs of options, an interface with True and False configurations from InputParser.
 * Each configuration will have a value and a label. Model also takes an
 * initialValue, which will be set as the _selectedValue to begin with. 
 * Model will change as toggle events occur within View or external updates are performed. 
 */
export class Model {

    constructor(fieldLabel: string, configurations: IControlConfigurations, initialValue: string) {
        this._fieldLabel = fieldLabel;
        this._configurations = configurations;
        this.setSelectedValue(initialValue);
    }

    private _fieldLabel: string = "";

    private _selectedValue: string = "";

    private _configurations: IControlConfigurations = {
        True: { value: "", label: "" },
        False: { value: "", label: "" }
    }

    private _stateMetadata: IStateMetadata = { value: "", label: "" };

    private _toggleState: ToggleState = ToggleState.Indeterminate;


    public toggle(): void {

        switch (this._toggleState) {
            case ToggleState.True:
                this.setSelectedValue(this._configurations.False.value);
                break;
            case ToggleState.False:
                this.setSelectedValue(this._configurations.True.value);
                break;
            case ToggleState.Indeterminate:
                this.setSelectedValue(this._configurations.True.value);
                break;
        }
    }

    public toggleToTrueState(): void {

        if (this._toggleState !== ToggleState.True) {
            this.setSelectedValue(this._configurations.True.value);
        }

    }

    public toggleToFalseState(): void {

         if (this._toggleState === ToggleState.True) {
            this.setSelectedValue(this._configurations.False.value);
        }

    }

    //  Sets a selected value. Also, it will change the _toggleState and _stateMetadata depending on the 
    //  value selected. If the selectedValue set is not part of any configuration, it will set _toggleState 
    //  to Indeterminate and it will set the value and label to the selectedValue.


    public setSelectedValue(val: string): void {

        this._selectedValue = String(val);

        if (this._selectedValue === this._configurations.True.value) {
            this._toggleState = ToggleState.True;
            this._stateMetadata = this._configurations.True;

        } else if (this._selectedValue === this._configurations.False.value) {
            this._toggleState = ToggleState.False;
            this._stateMetadata = this._configurations.False;

        } else {
            this._toggleState = ToggleState.Indeterminate;
            this._stateMetadata = { value: this._selectedValue, label: this._selectedValue };
        }
    }

    public getSelectedValue(): string {
        return this._selectedValue;
    }

    public getLabel(): string {
        return this._stateMetadata.label;
    }

    public getFieldLabel(): string {
        return this._fieldLabel;
    }


    public getToggleState(): ToggleState {
        return this._toggleState;
    }
}