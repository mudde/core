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
export class NodeCore {

   private _root?: HTMLElement
   private _current?: HTMLElement
   private _document?: Document
   private _idSearch: HTMLElement[] = []
   private _click: string[] = ['click']
   private _change: string[] = ['keydown', 'keypress', 'keyup', 'mousedown', 'mouseup', 'change']
   
   constructor(tagName: string, attributes?: any, text?: string, documentX?: Document) {
      this._document = documentX ?? document
      
      this._root = this._current = tagName[0] === '#'
         ? this.getNodeById(tagName.substr(1))
         : this.createNode(tagName, attributes, text)
   }

   private getNodeById(nodeId: string): HTMLElement {
      let document = this.document
      let element = document.getElementById(nodeId)

      if (!element) throw new Error('Element not found by id!')

      return element
   }

   private createNode(tagName: string, attributes?: any, text?: string): HTMLElement {
      let document = this.document
      let node = document.createElement(tagName)

      if (attributes) {
         for (let key in attributes) {
            let value = attributes[key]

            if (key === 'id') {
               this._idSearch[value] = node
            }

            node.setAttribute(key, value)
         }
      }

      if (text) {
         node.innerText = text
      }

      return node
   }

   click(callable: EventListener):NodeCore {
      let current: HTMLElement = this.current
      
      this._click.forEach((name) => {
         current.addEventListener(name, callable)
      })

      return this
   }

   change(callable: EventListener): NodeCore {
      let current: HTMLElement = this.current
      
      this._change.forEach((name) => {
         current.addEventListener(name, callable)
      })

      return this
   }

   moveInNode(callable: CallableFunction): NodeCore {
      let current: HTMLElement = this.current
      let tmpNode = this.document.createElement('div')

      current.replaceWith(tmpNode)

      let newNodeRaw = callable(current)
      let newNode = this.importElement(newNodeRaw)

      tmpNode.replaceWith(newNode)

      return this
   }

   removeChild(node: NodeCore | HTMLElement): NodeCore {
      let nodeX = node instanceof NodeCore ? node.root : node

      this.current.removeChild(nodeX)

      return this
   }

   addSibling_(tagName: string, attributes?: any, text?: string): NodeCore {
      return this.addSibling(tagName, attributes, text, true)
   }

   addSibling(tagName: string, attributes?: any, text?: string, setCurrent: boolean = false): NodeCore {
      let newNode = this.createNode(tagName, attributes, text)
      let parent = this.current.parentNode;

      parent?.insertBefore(newNode, this.current)

      if (setCurrent) {
         this._current = newNode
      }

      return this
   }

   addSiblingNode_(node: NodeCore): NodeCore {
      return this.addSiblingNode(node, true)
   }

   addSiblingNode(node: NodeCore, setCurrent: boolean = false): NodeCore {
      let newNode = this.importElement(node)
      let current = this.current
      let parent = current.parentElement;

      parent?.insertBefore(newNode, current)

      if (setCurrent) {
         this._current = newNode
      }

      return this
   }

   addClass(className: string): NodeCore {
      let currentClass = this.current.className

      this.current.setAttribute('class', `${currentClass} ${className}`.trimLeft())

      return this
   }

   removeClass(className: string): NodeCore {
      let currentClass = ' ' + this.current.className + ' '

      this.current.setAttribute('class', currentClass.replace(' ' + className + ' ', ' ').trim())

      return this
   }


   clear() {
      let root = this._current = this.root

      root.innerHTML = ''
   }

   getAttribute(name: string): string | null {
      return this.current.getAttribute(name)
   }

   getElementById(id: string): NodeCore {
      if (id in this._idSearch) {
         this._current = this._idSearch[id]
      }

      return this
   }

   getElementByTagName(tagName: string): HTMLCollectionOf<Element> {
      let element = this.root.getElementsByTagName(tagName)

      return element
   }

   getElementByClass(className: string): HTMLCollectionOf<Element> {
      let element = this.root.getElementsByClassName(className)

      return element
   }

