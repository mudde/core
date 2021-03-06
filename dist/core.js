/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Core/ChainOfResponsibility/BaseHandler.ts":
/*!*******************************************************!*\
  !*** ./src/Core/ChainOfResponsibility/BaseHandler.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseHandler = void 0;
var BaseHandler = /** @class */ (function () {
    function BaseHandler() {
    }
    BaseHandler.prototype.setNext = function (event) {
        this._nextEvent = event;
        return event;
    };
    BaseHandler.prototype.handle = function (data) {
        this.handler(data);
        if (this._nextEvent) {
            this._nextEvent.handle(data);
        }
        return data;
    };
    Object.defineProperty(BaseHandler.prototype, "nextEvent", {
        get: function () {
            return this._nextEvent;
        },
        enumerable: false,
        configurable: true
    });
    return BaseHandler;
}());
exports.BaseHandler = BaseHandler;


/***/ }),

/***/ "./src/Core/ChainOfResponsibility/HandlerInterface.ts":
/*!************************************************************!*\
  !*** ./src/Core/ChainOfResponsibility/HandlerInterface.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Core/ChainOfResponsibility/index.ts":
/*!*************************************************!*\
  !*** ./src/Core/ChainOfResponsibility/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// created from 'create-ts-index'
__exportStar(__webpack_require__(/*! ./BaseHandler */ "./src/Core/ChainOfResponsibility/BaseHandler.ts"), exports);
__exportStar(__webpack_require__(/*! ./HandlerInterface */ "./src/Core/ChainOfResponsibility/HandlerInterface.ts"), exports);


/***/ }),

/***/ "./src/Core/ConfigurableAbstract.ts":
/*!******************************************!*\
  !*** ./src/Core/ConfigurableAbstract.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurableAbstract = void 0;
/**
 * This will automatically configure your object
 *
 * example
 * ---------------
 * import { ConfigurableAbstract } from "../node_modules/mudde-core/src/Core/ConfigurableAbstract";
 *
 * export class Form extends ConfigurableAbstract {
 *
 *    private _id: string = ''                   //  <-- empty init
 *    private _languages: string[] = []
 *
 *    constructor(config: any) {
 *       super()
 *
 *       this.configuring(config)
 *    }
 *
 *    getDefaultConfig(): any {                 //  <-- set the default values of all
 *       return {                               //      the fields you want to configure
 *          id: GuidHelper.raw(),
 *          languages: ['nl'],
 *       }
 *    }
 *
 *    private configureLanguages(rawFields: Object[]): void {     //  <-- if you want some extra checks
 *       .. your code here                                        //      or create a new object create
 *    }                                                           //      a method with the following signature
 *                                                                //      configure<property name>(rawFields: Object[]): void
 *  }
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
var StringHelper_1 = __webpack_require__(/*! ../Helper/StringHelper */ "./src/Helper/StringHelper.ts");
var ConfigurableAbstract = /** @class */ (function () {
    function ConfigurableAbstract() {
    }
    ConfigurableAbstract.prototype.configuring = function (config) {
        var _a;
        var defaultConfig = this.getDefaultConfig();
        for (var key in defaultConfig) {
            var methodName = 'configure' + StringHelper_1.StringHelper.ucFirst(key);
            var hasMethod = this[methodName] !== undefined;
            var value = (_a = config[key]) !== null && _a !== void 0 ? _a : defaultConfig[key];
            if (hasMethod) {
                this[methodName](value);
            }
            else {
                this[key] = value;
            }
        }
    };
    return ConfigurableAbstract;
}());
exports.ConfigurableAbstract = ConfigurableAbstract;


/***/ }),

/***/ "./src/Core/NodeCore.ts":
/*!******************************!*\
  !*** ./src/Core/NodeCore.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeCore = void 0;
/**
 * Generate and maniputate HTMLElements more easy
 *
 * example
 * ---------------
 * let node = new NodeCore('div', {class:'container'})
 * node.appendElement_('div', {class:'row'})
 *        .appendElement_('div', {class:'col'})
 *           .appendElement('a', {href:'#', class:'btn btn-default'}, 'Click Me!')
 *        ._()
 *        .appendElement_('div', {class:'col'})
 *           .appendElement('img', {src:'#', class:'photo'})
 *        ._()
 * -------
 * OUTPUTS
 * -------
 * <div class='container'>
 *    <div class='row'>
 *       <div class='col'>
 *          <a href='#' class='btn btn-default'>
 *       </div>
 *       <div class='col'>
 *          <img src='#' class='photo'>
 *       </div>
 *    </div>
 * </div>
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) copyright 2021 - Olaf Mudde
 * @license       MIT
 */
