define(["require", "exports", "./Controller"], function (require, exports, Controller_1) {
    "use strict";
    var control;
    var provider = function () {
        return {
            onLoaded: function (workItemLoadedArgs) {
                control = new Controller_1.Controller();
            },
            onFieldChanged: function (fieldChangedArgs) {
                var changedValue = fieldChangedArgs.changedFields[control.getFieldName()];
                if (changedValue !== undefined) {
                    control.updateExternal(changedValue);
                }
            }
        };
    };
    VSS.register("nelsontroncoso.toggle-control-dev.toggle-control-contribution", provider);
});
