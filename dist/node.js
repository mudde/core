define("Mudde/Core/Node", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(tagName, attributes, text, documentX) {
            this._idSearch = [];
            this._document = typeof document === 'undefined' ? documentX : document;
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
        addSibling(tagName, attributes, text) {
            if (this._current === undefined)
                throw new Error('Node not set!');
            let node = this.createNode(tagName, attributes, text);
            let parent = this._current.parentNode;
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(node, this._current);
            return node;
        }
        addSiblingElement(node) {
            if (node === null)
                return this;
            if (this._current === undefined)
                throw new Error('Node not set!');
            let newNode = node instanceof Node ? node.root() : node;
            let parent = this._current.parentNode;
            if (parent === null)
                console.info(this._current);
            parent === null || parent === void 0 ? void 0 : parent.insertBefore(newNode, this._current);
            return this;
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
            if (id in this._idSearch) {
                this._current = this._idSearch[id];
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
                if (key === 'id') {
                    this._idSearch[value] = node;
                }
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
            if (node === null)
                return this;
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
            if (node === null)
                return this;
            if (this._current === undefined)
                throw new Error('Node not set!');
            if (node instanceof Node) {
                this._idSearch.push(...node.idSearch);
            }
            let childNode = node instanceof Node ? node.root() : node;
            let firstChild = this._current.firstChild;
            if (firstChild) {
                this._current = firstChild.insertBefore(childNode, null);
            }
            return this;
        }
        appendElement(node) {
            if (node === null)
                return this;
            if (this._current === undefined)
                throw new Error('Node not set!');
            let childNode = node instanceof Node ? node.root() : node;
            this._current = this._current.appendChild(childNode);
            return this;
        }
        appendElement_(node) {
            if (node === null)
                return this;
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
        get idSearch() {
            return this._idSearch;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NdWRkZS9Db3JlL05vZGUudHMiLCIuLi9zcmMvTXVkZGUvQ29yZS9ic05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUEsTUFBcUIsSUFBSTtRQU90QixZQUFZLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWEsRUFBRSxTQUFvQjtZQUYxRSxjQUFTLEdBQWtCLEVBQUUsQ0FBQTtZQUdsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sUUFBUSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFFdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO2dCQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFFTyxXQUFXLENBQUMsTUFBYztZQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQzdCLElBQUksQ0FBQyxRQUFRO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUVuRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdDLElBQUksQ0FBQyxPQUFPO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtZQUV6RCxPQUFPLE9BQU8sQ0FBQTtRQUNqQixDQUFDO1FBRU8sVUFBVSxDQUFDLE9BQWUsRUFBRSxVQUFnQixFQUFFLElBQWE7WUFDaEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtZQUM3QixJQUFJLENBQUMsUUFBUTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7WUFFbkQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUUxQyxJQUFJLFVBQVUsRUFBRTtnQkFDYixLQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtvQkFDekIsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUUzQixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7cUJBQzlCO29CQUVELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO2lCQUMvQjthQUNIO1lBRUQsSUFBSSxJQUFJLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7YUFDdkI7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxVQUFVLENBQUMsT0FBZSxFQUFFLFVBQWdCLEVBQUUsSUFBYTtZQUN4RCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBRWpFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNyRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUV0QyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDO1lBRXpDLE9BQU8sSUFBSSxDQUFBO1FBQ2QsQ0FBQztRQUVELGlCQUFpQixDQUFDLElBQStCO1lBQzlDLElBQUksSUFBSSxLQUFLLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUVqRSxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtZQUN2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN0QyxJQUFJLE1BQU0sS0FBSyxJQUFJO2dCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBRWhELE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFFNUMsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsUUFBUSxDQUFDLFNBQWlCO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFakUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUE7WUFFMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsWUFBWSxJQUFJLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFFOUUsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsV0FBVyxDQUFDLFNBQWlCO1lBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFakUsSUFBSSxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtZQUV0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBRTVGLE9BQU8sSUFBSSxDQUFBO1FBQ2QsQ0FBQztRQUdELFlBQVksQ0FBQyxJQUFZO1lBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFakUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQyxDQUFDO1FBRUQsY0FBYyxDQUFDLEVBQVU7WUFDdEIsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQ3BDO1lBRUQsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsT0FBZTtZQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBRTlELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFdEQsT0FBTyxPQUFPLENBQUE7UUFDakIsQ0FBQztRQUVELGlCQUFpQixDQUFDLFNBQWlCO1lBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFOUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUUxRCxPQUFPLE9BQU8sQ0FBQTtRQUNqQixDQUFDO1FBRUQsWUFBWSxDQUFDLElBQVk7WUFDdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUVqRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFDLENBQUM7UUFFRCxjQUFjLENBQUMsRUFBVTtZQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7WUFFdEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUE7UUFDcEQsQ0FBQztRQUVELGlCQUFpQixDQUFDLFNBQWlCO1lBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFOUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUE7UUFDbkUsQ0FBQztRQUVELENBQUMsQ0FBQyxPQUFlLEVBQUUsVUFBZ0IsRUFBRSxJQUFhLEVBQUUsVUFBb0I7WUFDckUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ2hFLENBQUM7UUFFRCxZQUFZLENBQUMsT0FBZSxFQUFFLFVBQWdCLEVBQUUsSUFBYTtZQUMxRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDM0QsQ0FBQztRQUVELFdBQVcsQ0FBQyxPQUFlLEVBQUUsVUFBZ0IsRUFBRSxJQUFhLEVBQUUsVUFBb0I7WUFDL0UsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUVqRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQTtZQUV6QyxJQUFJLFVBQVUsRUFBRTtnQkFDYixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7Z0JBRXBHLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUE7aUJBQzdCO2FBQ0g7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxVQUFVLENBQUMsT0FBZSxFQUFFLFVBQWdCLEVBQUUsSUFBYSxFQUFFLFVBQW9CO1lBQzlFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFakUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7WUFFdkYsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBRXhDLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUE7YUFDN0I7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxFQUFFLENBQUMsT0FBZSxFQUFFLFVBQWdCLEVBQUUsSUFBYTtZQUNoRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDMUQsQ0FBQztRQUVELFdBQVcsQ0FBQyxPQUFlLEVBQUUsVUFBZ0IsRUFBRSxJQUFhO1lBQ3pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRCxDQUFDO1FBRUQsTUFBTSxDQUFDLFlBQXFCLElBQUk7WUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUU5RCxJQUFJLElBQUksR0FBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQTtZQUNsQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUNyRCxDQUFDO1FBRUQsYUFBYSxDQUFDLFVBQWU7WUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUVqRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBRXhCLEtBQUssSUFBSSxHQUFHLElBQUksVUFBVSxFQUFFO2dCQUN6QixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBRTNCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtvQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQTtpQkFDOUI7Z0JBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7YUFDL0I7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxNQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUVqRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQTtZQUV4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtZQUV4RCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxDQUFDO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdkIsQ0FBQztRQUVELGNBQWMsQ0FBQyxJQUErQjtZQUMzQyxJQUFJLElBQUksS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFBO1lBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFakUsSUFBSSxTQUFTLEdBQUcsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDekQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUE7WUFFekMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2IsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDMUM7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxlQUFlLENBQUMsSUFBK0I7WUFDNUMsSUFBSSxJQUFJLEtBQUssSUFBSTtnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBRWpFLElBQUksSUFBSSxZQUFZLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7YUFDdkM7WUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtZQUN6RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQTtZQUV6QyxJQUFJLFVBQVUsRUFBRTtnQkFDYixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQzFEO1lBRUQsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsYUFBYSxDQUFDLElBQStCO1lBQzFDLElBQUksSUFBSSxLQUFLLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUE7WUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUVqRSxJQUFJLFNBQVMsR0FBRyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtZQUV6RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBRXBELE9BQU8sSUFBSSxDQUFBO1FBQ2QsQ0FBQztRQUVELGNBQWMsQ0FBQyxJQUErQjtZQUMzQyxJQUFJLElBQUksS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFBO1lBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFakUsSUFBSSxTQUFTLEdBQUcsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFFekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFcEMsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsUUFBUTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtZQUUxQixPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxJQUFJO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBRXZFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNwQixDQUFDO1FBRUQsSUFBSSxFQUFFO1lBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUVqRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFDLENBQUM7UUFFRCxJQUFJLFNBQVMsQ0FBQyxJQUFZO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ2pDLENBQUM7UUFFRCxJQUFJLFFBQVE7WUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7UUFDeEIsQ0FBQztLQUNIO0lBclRELHVCQXFUQzs7Ozs7SUNuVEQsTUFBcUIsTUFBTyxTQUFRLGNBQUk7UUFFckMsU0FBUztZQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7WUFFakQsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsVUFBVTtZQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7WUFFbEQsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsY0FBYyxDQUFDLElBQVk7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUU1RCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxlQUFlLENBQUMsSUFBWTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRTVELE9BQU8sSUFBSSxDQUFBO1FBQ2QsQ0FBQztRQUVELFVBQVU7WUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7WUFFdkQsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsV0FBVztZQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtZQUV4RCxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxLQUFLLENBQUMsS0FBYSxFQUFFLFlBQW9CLEVBQUUsVUFBZ0I7WUFDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGtDQUFPLFVBQVUsS0FBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxZQUFZLEtBQUksS0FBSyxDQUFDLENBQUE7WUFFMUYsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQWEsRUFBRSxZQUFvQixFQUFFLFVBQWdCO1lBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxrQ0FBTyxVQUFVLEtBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsWUFBWSxLQUFJLEtBQUssQ0FBQyxDQUFBO1lBRTNGLE9BQU8sSUFBSSxDQUFBO1FBQ2QsQ0FBQztRQUVELEtBQUssQ0FBQyxJQUFZLEVBQUUsRUFBVTtZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUV6RSxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLEVBQVU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFFeEUsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQVksRUFBRSxFQUFVO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFN0QsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsS0FBSyxDQUFDLElBQVksRUFBRSxFQUFVO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFOUQsT0FBTyxJQUFJLENBQUE7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQVksRUFBRSxVQUFnQjtZQUNoQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBRXZDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUVuQyxPQUFPLElBQUksQ0FBQTtRQUNkLENBQUM7UUFFRCxLQUFLLENBQUMsSUFBWSxFQUFFLFVBQWdCO1lBQ2pDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFFdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRXBDLE9BQU8sSUFBSSxDQUFBO1FBQ2QsQ0FBQztLQUNIO0lBekZELHlCQXlGQyJ9