   hasAttribute(name: string): boolean {
      return this.current.hasAttribute(name)
   }

   hasElementById(id: string): boolean {
      return id in this._idSearch
   }

   hasElementByClass(className: string): boolean {
      return this.root.getElementsByClassName(className).length !== 0
   }

   a(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): NodeCore {
      return this.appendNode(tagName, attributes, text, setCurrent)
   }

   prependNode_(tagName: string, attributes?: any, text?: string): NodeCore {
      return this.prependNode(tagName, attributes, text, true)
   }

   prependNode(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): NodeCore {
      let firstChild = this.current.firstChild

      if (firstChild) {
         let HTMLElement = this.current.insertBefore(this.createNode(tagName, attributes, text), firstChild)

         if (setCurrent === true) {
            this._current = HTMLElement
         }
      }

      return this
   }

   appendNode(tagName: string, attributes?: any, text?: string, setCurrent: boolean = false): NodeCore {
      let newNode = this.createNode(tagName, attributes, text)
      let HTMLElement = this.current.appendChild(newNode)

      HTMLElement.innerText = text ? text : ''

      if (setCurrent === true) {
         this._current = HTMLElement
      }

      return this
   }

   a_(tagName: string, attributes?: any, text?: string): NodeCore {
      return this.appendNode(tagName, attributes, text, true)
   }

   appendNode_(tagName: string, attributes?: any, text?: string): NodeCore {
      return this.appendNode(tagName, attributes, text, true)
   }

   toHTML(outerHTML: boolean = true): string {
      let root: HTMLElement = this.root
      return outerHTML ? root.outerHTML : root.innerHTML
   }

   setAttributes(attributes: any): NodeCore {
      let node = this.current

      for (let key in attributes) {
         let value = attributes[key]

         if (key === 'id') {
            this._idSearch[value] = node
         }

         node.setAttribute(key, value)
      }

      return this
   }

   parent(): NodeCore {
      let parent = this.current.parentElement

      this._current = parent === null ? this.current : parent

      return this
   }

   _(): NodeCore {                   //  Alias for method 'parent'
      return this.parent()
   }

   prependElement(node: HTMLElement | NodeCore | null): NodeCore {
      if (node === null) return this

      let childNode = this.importElement(node)
      let firstChild = this.current.firstChild

      if (firstChild) {
         this.current.insertBefore(childNode, firstChild)
      }

      this._current = childNode

      return this
   }

   prependElement_(node: HTMLElement | NodeCore | null): NodeCore {
      if (node === null) return this

      let childNode = this.importElement(node)
      let firstChild = this.current.firstChild

      if (firstChild) {
         this.current.insertBefore(childNode, firstChild)
      }

      return this
   }

   appendElement(node: HTMLElement | NodeCore | null): NodeCore {
      if (node === null) return this

      let childNode = this.importElement(node)

      this._current = this.current.appendChild(childNode)

      return this
   }

   importElement(node: HTMLElement | NodeCore): HTMLElement {
      if (!(node instanceof NodeCore)) {
         return node
      }

      let childIdNodes = node._idSearch

      for (var key in childIdNodes) {
         this._idSearch[key] = childIdNodes[key]
      }

      return node.root
   }

   appendElement_(node: HTMLElement | NodeCore | null): NodeCore {
      if (node === null) return this

      let childNode = this.importElement(node)

      this.current.appendChild(childNode)

      return this
   }

   gotoRoot(): NodeCore {
      this._current = this.root

      return this
   }

   get root(): HTMLElement {
      if (this._root === undefined) throw new Error('Root node not defined!')

      return this._root
   }

   get id(): string | null {
      return this.current.getAttribute('id')
   }

   set innerHTML(html: string) {
      this.current.innerHTML = html
   }

   get idSearch(): HTMLElement[] {
      return this._idSearch
   }

   get current(): HTMLElement {
      if (this._current === undefined) throw new Error('Current not set!');

      return this._current
   }

   get document(): Document {
      if (this._document === undefined) throw new Error('Document not set!');

      return this._document
   }

}