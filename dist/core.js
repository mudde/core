/*! For license information please see core.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.MuddeCore=e():t.MuddeCore=e()}(self,(function(){return(()=>{"use strict";var t={357:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BaseHandler=void 0;var r=function(){function t(){}return t.prototype.setNext=function(t){return this._nextEvent=t,t},t.prototype.handle=function(t){return this._nextEvent&&this._nextEvent.handle(t),t},Object.defineProperty(t.prototype,"nextEvent",{get:function(){return this._nextEvent},enumerable:!1,configurable:!0}),t}();e.BaseHandler=r},161:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ConfigurableAbstract=void 0;var n=r(414),o=function(){function t(){}return t.prototype.configuring=function(t){var e=this.getDefaultConfig();for(var r in e){var o="configure"+n.StringHelper.ucfirst(r),i=void 0!==this[o],u=t[r]?t[r]:e[r];i?this[o](u):this[r]=u}},t}();e.ConfigurableAbstract=o},538:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Event=void 0;var r=function(){function t(t,e){this._source=t,this._eventNumber=e}return Object.defineProperty(t.prototype,"source",{get:function(){if(void 0===this._source)throw new Error("Source not set!");return this._source},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"eventNumber",{get:function(){if(void 0===this._eventNumber)throw new Error("Event number not set!");return this._eventNumber},enumerable:!1,configurable:!0}),t}();e.Event=r},953:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0})},843:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.NodeCore=void 0;var r=function(){function t(t,e,r,n){this._idSearch=[],this._click=["click"],this._change=["keydown","keypress","keyup","mousedown","mouseup","change"],this._document=null!=n?n:document,this._root=this._current="#"===t[0]?this.getNodeById(t.substr(1)):this.createNode(t,e,r)}return t.prototype.getNodeById=function(t){var e=this.document.getElementById(t);if(!e)throw new Error("Element not found by id!");return e},t.prototype.createNode=function(t,e,r){var n=this.document.createElement(t);if(e)for(var o in e){var i=e[o];"id"===o&&(this._idSearch[i]=n),n.setAttribute(o,i)}return r&&(n.innerText=r),n},t.prototype.click=function(t){var e=this.current;return this._click.forEach((function(r){e.addEventListener(r,t)})),this},t.prototype.change=function(t){var e=this.current;return this._change.forEach((function(r){e.addEventListener(r,t)})),this},t.prototype.moveInNode=function(t){var e=this.current,r=this.document.createElement("div");e.replaceWith(r);var n=t(e),o=this.importElement(n);return r.replaceWith(o),this},t.prototype.removeChild=function(e){var r=e instanceof t?e.root:e;return this.current.removeChild(r),this},t.prototype.addSibling_=function(t,e,r){return this.addSibling(t,e,r,!0)},t.prototype.addSibling=function(t,e,r,n){void 0===n&&(n=!1);var o=this.createNode(t,e,r),i=this.current.parentNode;return null==i||i.insertBefore(o,this.current),n&&(this._current=o),this},t.prototype.addSiblingNode_=function(t){return this.addSiblingNode(t,!0)},t.prototype.addSiblingNode=function(t,e){void 0===e&&(e=!1);var r=this.importElement(t),n=this.current,o=n.parentElement;return null==o||o.insertBefore(r,n),e&&(this._current=r),this},t.prototype.addClass=function(t){var e=this.current.className;return this.current.setAttribute("class",(e+" "+t).trimLeft()),this},t.prototype.removeClass=function(t){var e=" "+this.current.className+" ";return this.current.setAttribute("class",e.replace(" "+t+" "," ").trim()),this},t.prototype.clear=function(){(this._current=this.root).innerHTML=""},t.prototype.getAttribute=function(t){return this.current.getAttribute(t)},t.prototype.getElementById=function(t){return t in this._idSearch&&(this._current=this._idSearch[t]),this},t.prototype.getElementByTagName=function(t){return this.root.getElementsByTagName(t)},t.prototype.getElementByClass=function(t){return this.root.getElementsByClassName(t)},t.prototype.hasAttribute=function(t){return this.current.hasAttribute(t)},t.prototype.hasElementById=function(t){return t in this._idSearch},t.prototype.hasElementByClass=function(t){return 0!==this.root.getElementsByClassName(t).length},t.prototype.a=function(t,e,r,n){return this.appendNode(t,e,r,n)},t.prototype.prependNode_=function(t,e,r){return this.prependNode(t,e,r,!0)},t.prototype.prependNode=function(t,e,r,n){var o=this.current.firstChild;if(o){var i=this.current.insertBefore(this.createNode(t,e,r),o);!0===n&&(this._current=i)}return this},t.prototype.appendNode=function(t,e,r,n){void 0===n&&(n=!1);var o=this.createNode(t,e,r),i=this.current.appendChild(o);return i.innerText=r||"",!0===n&&(this._current=i),this},t.prototype.a_=function(t,e,r){return this.appendNode(t,e,r,!0)},t.prototype.appendNode_=function(t,e,r){return this.appendNode(t,e,r,!0)},t.prototype.toHTML=function(t){void 0===t&&(t=!0);var e=this.root;return t?e.outerHTML:e.innerHTML},t.prototype.setAttributes=function(t){var e=this.current;for(var r in t){var n=t[r];"id"===r&&(this._idSearch[n]=e),e.setAttribute(r,n)}return this},t.prototype.parent=function(){var t=this.current.parentElement;return this._current=null===t?this.current:t,this},t.prototype._=function(){return this.parent()},t.prototype.prependElement=function(t){if(null===t)return this;var e=this.importElement(t),r=this.current.firstChild;return r&&this.current.insertBefore(e,r),this._current=e,this},t.prototype.prependElement_=function(t){if(null===t)return this;var e=this.importElement(t),r=this.current.firstChild;return r&&this.current.insertBefore(e,r),this},t.prototype.appendElement=function(t){if(null===t)return this;var e=this.importElement(t);return this._current=this.current.appendChild(e),this},t.prototype.importElement=function(e){if(!(e instanceof t))return e;var r=e._idSearch;for(var n in r)this._idSearch[n]=r[n];return e.root},t.prototype.appendElement_=function(t){if(null===t)return this;var e=this.importElement(t);return this.current.appendChild(e),this},t.prototype.gotoRoot=function(){return this._current=this.root,this},Object.defineProperty(t.prototype,"root",{get:function(){if(void 0===this._root)throw new Error("Root node not defined!");return this._root},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"id",{get:function(){return this.current.getAttribute("id")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"innerHTML",{set:function(t){this.current.innerHTML=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"idSearch",{get:function(){return this._idSearch},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"current",{get:function(){if(void 0===this._current)throw new Error("Current not set!");return this._current},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"document",{get:function(){if(void 0===this._document)throw new Error("Document not set!");return this._document},enumerable:!1,configurable:!0}),t}();e.NodeCore=r},391:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0})},120:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SubjectAbstract=void 0;var n=r(538),o=function(){function t(){this._observers=[]}return t.prototype.attach=function(t){var e,r=t.eventNumber||null;r&&(this._observers[r]=null!==(e=this._observers[r])&&void 0!==e?e:[],this._observers[r].push(t))},t.prototype.detach=function(t){var e=t.eventNumber||null;e&&this._observers[e]&&this._observers[e].flatten((function(e){return e!==t}))},t.prototype.notify=function(t,e){void 0===e&&(e=null);var r=t instanceof n.Event?t:new n.Event(t,e);this._observers[e]&&this._observers[e].forEach((function(t){t.update(r)}))},t}();e.SubjectAbstract=o},994:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0})},163:function(t,e,r){var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||Object.prototype.hasOwnProperty.call(e,r)||n(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),o(r(357),e),o(r(161),e),o(r(538),e),o(r(953),e),o(r(843),e),o(r(391),e),o(r(994),e),o(r(120),e)},148:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GuidHelper=void 0;var r=function(){function t(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=t.EMPTY,e&&t.isGuid(e)&&(this.value=e)}return t.isGuid=function(e){var r=e.toString();return e&&(e instanceof t||t.validator.test(r))},t.create=function(){return new t([t.gen(2),t.gen(1),t.gen(1),t.gen(1),t.gen(3)].join("-"))},t.createEmpty=function(){return new t("emptyGuid")},t.parse=function(e){return new t(e)},t.raw=function(){return[t.gen(2),t.gen(1),t.gen(1),t.gen(1),t.gen(3)].join("-")},t.gen=function(t){for(var e="",r=0;r<t;r++)e+=(65536*(1+Math.random())|0).toString(16).substring(1);return e},t.prototype.equals=function(e){return t.isGuid(e)&&this.value===e.toString()},t.prototype.isEmpty=function(){return this.value===t.EMPTY},t.prototype.toString=function(){return this.value},t.prototype.toJSON=function(){return{value:this.value}},t.validator=new RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$","i"),t.EMPTY="00000000-0000-0000-0000-000000000000",t}();e.GuidHelper=r},414:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StringHelper=void 0;var r=function(){function t(){}return t.ucfirst=function(t){if(void 0!==t)return t.charAt(0).toUpperCase()+t.slice(1)},t}();e.StringHelper=r},886:function(t,e,r){var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||Object.prototype.hasOwnProperty.call(e,r)||n(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),o(r(148),e),o(r(414),e)}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}var n={};return(()=>{var t=n;Object.defineProperty(t,"__esModule",{value:!0}),t.Helper=t.Core=void 0;var e=r(163),o=r(886);t.Core=e,t.Helper=o})(),n})()}));
//# sourceMappingURL=core.js.map