///<amd-module name='Mudde/Core/Node'/>

export default class Node {

   private _root?: HTMLElement
   private _current?: HTMLElement
   private _document?: Document
   private _idSearch: HTMLElement[] = []

   constructor(tagName: string, attributes?: any, text?: string, documentX?: Document) {
      this._document = typeof document === 'undefined' ? documentX : document

      this._root = this._current = tagName[0] === '#'
         ? this.getNodeById(tagName.substr(1))
         : this.createNode(tagName, attributes, text)
   }

   private getNodeById(nodeId: string): HTMLElement {
      let document = this._document
      if (!document) throw new Error("Document not set!")

      let element = document.getElementById(nodeId)
      if (!element) throw new Error('Element not found by id!')

      return element
   }

   private createNode(tagName: string, attributes?: any, text?: string): HTMLElement {
      let document = this._document
      if (!document) throw new Error("Document not set!")

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

   addSibling(tagName: string, attributes?: any, text?: string): HTMLElement {
      if (this._current === undefined) throw new Error('Node not set!')

      let node = this.createNode(tagName, attributes, text)
      let parent = this._current.parentNode;

      parent?.insertBefore(node, this._current)

      return node
   }

   addSiblingElement(node: HTMLElement | Node | null): Node {
      if (node === null) return this
      if (this._current === undefined) throw new Error('Node not set!')

      let newNode = node instanceof Node ? node.root() : node
      let parent = this._current.parentNode;
      if (parent === null) console.info(this._current)

      parent?.insertBefore(newNode, this._current)

      return this
   }

   addClass(className: string): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let currentClass = this._current.className

      this._current.setAttribute('class', `${currentClass} ${className}`.trimLeft())

      return this
   }

   removeClass(className: string): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let currentClass = ' ' + this._current.className + ' '

      this._current.setAttribute('class', currentClass.replace(' ' + className + ' ', ' ').trim())

      return this
   }


   getAttribute(name: string): string | null {
      if (this._current === undefined) throw new Error('Node not set!')

      return this._current.getAttribute(name)
   }

   getElementById(id: string): Node {
      if (id in this._idSearch) {
         this._current = this._idSearch[id]
      }

      return this
   }

   getElementByTagName(tagName: string): HTMLCollectionOf<Element> {
      if (this._root === undefined) throw new Error('Node not set!')

      let element = this._root.getElementsByTagName(tagName)

      return element
   }

   getElementByClass(className: string): HTMLCollectionOf<Element> {
      if (this._root === undefined) throw new Error('Node not set!')

      let element = this._root.getElementsByClassName(className)

      return element
   }

   hasAttribute(name: string): boolean {
      if (this._current === undefined) throw new Error('Node not set!')

      return this._current.hasAttribute(name)
   }

   hasElementById(id: string): boolean {
      if (this._document === undefined) throw new Error('Document not set!')

      return this._document.getElementById(id) !== null
   }

   hasElementByClass(className: string): boolean {
      if (this._root === undefined) throw new Error('Node not set!')

      return this._root.getElementsByClassName(className).length !== 0
   }

   a(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): Node {
      return this.appendNode(tagName, attributes, text, setCurrent)
   }

   prependNode_(tagName: string, attributes?: any, text?: string): Node {
      return this.prependNode(tagName, attributes, text, true)
   }

   prependNode(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let firstChild = this._current.firstChild

      if (firstChild) {
         let HTMLElement = this._current.insertBefore(this.createNode(tagName, attributes, text), firstChild)

         if (setCurrent === true) {
            this._current = HTMLElement
         }
      }

      return this
   }

   appendNode(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let HTMLElement = this._current.appendChild(this.createNode(tagName, attributes, text))

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
      if (this._root === undefined) throw new Error('Node not set!')

      let root: HTMLElement = this._root
      return outerHTML ? root.outerHTML : root.innerHTML
   }

   setAttributes(attributes: any): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let node = this._current

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
      if (this._current === undefined) throw new Error('Node not set!')

      let parent = this._current.parentElement

      this._current = parent === null ? this._current : parent

      return this
   }

   _(): Node {                   //  Alias for method 'parent'
      return this.parent()
   }

   prependElement(node: HTMLElement | Node | null): Node {
      if (node === null) return this
      if (this._current === undefined) throw new Error('Node not set!')

      let childNode = node instanceof Node ? node.root() : node
      let firstChild = this._current.firstChild

      if (firstChild) {
         firstChild.insertBefore(childNode, null)
      }

      return this
   }

   prependElement_(node: HTMLElement | Node | null): Node {
      if (node === null) return this
      if (this._current === undefined) throw new Error('Node not set!')

      if (node instanceof Node) {
         this._idSearch.push(...node.idSearch)
      }

      let childNode = node instanceof Node ? node.root() : node
      let firstChild = this._current.firstChild

      if (firstChild) {
         this._current = firstChild.insertBefore(childNode, null)
      }

      return this
   }

   appendElement(node: HTMLElement | Node | null): Node {
      if (node === null) return this
      if (this._current === undefined) throw new Error('Node not set!')

      let childNode = node instanceof Node ? node.root() : node

      this._current = this._current.appendChild(childNode)

      return this
   }

   appendElement_(node: HTMLElement | Node | null): Node {
      if (node === null) return this
      if (this._current === undefined) throw new Error('Node not set!')

      let childNode = node instanceof Node ? node.root() : node

      this._current.appendChild(childNode)

      return this
   }

   gotoRoot(): Node {
      this._current = this._root

      return this
   }

   root(): HTMLElement {
      if (this._root === undefined) throw new Error('Root node not defined!')

      return this._root
   }

   get id(): string | null {
      if (this._current === undefined) throw new Error('Node not set!')

      return this._current.getAttribute('id')
   }

   set innerHTML(html: string) {
      if (this._current === undefined) throw new Error('Node not set!')

      this._current.innerHTML = html
   }

   get idSearch(): HTMLElement[] {
      return this._idSearch
   }
}