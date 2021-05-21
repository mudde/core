///<amd-module name='Mudde/Core/Node'/>

export default class Node {

   private _root?: HTMLElement
   private _current?: HTMLElement
   private _document?: Document
   private _idSearch: HTMLElement[] = []

   constructor(tagName: string, attributes?: any, text?: string, documentX?: Document) {
      this._document = typeof document === 'undefined'
         ? documentX
         : document

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

   moveInNode(callable: CallableFunction): Node {
      let current: HTMLElement = this._current ? this._current : this.root
      let newNode = callable(current)

      this.addSiblingNode(newNode)

      return this;
   }

   addSibling(tagName: string, attributes?: any, text?: string): Node {
      let node = this.createNode(tagName, attributes, text)
      let parent = this.current.parentNode;

      parent?.insertBefore(node, this.current)

      return this
   }

   addSiblingNode(node: Node): Node {
      let parent = this.current.parentNode;

      parent?.insertBefore(node.root, this.current)

      return this
   }

   addSiblingElement(node: HTMLElement | Node | null): Node {
      if (node === null) return this

      let newNode = this.getHTMLElement(node)
      let parent = this.current.parentNode;
      if (parent === null) console.info(this.current)

      parent?.insertBefore(newNode, this.current)

      return this
   }

   addClass(className: string): Node {
      let currentClass = this.current.className

      this.current.setAttribute('class', `${currentClass} ${className}`.trimLeft())

      return this
   }

   removeClass(className: string): Node {
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

   getElementById(id: string): Node {
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

   a(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): Node {
      return this.appendNode(tagName, attributes, text, setCurrent)
   }

   prependNode_(tagName: string, attributes?: any, text?: string): Node {
      return this.prependNode(tagName, attributes, text, true)
   }

   prependNode(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): Node {
      let firstChild = this.current.firstChild

      if (firstChild) {
         let HTMLElement = this.current.insertBefore(this.createNode(tagName, attributes, text), firstChild)

         if (setCurrent === true) {
            this._current = HTMLElement
         }
      }

      return this
   }

   appendNode(tagName: string, attributes?: any, text?: string, setCurrent: boolean = false): Node {
      let newNode = this.createNode(tagName, attributes, text)
      let HTMLElement = this.current.appendChild(newNode)

      HTMLElement.innerText = text ? text : ''

      if (setCurrent === true) {
         this._current = HTMLElement
      }

      return this
   }

   a_(tagName: string, attributes?: any, text?: string): Node {
      return this.appendNode(tagName, attributes, text, true)
   }

   appendNode_(tagName: string, attributes?: any, text?: string): Node {
      return this.appendNode(tagName, attributes, text, true)
   }

   toHTML(outerHTML: boolean = true): string {
      let root: HTMLElement = this.root
      return outerHTML ? root.outerHTML : root.innerHTML
   }

   setAttributes(attributes: any): Node {
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

   parent(): Node {
      let parent = this.current.parentElement

      this._current = parent === null ? this.current : parent

      return this
   }

   _(): Node {                   //  Alias for method 'parent'
      return this.parent()
   }

   prependElement(node: HTMLElement | Node | null): Node {
      if (node === null) return this

      let childNode = this.getHTMLElement(node)
      let firstChild = this.current.firstChild

      if (firstChild) {
         this.current.insertBefore(childNode, firstChild)
      }

      this._current = childNode

      return this
   }

   prependElement_(node: HTMLElement | Node | null): Node {
      if (node === null) return this

      let childNode = this.getHTMLElement(node)
      let firstChild = this.current.firstChild

      if (firstChild) {
         this.current.insertBefore(childNode, firstChild)
      }

      return this
   }

   appendElement(node: HTMLElement | Node | null): Node {
      if (node === null) return this

      let childNode = this.getHTMLElement(node)

      this._current = this.current.appendChild(childNode)

      return this
   }

   getHTMLElement(node: HTMLElement | Node): HTMLElement {
      if (!(node instanceof Node)) {
         return node
      }

      let childIdNodes = node._idSearch

      for (var key in childIdNodes) {
         this._idSearch[key] = childIdNodes[key]
      }

      return node.root
   }

   appendElement_(node: HTMLElement | Node | null): Node {
      if (node === null) return this

      let childNode = this.getHTMLElement(node)

      this.current.appendChild(childNode)

      return this
   }

   gotoRoot(): Node {
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