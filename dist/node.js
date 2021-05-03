define("Mudde/Core/Node", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(tagName, attributes, text) {
            this._document = document;
            this._root = this._current = tagName[0] === '#'
                ? this.getNodeById(tagName)
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
                HTMLElement.innerText = text ? text : '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NdWRkZS9Db3JlL05vZGUudHMiLCIuLi9zcmMvTXVkZGUvQ29yZS9ic05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsTUFBcUIsSUFBSTtRQU10QixZQUFZLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWE7WUFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7WUFFekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO2dCQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbEQsQ0FBQztRQUVPLFdBQVcsQ0FBQyxNQUFjO1lBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDN0IsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBRW5ELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0MsSUFBSSxDQUFDLE9BQU87Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1lBRXpELE9BQU8sT0FBTyxDQUFBO1FBQ2pCLENBQUM7UUFFTyxVQUFVLENBQUMsT0FBZSxFQUFFLFVBQWdCLEVBQUUsSUFBYTtZQUNoRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQzdCLElBQUksQ0FBQyxRQUFRO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUVuRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFD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