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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("node", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    if (typeof document === 'undefined') {
        var jsdom = require("../node_modules/jsdom");
        var dom = new jsdom.JSDOM('<!DOCTYPE html><body></body>');
        if (!dom)
            throw new Error('Dom not set!');
        var document_1 = dom.window.document;
    }
    var Node = (function () {
        function Node(tagName, attributes, text) {
            this._document = document;
            this._root = this._current = tagName[0] === '#'
                ? this.getNodeById(tagName)
                : this.createNode(tagName, attributes, text);
        }
        Node.prototype.getNodeById = function (nodeId) {
            var document = this._document;
            if (!document)
                throw new Error("Document not set!");
            var element = document.getElementById(nodeId);
            if (!element)
                throw new Error('Element not found by id!');
            return element;
        };
        Node.prototype.createNode = function (tagName, attributes, text) {
            var document = this._document;
            if (!document)
                throw new Error("Document not set!");
            var node = document.createElement(tagName);
            if (attributes) {
                for (var key in attributes) {
                    var value = attributes[key];
                    node.setAttribute(key, value);
                }
            }
            if (text) {
                node.innerText = text;
            }
            return node;
        };
        Node.prototype.addClass = function (className) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var currentClass = this._current.className;
            this._current.setAttribute('class', (currentClass + " " + className).trimLeft());
            return this;
        };
        Node.prototype.getElementById = function (id) {
            var element = document.getElementById(id);
            if (element) {
                this._current = element;
            }
            return this;
        };
        Node.prototype.getElementByTagName = function (tagName) {
            if (this._root === undefined)
                throw new Error('Node not set!');
            var element = this._root.getElementsByTagName(tagName);
            return element;
        };
        Node.prototype.getElementByClass = function (className) {
            if (this._root === undefined)
                throw new Error('Node not set!');
            var element = this._root.getElementsByClassName(className);
            return element;
        };
        Node.prototype.hasElementByClass = function (className) {
            if (this._root === undefined)
                throw new Error('Node not set!');
            return this._root.getElementsByClassName(className).length !== 0;
        };
        Node.prototype.a = function (tagName, attributes, text, setCurrent) {
            return this.appendNode(tagName, attributes, text, setCurrent);
        };
        Node.prototype.prependNode_ = function (tagName, attributes, text) {
            return this.prependNode(tagName, attributes, text, true);
        };
        Node.prototype.prependNode = function (tagName, attributes, text, setCurrent) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var firstChild = this._current.firstChild;
            if (firstChild) {
                var HTMLElement_1 = this._current.insertBefore(this.createNode(tagName, attributes, text), firstChild);
                HTMLElement_1.innerText = text ? text : '';
                if (setCurrent === true) {
                    this._current = HTMLElement_1;
                }
            }
            return this;
        };
        Node.prototype.appendNode = function (tagName, attributes, text, setCurrent) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var HTMLElement = this._current.appendChild(this.createNode(tagName, attributes, text));
            HTMLElement.innerText = text ? text : '';
            if (setCurrent === true) {
                this._current = HTMLElement;
            }
            return this;
        };
        Node.prototype.a_ = function (tagName, attributes, text) {
            return this.appendNode(tagName, attributes, text, true);
        };
        Node.prototype.appendNode_ = function (tagName, attributes, text) {
            return this.appendNode(tagName, attributes, text, true);
        };
        Node.prototype.toHTML = function (outerHTML) {
            if (outerHTML === void 0) { outerHTML = true; }
            if (this._root === undefined)
                throw new Error('Node not set!');
            var root = this._root;
            return outerHTML ? root.outerHTML : root.innerHTML;
        };
        Node.prototype.setAttributes = function (attributes) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var node = this._current;
            for (var key in attributes) {
                var value = attributes[key];
                node.setAttribute(key, value);
            }
            return this;
        };
        Node.prototype.parent = function () {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var parent = this._current.parentElement;
            this._current = parent === null ? this._current : parent;
            return this;
        };
        Node.prototype._ = function () {
            return this.parent();
        };
        Node.prototype.prependElement = function (node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var childNode = node instanceof Node ? node.root() : node;
            var firstChild = this._current.firstChild;
            if (firstChild) {
                firstChild.insertBefore(childNode, null);
            }
            return this;
        };
        Node.prototype.prependElement_ = function (node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var childNode = node instanceof Node ? node.root() : node;
            var firstChild = this._current.firstChild;
            if (firstChild) {
                this._current = firstChild.insertBefore(childNode, null);
            }
            return this;
        };
        Node.prototype.appendElement = function (node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var childNode = node instanceof Node ? node.root() : node;
            this._current = this._current.appendChild(childNode);
            return this;
        };
        Node.prototype.appendElement_ = function (node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            var childNode = node instanceof Node ? node.root() : node;
            this._current.appendChild(childNode);
            return this;
        };
        Node.prototype.gotoRoot = function () {
            this._current = this._root;
            return this;
        };
        Node.prototype.root = function () {
            if (this._root === undefined)
                throw new Error('Root node not defined!');
            return this._root;
        };
        Object.defineProperty(Node.prototype, "id", {
            get: function () {
                if (this._current === undefined)
                    throw new Error('Node not set!');
                return this._current.getAttribute('id');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "innerHTML", {
            set: function (html) {
                if (this._current === undefined)
                    throw new Error('Node not set!');
                this._current.innerHTML = html;
            },
            enumerable: false,
            configurable: true
        });
        return Node;
    }());
    exports.default = Node;
});
define("bsnode", ["require", "exports", "node"], function (require, exports, node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    node_1 = __importDefault(node_1);
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
    }(node_1.default));
    exports.default = BsNode;
});
//# sourceMappingURL=node.js.map