var NodeCore = /** @class */ (function () {
    function NodeCore(tagName, attributes, text, documentX) {
        this._idSearch = [];
        this._click = ['click'];
        this._change = ['keydown', 'keypress', 'keyup', 'mousedown', 'mouseup', 'change'];
        this._document = documentX !== null && documentX !== void 0 ? documentX : document;
        this._root = this._current = tagName[0] === '#'
            ? this.getNodeById(tagName.substring(1))
            : this.createNode(tagName, attributes, text);
    }
    NodeCore.prototype.getNodeById = function (nodeId) {
        var document = this.document;
        var element = document.getElementById(nodeId);
        if (!element)
            throw new Error('Element not found by id!');
        return element;
    };
    NodeCore.prototype.createNode = function (tagName, attributes, text) {
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
    NodeCore.prototype.click = function (callable) {
        var current = this.current;
        this._click.forEach(function (name) {
            current.addEventListener(name, callable);
        });
        return this;
    };
    NodeCore.prototype.change = function (callable) {
        var current = this.current;
        this._change.forEach(function (name) {
            current.addEventListener(name, callable);
        });
        return this;
    };
    NodeCore.prototype.moveInNode = function (callable) {
        var current = this.current;
        var tmpNode = this.document.createElement('div');
        current.replaceWith(tmpNode);
        var newNodeRaw = callable(current);
        var newNode = this.importElement(newNodeRaw);
        tmpNode.replaceWith(newNode);
        return this;
    };
    NodeCore.prototype.removeChildren = function () {
        var current = this.current;
        current.childNodes.forEach(function (child) {
            current.removeChild(child);
        });
        return this;
    };
    NodeCore.prototype.removeChild = function (node) {
        var nodeX = node instanceof NodeCore ? node.root : node;
        this.current.removeChild(nodeX);
        return this;
    };
    NodeCore.prototype.addSibling_ = function (tagName, attributes, text) {
        return this.addSibling(tagName, attributes, text, true);
    };
    NodeCore.prototype.addSibling = function (tagName, attributes, text, setCurrent) {
        if (setCurrent === void 0) { setCurrent = false; }
        var newNode = this.createNode(tagName, attributes, text);
        var parent = this.current.parentNode;
        parent === null || parent === void 0 ? void 0 : parent.insertBefore(newNode, this.current);
        if (setCurrent) {
            this._current = newNode;
        }
        return this;
    };
    NodeCore.prototype.addSiblingNode_ = function (node) {
        return this.addSiblingNode(node, true);
    };
    NodeCore.prototype.addSiblingNode = function (node, setCurrent) {
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
    NodeCore.prototype.addClass = function (className) {
        var currentClass = this.current.className;
        this.current.setAttribute('class', (currentClass + " " + className).trimLeft());
        return this;
    };
    NodeCore.prototype.removeClass = function (className) {
        var currentClass = ' ' + this.current.className + ' ';
        this.current.setAttribute('class', currentClass.replace(' ' + className + ' ', ' ').trim());
        return this;
    };
    NodeCore.prototype.clear = function () {
        var root = this._current = this.root;
        root.innerHTML = '';
    };
    NodeCore.prototype.getAttribute = function (name) {
        return this.current.getAttribute(name);
    };
    NodeCore.prototype.getElementById = function (id) {
        if (id in this._idSearch) {
            this._current = this._idSearch[id];
        }
        return this;
    };
    NodeCore.prototype.getElementByTagName = function (tagName) {
        var element = this.root.getElementsByTagName(tagName);
        return element;
    };
    NodeCore.prototype.getElementByClass = function (className) {
        var element = this.root.getElementsByClassName(className);
        return element;
    };
    NodeCore.prototype.hasAttribute = function (name) {
        return this.current.hasAttribute(name);
    };
    NodeCore.prototype.hasElementById = function (id) {
        return id in this._idSearch;
    };
    NodeCore.prototype.hasElementByClass = function (className) {
        return this.root.getElementsByClassName(className).length !== 0;
    };
    NodeCore.prototype.a = function (tagName, attributes, text, setCurrent) {
        return this.appendNode(tagName, attributes, text, setCurrent);
    };
    NodeCore.prototype.prependNode_ = function (tagName, attributes, text) {
        return this.prependNode(tagName, attributes, text, true);
    };
    NodeCore.prototype.prependNode = function (tagName, attributes, text, setCurrent) {
        var firstChild = this.current.firstChild;
        if (firstChild) {
            var HTMLElement_1 = this.current.insertBefore(this.createNode(tagName, attributes, text), firstChild);
            if (setCurrent === true) {
                this._current = HTMLElement_1;
            }
        }
        return this;
    };
    NodeCore.prototype.appendNode = function (tagName, attributes, text, setCurrent) {
        if (setCurrent === void 0) { setCurrent = false; }
        var newNode = this.createNode(tagName, attributes, text);
        var HTMLElement = this.current.appendChild(newNode);
        HTMLElement.innerText = text ? text : '';
        if (setCurrent === true) {
            this._current = HTMLElement;
        }
        return this;
    };
    NodeCore.prototype.a_ = function (tagName, attributes, text) {
        return this.appendNode(tagName, attributes, text, true);
    };
    NodeCore.prototype.appendNode_ = function (tagName, attributes, text) {
        return this.appendNode(tagName, attributes, text, true);
    };
    NodeCore.prototype.toHTML = function (outerHTML) {
        if (outerHTML === void 0) { outerHTML = true; }
        var root = this.root;
        return outerHTML ? root.outerHTML : root.innerHTML;
    };
    NodeCore.prototype.setAttributes = function (attributes) {
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
    NodeCore.prototype.parent = function () {
        var parent = this.current.parentElement;
        this._current = parent === null ? this.current : parent;
        return this;
    };
    NodeCore.prototype._ = function () {
        return this.parent();
    };
    NodeCore.prototype.prependElement = function (node) {
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
    NodeCore.prototype.prependElement_ = function (node) {
        if (node === null)
            return this;
        var childNode = this.importElement(node);
        var firstChild = this.current.firstChild;
        if (firstChild) {
            this.current.insertBefore(childNode, firstChild);
        }
        return this;
    };
    NodeCore.prototype.appendElement = function (node) {
        if (node === null)
            return this;
        var childNode = this.importElement(node);
        this._current = this.current.appendChild(childNode);
        return this;
    };
    NodeCore.prototype.importElement = function (node) {
        if (!(node instanceof NodeCore)) {
            return node;
        }
        var childIdNodes = node._idSearch;
        for (var key in childIdNodes) {
            this._idSearch[key] = childIdNodes[key];
        }
        return node.root;
    };
    NodeCore.prototype.appendElement_ = function (node) {
        if (node === null)
            return this;
        var childNode = this.importElement(node);
        this.current.appendChild(childNode);
        return this;
    };
    NodeCore.prototype.gotoRoot = function () {
        this._current = this.root;
        return this;
    };
    Object.defineProperty(NodeCore.prototype, "root", {
        get: function () {
            if (this._root === undefined)
                throw new Error('Root node not defined!');
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeCore.prototype, "id", {
        get: function () {
            return this.current.getAttribute('id');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeCore.prototype, "innerHTML", {
        set: function (html) {
            this.current.innerHTML = html;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeCore.prototype, "idSearch", {
        get: function () {
            return this._idSearch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeCore.prototype, "current", {
        get: function () {
            if (this._current === undefined)
                throw new Error('Current not set!');
            return this._current;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeCore.prototype, "document", {
        get: function () {
            if (this._document === undefined)
                throw new Error('Document not set!');
            return this._document;
        },
        enumerable: false,
        configurable: true
    });
    return NodeCore;
}());
exports.NodeCore = NodeCore;


/***/ }),

/***/ "./src/Core/ObserverPattern/Event.ts":
/*!*******************************************!*\
  !*** ./src/Core/ObserverPattern/Event.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Event = void 0;
/**
 * Event for Observer pattern
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
var Event = /** @class */ (function () {
    function Event(source, eventNumber) {
        this._source = source;
        this._eventNumber = eventNumber;
    }
    Object.defineProperty(Event.prototype, "source", {
        get: function () {
            if (this._source === undefined)
                throw new Error('Source not set!');
            return this._source;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "eventNumber", {
        get: function () {
            if (this._eventNumber === undefined)
                throw new Error('Event number not set!');
            return this._eventNumber;
        },
        enumerable: false,
        configurable: true
    });
    return Event;
}());
exports.Event = Event;


/***/ }),

/***/ "./src/Core/ObserverPattern/ObserverAbstract.ts":
/*!******************************************************!*\
  !*** ./src/Core/ObserverPattern/ObserverAbstract.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObserverAbstract = void 0;
var ObserverAbstract = /** @class */ (function () {
    function ObserverAbstract() {
    }
    return ObserverAbstract;
}());
exports.ObserverAbstract = ObserverAbstract;


/***/ }),

/***/ "./src/Core/ObserverPattern/ObserverInterface.ts":
/*!*******************************************************!*\
  !*** ./src/Core/ObserverPattern/ObserverInterface.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Core/ObserverPattern/SubjectAbstract.ts":
/*!*****************************************************!*\
  !*** ./src/Core/ObserverPattern/SubjectAbstract.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubjectAbstract = void 0;
var Event_1 = __webpack_require__(/*! ./Event */ "./src/Core/ObserverPattern/Event.ts");
/**
 * Subject for Observer pattern
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
var SubjectAbstract = /** @class */ (function () {
    function SubjectAbstract() {
        this._observers = [];
        this._pause = [];
    }
    SubjectAbstract.prototype.attach = function (eventNumber, observer) {
        var _a;
        this._observers[eventNumber] = (_a = this._observers[eventNumber]) !== null && _a !== void 0 ? _a : [];
        this._observers[eventNumber].push(observer);
    };
    SubjectAbstract.prototype.detach = function (observer) {
        this._observers.forEach(function (observerList) {
            observerList.flatten(function (item) { return item !== observer; });
        });
    };
    SubjectAbstract.prototype.notify = function (source, eventNumber) {
        var _a;
        if (eventNumber === void 0) { eventNumber = null; }
        var event = source instanceof Event_1.Event ? source : new Event_1.Event(source, eventNumber);
        var pause = this._pause;
        var observers = (_a = this._observers[event.eventNumber]) !== null && _a !== void 0 ? _a : [];
        observers.forEach(function (element) {
            if (pause.indexOf(element) === -1) {
                typeof element === 'function'
                    ? element(event)
                    : element.update(event);
            }
        });
    };
    SubjectAbstract.prototype.pauseAttach = function (observer) {
        var pause = this._pause;
        if (pause.indexOf(observer) == -1) {
            this._pause.push(observer);
        }
    };
    SubjectAbstract.prototype.pauseDetach = function (observer) {
        var pause = this._pause;
        var indexOf = pause.indexOf(observer);
        if (indexOf !== -1) {
            this._pause = __spreadArray(__spreadArray([], pause.slice(0, indexOf)), pause.slice(indexOf + 1));
        }
    };
    return SubjectAbstract;
}());
exports.SubjectAbstract = SubjectAbstract;


/***/ }),

/***/ "./src/Core/ObserverPattern/SubjectInterface.ts":
/*!******************************************************!*\
  !*** ./src/Core/ObserverPattern/SubjectInterface.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Core/ObserverPattern/index.ts":
/*!*******************************************!*\
  !*** ./src/Core/ObserverPattern/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// created from 'create-ts-index'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./ObserverInterface */ "./src/Core/ObserverPattern/ObserverInterface.ts"), exports);
__exportStar(__webpack_require__(/*! ./ObserverAbstract */ "./src/Core/ObserverPattern/ObserverAbstract.ts"), exports);
__exportStar(__webpack_require__(/*! ./SubjectInterface */ "./src/Core/ObserverPattern/SubjectInterface.ts"), exports);
__exportStar(__webpack_require__(/*! ./SubjectAbstract */ "./src/Core/ObserverPattern/SubjectAbstract.ts"), exports);
__exportStar(__webpack_require__(/*! ./Event */ "./src/Core/ObserverPattern/Event.ts"), exports);


/***/ }),

/***/ "./src/Core/index.ts":
/*!***************************!*\
  !*** ./src/Core/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChainOfResponsibility = exports.ObserverPattern = void 0;
// created from 'create-ts-index'
var ObserverPatterns = __webpack_require__(/*! ./ObserverPattern */ "./src/Core/ObserverPattern/index.ts");
var ChainsOfResponsibility = __webpack_require__(/*! ./ChainOfResponsibility */ "./src/Core/ChainOfResponsibility/index.ts");
exports.ObserverPattern = ObserverPatterns;
exports.ChainOfResponsibility = ChainsOfResponsibility;
__exportStar(__webpack_require__(/*! ./ChainOfResponsibility/BaseHandler */ "./src/Core/ChainOfResponsibility/BaseHandler.ts"), exports);
__exportStar(__webpack_require__(/*! ./ConfigurableAbstract */ "./src/Core/ConfigurableAbstract.ts"), exports);
__exportStar(__webpack_require__(/*! ./ChainOfResponsibility/HandlerInterface */ "./src/Core/ChainOfResponsibility/HandlerInterface.ts"), exports);
__exportStar(__webpack_require__(/*! ./NodeCore */ "./src/Core/NodeCore.ts"), exports);


/***/ }),

