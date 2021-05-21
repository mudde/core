define("Node", ["require", "exports"], function (require, exports) {
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
            let current = this._current ? this._current : this.root;
            let newNode = callable(current);
            this.addSiblingNode(newNode);
            return this;
        }
        addSibling(tagName, attributes, text) {
            let node = this.createNode(tagName, attributes, text);
            let parent = this.current.parentNode;
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(node, this.current);
            return this;
        }
        addSiblingNode(node) {
            let parent = this.current.parentNode;
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(node.root, this.current);
            return this;
        }
        addSiblingElement(node) {
            if (node === null)
                return this;
            let newNode = this.getHTMLElement(node);
            let parent = this.current.parentNode;
            if (parent === null)
                console.info(this.current);
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(newNode, this.current);
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
            let childNode = this.getHTMLElement(node);
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
            let childNode = this.getHTMLElement(node);
            let firstChild = this.current.firstChild;
            if (firstChild) {
                this.current.insertBefore(childNode, firstChild);
            }
            return this;
        }
        appendElement(node) {
            if (node === null)
                return this;
            let childNode = this.getHTMLElement(node);
            this._current = this.current.appendChild(childNode);
            return this;
        }
        getHTMLElement(node) {
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
            let childNode = this.getHTMLElement(node);
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
define("Mudde/Core/BsNode", ["require", "exports", "Node"], function (require, exports, Node_1) {
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