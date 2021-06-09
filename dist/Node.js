"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = (function () {
    function Node(tagName, attributes, text, documentX) {
        this._idSearch = [];
        this._document = documentX !== null && documentX !== void 0 ? documentX : document;
        this._root = this._current = tagName[0] === '#'
            ? this.getNodeById(tagName.substr(1))
            : this.createNode(tagName, attributes, text);
    }
    Node.prototype.getNodeById = function (nodeId) {
        var document = this.document;
        var element = document.getElementById(nodeId);
        if (!element)
            throw new Error('Element not found by id!');
        return element;
    };
    Node.prototype.createNode = function (tagName, attributes, text) {
        var document = this.document;
        var node = document.createElement(tagName);
        if (attributes) {
            for (var key in attributes) {
                var value = attributes[key];
                if (key === 'id') {
                    this._idSearch[value] = node;
                }
                node.setAttribute(key, value);
            }
        }
        if (text) {
            node.innerText = text;
        }
        return node;
    };
    Node.prototype.moveInNode = function (callable) {
        var current = this.current;
        var tmpNode = this.document.createElement('div');
        current.replaceWith(tmpNode);
        var newNodeRaw = callable(current);
        var newNode = this.importElement(newNodeRaw);
        tmpNode.replaceWith(newNode);
        return this;
    };
    Node.prototype.removeChild = function (node) {
        var nodeX = node instanceof Node ? node.root : node;
        this.current.removeChild(nodeX);
        return this;
    };
    Node.prototype.addSibling_ = function (tagName, attributes, text) {
        return this.addSibling(tagName, attributes, text, true);
    };
    Node.prototype.addSibling = function (tagName, attributes, text, setCurrent) {
        if (setCurrent === void 0) { setCurrent = false; }
        var newNode = this.createNode(tagName, attributes, text);
        var parent = this.current.parentNode;
        parent === null || parent === void 0 ? void 0 : parent.insertBefore(newNode, this.current);
        if (setCurrent) {
            this._current = newNode;
        }
        return this;
    };
    Node.prototype.addSiblingNode_ = function (node) {
        return this.addSiblingNode(node, true);
    };
    Node.prototype.addSiblingNode = function (node, setCurrent) {
        if (setCurrent === void 0) { setCurrent = false; }
        var newNode = this.importElement(node);
        var current = this.current;
        var parent = current.parentElement;
        parent === null || parent === void 0 ? void 0 : parent.insertBefore(newNode, current);
        if (setCurrent) {
            this._current = newNode;
        }
        return this;
    };
    Node.prototype.addClass = function (className) {
        var currentClass = this.current.className;
        this.current.setAttribute('class', (currentClass + " " + className).trimLeft());
        return this;
    };
    Node.prototype.removeClass = function (className) {
        var currentClass = ' ' + this.current.className + ' ';
        this.current.setAttribute('class', currentClass.replace(' ' + className + ' ', ' ').trim());
        return this;
    };
    Node.prototype.clear = function () {
        var root = this._current = this.root;
        root.innerHTML = '';
    };
    Node.prototype.getAttribute = function (name) {
        return this.current.getAttribute(name);
    };
    Node.prototype.getElementById = function (id) {
        if (id in this._idSearch) {
            this._current = this._idSearch[id];
        }
        return this;
    };
    Node.prototype.getElementByTagName = function (tagName) {
        var element = this.root.getElementsByTagName(tagName);
        return element;
    };
    Node.prototype.getElementByClass = function (className) {
        var element = this.root.getElementsByClassName(className);
        return element;
    };
    Node.prototype.hasAttribute = function (name) {
        return this.current.hasAttribute(name);
    };
    Node.prototype.hasElementById = function (id) {
        return id in this._idSearch;
    };
    Node.prototype.hasElementByClass = function (className) {
        return this.root.getElementsByClassName(className).length !== 0;
    };
    Node.prototype.a = function (tagName, attributes, text, setCurrent) {
        return this.appendNode(tagName, attributes, text, setCurrent);
    };
    Node.prototype.prependNode_ = function (tagName, attributes, text) {
        return this.prependNode(tagName, attributes, text, true);
    };
    Node.prototype.prependNode = function (tagName, attributes, text, setCurrent) {
        var firstChild = this.current.firstChild;
        if (firstChild) {
            var HTMLElement_1 = this.current.insertBefore(this.createNode(tagName, attributes, text), firstChild);
            if (setCurrent === true) {
                this._current = HTMLElement_1;
            }
        }
        return this;
    };
    Node.prototype.appendNode = function (tagName, attributes, text, setCurrent) {
        if (setCurrent === void 0) { setCurrent = false; }
        var newNode = this.createNode(tagName, attributes, text);
        var HTMLElement = this.current.appendChild(newNode);
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
        var root = this.root;
        return outerHTML ? root.outerHTML : root.innerHTML;
    };
    Node.prototype.setAttributes = function (attributes) {
        var node = this.current;
        for (var key in attributes) {
            var value = attributes[key];
            if (key === 'id') {
                this._idSearch[value] = node;
            }
            node.setAttribute(key, value);
        }
        return this;
    };
    Node.prototype.parent = function () {
        var parent = this.current.parentElement;
        this._current = parent === null ? this.current : parent;
        return this;
    };
    Node.prototype._ = function () {
        return this.parent();
    };
    Node.prototype.prependElement = function (node) {
        if (node === null)
            return this;
        var childNode = this.importElement(node);
        var firstChild = this.current.firstChild;
        if (firstChild) {
            this.current.insertBefore(childNode, firstChild);
        }
        this._current = childNode;
        return this;
    };
    Node.prototype.prependElement_ = function (node) {
        if (node === null)
            return this;
        var childNode = this.importElement(node);
        var firstChild = this.current.firstChild;
        if (firstChild) {
            this.current.insertBefore(childNode, firstChild);
        }
        return this;
    };
    Node.prototype.appendElement = function (node) {
        if (node === null)
            return this;
        var childNode = this.importElement(node);
        this._current = this.current.appendChild(childNode);
        return this;
    };
    Node.prototype.importElement = function (node) {
        if (!(node instanceof Node)) {
            return node;
        }
        var childIdNodes = node._idSearch;
        for (var key in childIdNodes) {
            this._idSearch[key] = childIdNodes[key];
        }
        return node.root;
    };
    Node.prototype.appendElement_ = function (node) {
        if (node === null)
            return this;
        var childNode = this.importElement(node);
        this.current.appendChild(childNode);
        return this;
    };
    Node.prototype.gotoRoot = function () {
        this._current = this.root;
        return this;
    };
    Object.defineProperty(Node.prototype, "root", {
        get: function () {
            if (this._root === undefined)
                throw new Error('Root node not defined!');
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "id", {
        get: function () {
            return this.current.getAttribute('id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "innerHTML", {
        set: function (html) {
            this.current.innerHTML = html;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "idSearch", {
        get: function () {
            return this._idSearch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "current", {
        get: function () {
            if (this._current === undefined)
                throw new Error('Current not set!');
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "document", {
        get: function () {
            if (this._document === undefined)
                throw new Error('Document not set!');
            return this._document;
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFPRyxjQUFZLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWEsRUFBRSxTQUFvQjtRQUYxRSxjQUFTLEdBQWtCLEVBQUUsQ0FBQTtRQUdsQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsYUFBVCxTQUFTLGNBQVQsU0FBUyxHQUFJLFFBQVEsQ0FBQTtRQUV0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7WUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFTywwQkFBVyxHQUFuQixVQUFvQixNQUFjO1FBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDNUIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtRQUV6RCxPQUFPLE9BQU8sQ0FBQTtJQUNqQixDQUFDO0lBRU8seUJBQVUsR0FBbEIsVUFBbUIsT0FBZSxFQUFFLFVBQWdCLEVBQUUsSUFBYTtRQUNoRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQzVCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFMUMsSUFBSSxVQUFVLEVBQUU7WUFDYixLQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtnQkFD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