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
var NodeCore_1 = require("./NodeCore");
var BsNodeCore = (function (_super) {
    __extends(BsNodeCore, _super);
    function BsNodeCore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BsNodeCore.prototype.formGroup = function () {
        this.appendNode('div', { class: 'form-control' });
        return this;
    };
    BsNodeCore.prototype.formGroup_ = function () {
        this.appendNode_('div', { class: 'form-control' });
        return this;
    };
    BsNodeCore.prototype.inputGroupText = function (text) {
        this.appendNode('span', { class: 'input-group-text' }, text);
        return this;
    };
    BsNodeCore.prototype.inputGroupText_ = function (text) {
        this.appendNode_('span', { class: 'form-group-text' }, text);
        return this;
    };
    BsNodeCore.prototype.inputGroup = function () {
        this.appendNode('div', { class: 'input-control mb-1' });
        return this;
    };
    BsNodeCore.prototype.inputGroup_ = function () {
        this.appendNode_('div', { class: 'input-control mb-1' });
        return this;
    };
    BsNodeCore.prototype.label = function (label, forAttribute, attributes) {
        this.appendNode('label', __assign(__assign({}, attributes), { class: 'form-label', for: forAttribute }), label);
        return this;
    };
    BsNodeCore.prototype.label_ = function (label, forAttribute, attributes) {
        this.appendNode_('label', __assign(__assign({}, attributes), { class: 'form-label', for: forAttribute }), label);
        return this;
    };
    BsNodeCore.prototype.input = function (type, id) {
        this.appendNode('input', { 'class': 'form-control', type: type, id: id });
        return this;
    };
    BsNodeCore.prototype.input_ = function (type, id) {
        this.appendNode_('input', { class: 'form-control', type: type, id: id });
        return this;
    };
    BsNodeCore.prototype.help = function (text, id) {
        this.appendNode('span', { class: 'form-text', id: id }, text);
        return this;
    };
    BsNodeCore.prototype.help_ = function (text, id) {
        this.appendNode_('span', { class: 'form-text', id: id }, text);
        return this;
    };
    BsNodeCore.prototype.span = function (text, attributes) {
        var attr = attributes ? attributes : {};
        this.appendNode('span', attr, text);
        return this;
    };
    BsNodeCore.prototype.span_ = function (text, attributes) {
        var attr = attributes ? attributes : {};
        this.appendNode_('span', attr, text);
        return this;
    };
    return BsNodeCore;
}(NodeCore_1.default));
exports.default = BsNodeCore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnNOb2RlQ29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ic05vZGVDb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTZCO0FBRTdCO0lBQXdDLDhCQUFJO0lBQTVDOztJQXlGQSxDQUFDO0lBdkZFLDhCQUFTLEdBQVQ7UUFDRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBO1FBRWpELE9BQU8sSUFBSSxDQUFBO0lBQ2QsQ0FBQztJQUVELCtCQUFVLEdBQVY7UUFDRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBO1FBRWxELE9BQU8sSUFBSSxDQUFBO0lBQ2QsQ0FBQztJQUVELG1DQUFjLEdBQWQsVUFBZSxJQUFZO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFNUQsT0FBTyxJQUFJLENBQUE7SUFDZCxDQUFDO0lBRUQsb0NBQWUsR0FBZixVQUFnQixJQUFZO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFNUQsT0FBTyxJQUFJLENBQUE7SUFDZCxDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUNHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtRQUV2RCxPQUFPLElBQUksQ0FBQTtJQUNkLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsQ0FB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