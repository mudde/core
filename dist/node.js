define("Node", ["require", "exports"], function (require, exports) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NdWRkZS9Db3JlL05vZGUudHMiLCIuLi9zcmMvTXVkZGUvQ29yZS9ic05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsTUFBcUIsSUFBSTtRQU10QixZQUFZLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWEsRUFBRSxTQUFxQjtZQUNoRixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sUUFBUSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFFdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO2dCQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFFTyxXQUFXLENBQUMsTUFBYztZQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQzdCLElBQUksQ0FBQyxRQUFRO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUVuRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdDLElBQUksQ0FBQyxPQUFPO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtZQUV6RCxPQUFPLE9BQU8sQ0FBQTtRQUNqQixDQUFDO1FBRU8sVUFBVSxDQUFDLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWE7WUFDaEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtZQUM3QixJQUFJLENB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