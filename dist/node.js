define("Mudde/Core/Node", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(tagName, attributes, text, documentX) {
            this._document = typeof document == 'undefined' ? documentX : document;
            this._root = this._current = tagName[0] === '#'
                ? this.getNodeById(tagName.substr(1))
                : this.createNode(tagName, attributes, text);
        }
        getNodeById(nodeId) {
            let document = this._document;
            if (!document)
                throw new Error("Document not set!");
            let element = document.getElementById(nodeId);
            if (!element)
                throw new Error('Element not found by id!');
            return element;
        }
        createNode(tagName, attributes, text) {
            let document = this._document;
            if (!document)
                throw new Error("Document not set!");
            let node = document.createElement(tagName);
            if (attributes) {
                for (let key in attributes) {
                    let value = attributes[key];
                    node.setAttribute(key, value);
                }
            }
            if (text) {
                node.innerText = text;
            }
            return node;
        }
        addSibling(tagName, attributes, text) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let node = this.createNode(tagName, attributes, text);
            let parent = this._current.parentNode;
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(node, this._current);
            return node;
        }
        addClass(className) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let currentClass = this._current.className;
            this._current.setAttribute('class', `${currentClass} ${className}`.trimLeft());
            return this;
        }
        removeClass(className) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let currentClass = ' ' + this._current.className + ' ';
            this._current.setAttribute('class', currentClass.replace(' ' + className + ' ', ' ').trim());
            return this;
        }
        getAttribute(name) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            return this._current.getAttribute(name);
        }
        getElementById(id) {
            let element = document.getElementById(id);
            if (element) {
                this._current = element;
            }
            return this;
        }
        getElementByTagName(tagName) {
            if (this._root === undefined)
                throw new Error('Node not set!');
            let element = this._root.getElementsByTagName(tagName);
            return element;
        }
        getElementByClass(className) {
            if (this._root === undefined)
                throw new Error('Node not set!');
            let element = this._root.getElementsByClassName(className);
            return element;
        }
        hasAttribute(name) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            return this._current.hasAttribute(name);
        }
        hasElementById(id) {
            if (this._document === undefined)
                throw new Error('Document not set!');
            return this._document.getElementById(id) !== null;
        }
        hasElementByClass(className) {
            if (this._root === undefined)
                throw new Error('Node not set!');
            return this._root.getElementsByClassName(className).length !== 0;
        }
        a(tagName, attributes, text, setCurrent) {
            return this.appendNode(tagName, attributes, text, setCurrent);
        }
        prependNode_(tagName, attributes, text) {
            return this.prependNode(tagName, attributes, text, true);
        }
        prependNode(tagName, attributes, text, setCurrent) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let firstChild = this._current.firstChild;
            if (firstChild) {
                let HTMLElement = this._current.insertBefore(this.createNode(tagName, attributes, text), firstChild);
                if (setCurrent === true) {
                    this._current = HTMLElement;
                }
            }
            return this;
        }
        appendNode(tagName, attributes, text, setCurrent) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let HTMLElement = this._current.appendChild(this.createNode(tagName, attributes, text));
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
            if (this._root === undefined)
                throw new Error('Node not set!');
            let root = this._root;
            return outerHTML ? root.outerHTML : root.innerHTML;
        }
        setAttributes(attributes) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let node = this._current;
            for (let key in attributes) {
                let value = attributes[key];
                node.setAttribute(key, value);
            }
            return this;
        }
        parent() {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let parent = this._current.parentElement;
            this._current = parent === null ? this._current : parent;
            return this;
        }
        _() {
            return this.parent();
        }
        prependElement(node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let childNode = node instanceof Node ? node.root() : node;
            let firstChild = this._current.firstChild;
            if (firstChild) {
                firstChild.insertBefore(childNode, null);
            }
            return this;
        }
        prependElement_(node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let childNode = node instanceof Node ? node.root() : node;
            let firstChild = this._current.firstChild;
            if (firstChild) {
                this._current = firstChild.insertBefore(childNode, null);
            }
            return this;
        }
        appendElement(node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let childNode = node instanceof Node ? node.root() : node;
            this._current = this._current.appendChild(childNode);
            return this;
        }
        appendElement_(node) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let childNode = node instanceof Node ? node.root() : node;
            this._current.appendChild(childNode);
            return this;
        }
        gotoRoot() {
            this._current = this._root;
            return this;
        }
        root() {
            if (this._root === undefined)
                throw new Error('Root node not defined!');
            return this._root;
        }
        get id() {
            if (this._current === undefined)
                throw new Error('Node not set!');
            return this._current.getAttribute('id');
        }
        set innerHTML(html) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            this._current.innerHTML = html;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NdWRkZS9Db3JlL05vZGUudHMiLCIuLi9zcmMvTXVkZGUvQ29yZS9ic05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsTUFBcUIsSUFBSTtRQU10QixZQUFZLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWEsRUFBRSxTQUFvQjtZQUUvRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sUUFBUSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFFdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO2dCQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFFTyxXQUFXLENBQUMsTUFBYztZQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQzdCLElBQUksQ0FBQyxRQUFRO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUVuRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdDLElBQUksQ0FBQyxPQUFPO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtZQUV6RCxPQUFPLE9BQU8sQ0FBQTtRQUNqQixDQUFDO1FBRU8sVUFBVSxDQUFDLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWE7WUFDaEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtZQUM3QixJQUFJLENB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