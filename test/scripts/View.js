define(["require", "exports", "./ToggleState"], function (require, exports, ToggleState_1) {
    "use strict";
    var View = (function () {
        function View(model, onToggle, toggleToTrue, toggleToFalse) {
            this.onToggle = onToggle;
            this.toggleToTrue = toggleToTrue;
            this.toggleToFalse = toggleToFalse;
            this._model = model;
            this.create();
        }
        View.prototype.create = function () {
            var _this = this;
            this._container = $("<div role='button'> </div>");
            this._container.addClass("container");
            this._container.attr("tabindex", "0");
            this._toggle = $("<div> </div>");
            this._toggle.addClass("toggle");
            this._toggleLabel = $("<div> </div>");
            this._toggleLabel.addClass("toggleLabel");
            this._slider = $("<div> </div>");
            this._slider.addClass("slider");
            $("body").empty().append(this._container);
            $(this._container).empty().append(this._toggle);
            $(this._container).append(this._toggleLabel);
            $(this._toggle).append(this._slider);
            this.refresh();
            $(document).click(function () {
                _this.onToggle();
            }).bind("keydown", function (evt) {
                if (evt.keyCode == 32) {
                    _this.onToggle();
                }
                else if (evt.keyCode == 39) {
                    _this.toggleToTrue();
                }
                else if (evt.keyCode == 37) {
                    _this.toggleToFalse();
                }
            });
        };
        View.prototype.refresh = function () {
            switch (this._model.getToggleState()) {
                case ToggleState_1.ToggleState.True:
                    this._toggle.addClass("on");
                    this._container.attr("aria-pressed", "true");
                    this.showInfo();
                    break;
                case ToggleState_1.ToggleState.False:
                case ToggleState_1.ToggleState.Indeterminate:
                    this._toggle.removeClass("on");
                    this._container.attr("aria-pressed", "false");
                    this.showInfo();
                    break;
            }
        };
        View.prototype.showInfo = function () {
            $(this._toggleLabel).empty().prepend(this._model.getLabel());
            $(this._container).attr("title", this._model.getFieldLabel() +
                ": Value = " + this._model.getSelectedValue() + ", " + "Label = " + this._model.getLabel());
        };
        return View;
    }());
    exports.View = View;
});