/***/ "./src/Helper/GuidHelper.ts":
/*!**********************************!*\
  !*** ./src/Helper/GuidHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GuidHelper = void 0;
/**
 * GuidHelper
 *
 * @source        https://raw.githubusercontent.com/NicolasDeveloper/guid-typescript/master/lib/guid.ts
 */
// 
var GuidHelper = /** @class */ (function () {
    function GuidHelper(guid) {
        if (!guid) {
            throw new TypeError("Invalid argument; `value` has no value.");
        }
        this.value = GuidHelper.EMPTY;
        if (guid && GuidHelper.isGuid(guid)) {
            this.value = guid;
        }
    }
    GuidHelper.isGuid = function (guid) {
        var value = guid.toString();
        return guid && (guid instanceof GuidHelper || GuidHelper.validator.test(value));
    };
    GuidHelper.create = function () {
        return new GuidHelper([GuidHelper.gen(2), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(3)].join("-"));
    };
    GuidHelper.createEmpty = function () {
        return new GuidHelper("emptyGuid");
    };
    GuidHelper.parse = function (guid) {
        return new GuidHelper(guid);
    };
    GuidHelper.raw = function () {
        return [GuidHelper.gen(2), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(3)].join("-");
    };
    GuidHelper.gen = function (count) {
        var out = "";
        for (var i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    };
    GuidHelper.prototype.equals = function (other) {
        return GuidHelper.isGuid(other) && this.value === other.toString();
    };
    GuidHelper.prototype.isEmpty = function () {
        return this.value === GuidHelper.EMPTY;
    };
    GuidHelper.prototype.toString = function () {
        return this.value;
    };
    GuidHelper.prototype.toJSON = function () {
        return {
            value: this.value,
        };
    };
    GuidHelper.validator = new RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$", "i");
    GuidHelper.EMPTY = "00000000-0000-0000-0000-000000000000";
    return GuidHelper;
}());
exports.GuidHelper = GuidHelper;


/***/ }),

/***/ "./src/Helper/StringHelper.ts":
/*!************************************!*\
  !*** ./src/Helper/StringHelper.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringHelper = void 0;
/**
 * StringHelper for common string mainpulations
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.ucFirst = function (value) {
        if (value === undefined)
            return;
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    return StringHelper;
}());
exports.StringHelper = StringHelper;


/***/ }),

/***/ "./src/Helper/index.ts":
/*!*****************************!*\
  !*** ./src/Helper/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// created from 'create-ts-index'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./GuidHelper */ "./src/Helper/GuidHelper.ts"), exports);
__exportStar(__webpack_require__(/*! ./StringHelper */ "./src/Helper/StringHelper.ts"), exports);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

// created from 'create-ts-index'
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helper = exports.Core = void 0;
var CoreImport = __webpack_require__(/*! ./Core */ "./src/Core/index.ts");
var HelperImport = __webpack_require__(/*! ./Helper */ "./src/Helper/index.ts");
exports.Core = CoreImport;
exports.Helper = HelperImport;

})();

exports.MuddeCore = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=core.js.map