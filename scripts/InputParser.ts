import { IToggleConfiguration, IControlConfigurations } from "./ToggleContracts";

export class InputParser {
    /**
     * Parses and gets a FieldName from a dictionary.
     * @param {IDictionaryStringTo<string>} inputs - The dictionary has the structure:
     *   {
     *      "FieldName": "Custom.String",
     *      "TrueLabel": "Blocked",
     *      "FalseLabel": "Unblocked",
     *   }
     * @return {string} The FieldName 
     * @throws Will throw an {string} error if a FieldName is not specified in the dictionary.
     */
    public static getFieldName(inputs: IToggleConfiguration): string {
        if (inputs.FieldName) {
            return inputs.FieldName;
        }
        throw ("FieldName not specified.");
    }

    /**
     * Parses the inputs from a {IDictionaryStringTo<string>} dictionary.
     * @return an interface of the structure: {
     *          TrueLabel: string
     *          FalseLabel: string         
     *       }
     */
    public static getOptions(inputs: IToggleConfiguration, allowedValues: string[], isBoolean: boolean): IControlConfigurations {
        let trueLabel: string = "";
        let falseLabel: string = "";
        trueLabel = inputs.TrueLabel;
        falseLabel = inputs.FalseLabel;

        return this._buildOptions(trueLabel, falseLabel);
    }

    private static _buildOptions(trueLabel: string, falseLabel: string): IControlConfigurations {
        return {
            TrueLabel: trueLabel,
            FalseLabel: falseLabel
        };
    }
}