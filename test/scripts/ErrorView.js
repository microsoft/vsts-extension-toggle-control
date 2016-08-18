define(["require", "exports"], function (require, exports) {
    "use strict";
    var ErrorView = (function () {
        function ErrorView(error) {
            var errorMessage = "Error: " + error;
            var warning = $("<div />");
            warning.text(errorMessage);
            warning.attr("title", errorMessage);
            warning.addClass("errorMessage");
            $("body").empty().append(warning);
        }
        return ErrorView;
    }());
    exports.ErrorView = ErrorView;
});
