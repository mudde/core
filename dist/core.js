(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MuddeCore"] = factory();
	else
		root["MuddeCore"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Core/BaseHandler.ts":
/*!*********************************!*\
  !*** ./src/Core/BaseHandler.ts ***!
  \*********************************/
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

/***/ "./src/Core/ConfigurableAbstract.ts":
/*!******************************************!*\
  !*** ./src/Core/ConfigurableAbstract.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurableAbstract = void 0;
var StringHelper_1 = __webpack_require__(/*! ../Helper/StringHelper */ "./src/Helper/StringHelper.ts");
var ConfigurableAbstract = /** @class */ (function () {
    function ConfigurableAbstract() {
    }
    ConfigurableAbstract.prototype.configuring = function (config) {
        var defaultConfig = this.getDefaultConfig();
        for (var key in defaultConfig) {
            var methodName = 'configure' + StringHelper_1.StringHelper.ucfirst(key);
            var hasMethod = this[methodName] !== undefined;
            var value = config[key] ? config[key] : defaultConfig[key];
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

/***/ "./src/Core/Event.ts":
/*!***************************!*\
  !*** ./src/Core/Event.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(source, event) {
        this._source = source;
        this._eventNumber = event;
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

/***/ "./src/Core/HandlerInterface.ts":
/*!**************************************!*\
  !*** ./src/Core/HandlerInterface.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Core/NodeCore.ts":
/*!******************************!*\
  !*** ./src/Core/NodeCore.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeCore = void 0;
var NodeCore = /** @class */ (function () {
    function NodeCore(tagName, attributes, text, documentX) {
        this._idSearch = [];
        this._document = documentX !== null && documentX !== void 0 ? documentX : document;
        this._root = this._current = tagName[0] === '#'
            ? this.getNodeById(tagName.substr(1))
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
    NodeCore.prototype.moveInNode = function (callable) {
        var current = this.current;
        var tmpNode = this.document.createElement('div');
        current.replaceWith(tmpNode);
        var newNodeRaw = callable(current);
        var newNode = this.importElement(newNodeRaw);
        tmpNode.replaceWith(newNode);
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

/***/ "./src/Core/ObserverInterface.ts":
/*!***************************************!*\
  !*** ./src/Core/ObserverInterface.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Core/SubjectInterface.ts":
/*!**************************************!*\
  !*** ./src/Core/SubjectInterface.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/Core/bsNodeCore.ts":
/*!********************************!*\
  !*** ./src/Core/bsNodeCore.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BsNodeCore = void 0;
var NodeCore_1 = __webpack_require__(/*! ./NodeCore */ "./src/Core/NodeCore.ts");
var BsNodeCore = /** @class */ (function (_super) {
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
}(NodeCore_1.NodeCore));
exports.BsNodeCore = BsNodeCore;


/***/ }),

/***/ "./src/Core/index.ts":
/*!***************************!*\
  !*** ./src/Core/index.ts ***!
  \***************************/
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
__exportStar(__webpack_require__(/*! ./BaseHandler */ "./src/Core/BaseHandler.ts"), exports);
__exportStar(__webpack_require__(/*! ./ConfigurableAbstract */ "./src/Core/ConfigurableAbstract.ts"), exports);
__exportStar(__webpack_require__(/*! ./Event */ "./src/Core/Event.ts"), exports);
__exportStar(__webpack_require__(/*! ./HandlerInterface */ "./src/Core/HandlerInterface.ts"), exports);
__exportStar(__webpack_require__(/*! ./NodeCore */ "./src/Core/NodeCore.ts"), exports);
__exportStar(__webpack_require__(/*! ./ObserverInterface */ "./src/Core/ObserverInterface.ts"), exports);
__exportStar(__webpack_require__(/*! ./SubjectInterface */ "./src/Core/SubjectInterface.ts"), exports);
__exportStar(__webpack_require__(/*! ./bsNodeCore */ "./src/Core/bsNodeCore.ts"), exports);


/***/ }),

/***/ "./src/Helper/GuidHelper.ts":
/*!**********************************!*\
  !*** ./src/Helper/GuidHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GuidHelper = void 0;
// https://raw.githubusercontent.com/NicolasDeveloper/guid-typescript/master/lib/guid.ts
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
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.ucfirst = function (value) {
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

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=core.js.map