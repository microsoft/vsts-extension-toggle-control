/**
 * Purpose: This class is being used to display errors in the extension. 
 */

export class ErrorView {

    constructor(error: string) {
        let errorMessage: string = "Error: " + error;

        var warning = $("<div />");
        warning.text(errorMessage);
        warning.attr("title", errorMessage);
        warning.addClass("errorMessage");

        $("body").empty().append(warning);
    }
}
