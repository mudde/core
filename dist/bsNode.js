"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = require("./Node");
var BsNode = (function (_super) {
    __extends(BsNode, _super);
    function BsNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BsNode.prototype.formGroup = function () {
        this.appendNode('div', { class: 'form-control' });
        return this;
    };
    BsNode.prototype.formGroup_ = function () {
        this.appendNode_('div', { class: 'form-control' });
        return this;
    };
    BsNode.prototype.inputGroupText = function (text) {
        this.appendNode('span', { class: 'input-group-text' }, text);
        return this;
    };
    BsNode.prototype.inputGroupText_ = function (text) {
        this.appendNode_('span', { class: 'form-group-text' }, text);
        return this;
    };
    BsNode.prototype.inputGroup = function () {
        this.appendNode('div', { class: 'input-control mb-1' });
        return this;
    };
    BsNode.prototype.inputGroup_ = function () {
        this.appendNode_('div', { class: 'input-control mb-1' });
        return this;
    };
    BsNode.prototype.label = function (label, forAttribute, attributes) {
        this.appendNode('label', __assign(__assign({}, attributes), { class: 'form-label', for: forAttribute }), label);
        return this;
    };
    BsNode.prototype.label_ = function (label, forAttribute, attributes) {
        this.appendNode_('label', __assign(__assign({}, attributes), { class: 'form-label', for: forAttribute }), label);
        return this;
    };
    BsNode.prototype.input = function (type, id) {
        this.appendNode('input', { 'class': 'form-control', type: type, id: id });
        return this;
    };
    BsNode.prototype.input_ = function (type, id) {
        this.appendNode_('input', { class: 'form-control', type: type, id: id });
        return this;
    };
    BsNode.prototype.help = function (text, id) {
        this.appendNode('span', { class: 'form-text', id: id }, text);
        return this;
    };
    BsNode.prototype.help_ = function (text, id) {
        this.appendNode_('span', { class: 'form-text', id: id }, text);
        return this;
    };
    BsNode.prototype.span = function (text, attributes) {
        var attr = attributes ? attributes : {};
        this.appendNode('span', attr, text);
        return this;
    };
    BsNode.prototype.span_ = function (text, attributes) {
        var attr = attributes ? attributes : {};
        this.appendNode_('span', attr, text);
        return this;
    };
    return BsNode;
}(Node_1.default));
exports.default = BsNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnNOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2JzTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUF5QjtBQUV6QjtJQUFvQywwQkFBSTtJQUF4Qzs7SUF5RkEsQ0FBQztJQXZGRSwwQkFBUyxHQUFUO1FBQ0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUVqRCxPQUFPLElBQUksQ0FBQTtJQUNkLENBQUM7SUFFRCwyQkFBVSxHQUFWO1FBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUVsRCxPQUFPLElBQUksQ0FBQTtJQUNkLENBQUM7SUFFRCwrQkFBYyxHQUFkLFVBQWUsSUFBWTtRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRTVELE9BQU8sSUFBSSxDQUFBO0lBQ2QsQ0FBQztJQUVELGdDQUFlLEdBQWYsVUFBZ0IsSUFBWTtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRTVELE9BQU8sSUFBSSxDQUFBO0lBQ2QsQ0FBQztJQUVELDJCQUFVLEdBQVY7UUFDRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7UUFFdkQsT0FBTyxJQUFJLENBQUE7SUFDZCxDQUFDO0lBRUQsNEJBQVcsR0FBWDtRQUNHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtR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