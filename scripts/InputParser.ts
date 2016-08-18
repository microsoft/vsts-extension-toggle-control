import { IControlConfigurations } from "./IControlConfigurations";
import { IStateMetadata} from "./IStateMetadata";

export class InputParser {
    /**
     * Parses and gets a FieldName from a dictionary.
     * @param {IDictionaryStringTo<string>} inputs - The dictionary has the structure:
     *   {
     *      "FieldName": "Custom.String",
     *      "TrueFieldValue": "Yes",
     *      "TrueLabel": "Blocked",
     *      "FalseFieldValue": "No",
     *      "TrueLabel": "Unblocked",
     *   }
     * @return {string} The FieldName 
     * @throws Will throw an {string} error if a FieldName is not specified in the dictionary.
     */
    public static getFieldName(inputs: IDictionaryStringTo<string>): string {
        if (inputs["FieldName"]) {
            return inputs["FieldName"];
        }
        throw ("FieldName not specified.")
    }

    /**
     * Parses the inputs from a {IDictionaryStringTo<string>} dictionary.
     * @return an interface of the structure: {
     *          True: {value: string, label: string},
     *          False: {value: string, label: string}           
     *       }
     */
    public static getOptions(inputs: IDictionaryStringTo<string>, allowedValues: string[], isBoolean: boolean): IControlConfigurations {

        let trueFieldValue: string = "";
        let trueLabel: string = "";
        let falseFieldValue: string = "";
        let falseLabel: string = "";
        let allowedValuesString: string[] = allowedValues.map(String);

        if (!isBoolean) {
            if (allowedValuesString && allowedValuesString.length) {
                if ((allowedValuesString.indexOf(inputs["TrueFieldValue"]) === -1) || (allowedValuesString.indexOf(inputs["FalseFieldValue"]) === -1) ) {
                    throw "Inputs do not match allowed values.";
                }
            }
            trueFieldValue = inputs["TrueFieldValue"];
            falseFieldValue = inputs["FalseFieldValue"];
        } else {

            trueFieldValue = "true";
            falseFieldValue = "false";
        }

        trueLabel = this._extractLabel(inputs["TrueLabel"], trueFieldValue);
        falseLabel = this._extractLabel(inputs["FalseLabel"], falseFieldValue);

        return this._buildOptions(trueFieldValue, trueLabel, falseFieldValue, falseLabel);

    }

    private static _extractLabel(rawLabel: string, fieldValue: string): string {
        if (rawLabel) {
            return rawLabel;
        }
        return fieldValue;
    }

    private static _buildOptions(trueFieldValue: string, trueLabel: string, falseFieldValue: string, falseLabel: string): IControlConfigurations {

        return {
            True: { value: trueFieldValue, label: trueLabel },
            False: { value: falseFieldValue, label: falseLabel }
        }
    }
}