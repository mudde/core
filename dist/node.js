define("Mudde/Core/Node", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(tagName, attributes, text, documentX) {
            this._idSearch = [];
            this._document = typeof document === 'undefined'
                ? documentX
                : document;
            this._root = this._current = tagName[0] === '#'
                ? this.getNodeById(tagName.substr(1))
                : this.createNode(tagName, attributes, text);
        }
        getNodeById(nodeId) {
            let document = this.document;
            let element = document.getElementById(nodeId);
            if (!element)
                throw new Error('Element not found by id!');
            return element;
        }
        createNode(tagName, attributes, text) {
            let document = this.document;
            let node = document.createElement(tagName);
            if (attributes) {
                for (let key in attributes) {
                    let value = attributes[key];
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
        }
        moveInNode(callable) {
            let current = this.current;
            let tmpNode = this.document.createElement('div');
            current.replaceWith(tmpNode);
            let newNodeRaw = callable(current);
            let newNode = this.importElement(newNodeRaw);
            tmpNode.replaceWith(newNode);
            return this;
        }
        removeChild(node) {
            let nodeX = node instanceof Node ? node.root : node;
            this.current.removeChild(nodeX);
            return this;
        }
        addSibling_(tagName, attributes, text) {
            return this.addSibling(tagName, attributes, text, true);
        }
        addSibling(tagName, attributes, text, setCurrent = false) {
            let newNode = this.createNode(tagName, attributes, text);
            let parent = this.current.parentNode;
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(newNode, this.current);
            if (setCurrent) {
                this._current = newNode;
            }
            return this;
        }
        addSiblingNode_(node) {
            return this.addSiblingNode(node, true);
        }
        addSiblingNode(node, setCurrent = false) {
            let newNode = this.importElement(node);
            let current = this.current;
            let parent = current.parentElement;
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(newNode, current);
            if (setCurrent) {
                this._current = newNode;
            }
            return this;
        }
        addClass(className) {
            let currentClass = this.current.className;
            this.current.setAttribute('class', `${currentClass} ${className}`.trimLeft());
            return this;
        }
        removeClass(className) {
            let currentClass = ' ' + this.current.className + ' ';
            this.current.setAttribute('class', currentClass.replace(' ' + className + ' ', ' ').trim());
            return this;
        }
        clear() {
            let root = this._current = this.root;
            root.innerHTML = '';
        }
        getAttribute(name) {
            return this.current.getAttribute(name);
        }
        getElementById(id) {
            if (id in this._idSearch) {
                this._current = this._idSearch[id];
            }
            return this;
        }
        getElementByTagName(tagName) {
            let element = this.root.getElementsByTagName(tagName);
            return element;
        }
        getElementByClass(className) {
            let element = this.root.getElementsByClassName(className);
            return element;
        }
        hasAttribute(name) {
            return this.current.hasAttribute(name);
        }
        hasElementById(id) {
            return id in this._idSearch;
        }
        hasElementByClass(className) {
            return this.root.getElementsByClassName(className).length !== 0;
        }
        a(tagName, attributes, text, setCurrent) {
            return this.appendNode(tagName, attributes, text, setCurrent);
        }
        prependNode_(tagName, attributes, text) {
            return this.prependNode(tagName, attributes, text, true);
        }
        prependNode(tagName, attributes, text, setCurrent) {
            let firstChild = this.current.firstChild;
            if (firstChild) {
                let HTMLElement = this.current.insertBefore(this.createNode(tagName, attributes, text), firstChild);
                if (setCurrent === true) {
                    this._current = HTMLElement;
                }
            }
            return this;
        }
        appendNode(tagName, attributes, text, setCurrent = false) {
            let newNode = this.createNode(tagName, attributes, text);
            let HTMLElement = this.current.appendChild(newNode);
            HTMLElement.innerText = text ? text : '';
            if (setCurrent === true) {
                this._current = HTMLElement;
            }
            return this;
        }
        a_(tagName, attributes, text) {
            return this.appendNode(tagName, attributes, text, true);
        }
        appendNode_(tagName, attributes, text) {
            return this.appendNode(tagName, attributes, text, true);
        }
        toHTML(outerHTML = true) {
            let root = this.root;
            return outerHTML ? root.outerHTML : root.innerHTML;
        }
        setAttributes(attributes) {
            let node = this.current;
            for (let key in attributes) {
                let value = attributes[key];
                if (key === 'id') {
                    this._idSearch[value] = node;
                }
                node.setAttribute(key, value);
            }
            return this;
        }
        parent() {
            let parent = this.current.parentElement;
            this._current = parent === null ? this.current : parent;
            return this;
        }
        _() {
            return this.parent();
        }
        prependElement(node) {
            if (node === null)
                return this;
            let childNode = this.importElement(node);
            let firstChild = this.current.firstChild;
            if (firstChild) {
                this.current.insertBefore(childNode, firstChild);
            }
            this._current = childNode;
            return this;
        }
        prependElement_(node) {
            if (node === null)
                return this;
            let childNode = this.importElement(node);
            let firstChild = this.current.firstChild;
            if (firstChild) {
                this.current.insertBefore(childNode, firstChild);
            }
            return this;
        }
        appendElement(node) {
            if (node === null)
                return this;
            let childNode = this.importElement(node);
            this._current = this.current.appendChild(childNode);
            return this;
        }
        importElement(node) {
            if (!(node instanceof Node)) {
                return node;
            }
            let childIdNodes = node._idSearch;
            for (var key in childIdNodes) {
                this._idSearch[key] = childIdNodes[key];
            }
            return node.root;
        }
        appendElement_(node) {
            if (node === null)
                return this;
            let childNode = this.importElement(node);
            this.current.appendChild(childNode);
            return this;
        }
        gotoRoot() {
            this._current = this.root;
            return this;
        }
        get root() {
            if (this._root === undefined)
                throw new Error('Root node not defined!');
            return this._root;
        }
        get id() {
            return this.current.getAttribute('id');
        }
        set innerHTML(html) {
            this.current.innerHTML = html;
        }
        get idSearch() {
            return this._idSearch;
        }
        get current() {
            if (this._current === undefined)
                throw new Error('Current not set!');
            return this._current;
        }
        get document() {
            if (this._document === undefined)
                throw new Error('Document not set!');
            return this._document;
        }
    }
    exports.default = Node;
});
define("Mudde/Core/BsNode", ["require", "exports", "Mudde/Core/Node"], function (require, exports, Node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BsNode extends Node_1.default {
        formGroup() {
            this.appendNode('div', { class: 'form-control' });
            return this;
        }
        formGroup_() {
            this.appendNode_('div', { class: 'form-control' });
            return this;
        }
        inputGroupText(text) {
            this.appendNode('span', { class: 'input-group-text' }, text);
            return this;
        }
        inputGroupText_(text) {
            this.appendNode_('span', { class: 'form-group-text' }, text);
            return this;
        }
        inputGroup() {
            this.appendNode('div', { class: 'input-control mb-1' });
            return this;
        }
        inputGroup_() {
            this.appendNode_('div', { class: 'input-control mb-1' });
            return this;
        }
        label(label, forAttribute, attributes) {
            this.appendNode('label', Object.assign(Object.assign({}, attributes), { class: 'form-label', for: forAttribute }), label);
            return this;
        }
        label_(label, forAttribute, attributes) {
            this.appendNode_('label', Object.assign(Object.assign({}, attributes), { class: 'form-label', for: forAttribute }), label);
            return this;
        }
        input(type, id) {
            this.appendNode('input', { 'class': 'form-control', type: type, id: id });
            return this;
        }
        input_(type, id) {
            this.appendNode_('input', { class: 'form-control', type: type, id: id });
            return this;
        }
        help(text, id) {
            this.appendNode('span', { class: 'form-text', id: id }, text);
            return this;
        }
        help_(text, id) {
            this.appendNode_('span', { class: 'form-text', id: id }, text);
            return this;
        }
        span(text, attributes) {
            let attr = attributes ? attributes : {};
            this.appendNode('span', attr, text);
            return this;
        }
        span_(text, attributes) {
            let attr = attributes ? attributes : {};
            this.appendNode_('span', attr, text);
            return this;
        }
    }
    exports.default = BsNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NdWRkZS9Db3JlL05vZGUudHMiLCIuLi9zcmMvTXVkZGUvQ29yZS9ic05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsTUFBcUIsSUFBSTtRQU90QixZQUFZLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWEsRUFBRSxTQUFvQjtZQUYxRSxjQUFTLEdBQWtCLEVBQUUsQ0FBQTtZQUdsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sUUFBUSxLQUFLLFdBQVc7Z0JBQzdDLENBQUMsQ0FBQyxTQUFTO2dCQUNYLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFFYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7Z0JBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbEQsQ0FBQztRQUVPLFdBQVcsQ0FBQyxNQUFjO1lBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7WUFDNUIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM3QyxJQUFJLENBQUMsT0FBTztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7WUFFekQsT0FBTyxPQUFPLENBQUE7UUFDakIsQ0FBQztRQUVPLFVBQVUsQ0FBQyxPQUFlLEVBQUUsVUFBZ0IsRUFBRSxJQUFhO1lBQ2hFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7WUFDNUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENB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