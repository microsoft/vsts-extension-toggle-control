import { IControlConfigurations } from "./ToggleContracts";

/**
 * Model takes inputs of options, an interface with True and False configurations from InputParser.
 * Each configuration will have a value and a label. Model also takes an
 * initialValue, which will be set as the _selectedValue to begin with. 
 * Model will change as toggle events occur within View or external updates are performed. 
 */
export class Model {

    constructor(fieldLabel: string, configurations: IControlConfigurations, initialValue: boolean) {
        this._fieldLabel = fieldLabel;
        this._configurations = configurations;
        this.setSelectedValue(initialValue);
    }

    private _fieldLabel: string = "";

    private _configurations: IControlConfigurations = {
        TrueLabel: "",
        FalseLabel: ""
    };

    private _stateLabel: string = "";

    private _toggleState: boolean = true;

    public toggle(): void {
        this.setSelectedValue(!this._toggleState);
    }

    public toggleToTrueState(): void {
        this.setSelectedValue(true);
    }

    public toggleToFalseState(): void {
        this.setSelectedValue(false);
    }

    // sets a selected value and change the _toggleState and _stateLabel
    public setSelectedValue(val: boolean): void {
        this._toggleState = val;

        if (val) {
            this._stateLabel = this._configurations.TrueLabel;
        } else {
            this._stateLabel = this._configurations.FalseLabel;
        }
    }

    public getLabel(): string {
        return this._stateLabel;
    }

    public getFieldLabel(): string {
        return this._fieldLabel;
    }

    public getToggleState(): boolean {
        return this._toggleState;
    }
}
