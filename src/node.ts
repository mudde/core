export default class Node {

   private _root?: HTMLElement
   private _current?: HTMLElement
   private _document?: Document

   constructor(tagName: string, attributes?: any, text?: string) {
      this._document = document

      this._root = this._current = tagName[0] === '#'
         ? this.getNodeById(tagName)
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

            node.setAttribute(key, value)
         }
      }

      if (text) {
         node.innerText = text
      }

      return node
   }

   addClass(className: string): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let currentClass = this._current.className

      this._current.setAttribute('class', `${currentClass} ${className}`.trimLeft())

      return this
   }

   getElementById(id: string): Node {
      let element = document.getElementById(id)

      if (element) {
         this._current = element
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

         HTMLElement.innerText = text ? text : ''

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

   prependElement(node: HTMLElement | Node): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let childNode = node instanceof Node ? node.root() : node
      let firstChild = this._current.firstChild

      if (firstChild) {
         firstChild.insertBefore(childNode, null)
      }

      return this
   }

   prependElement_(node: HTMLElement | Node): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let childNode = node instanceof Node ? node.root() : node
      let firstChild = this._current.firstChild

      if (firstChild) {
         this._current = firstChild.insertBefore(childNode, null)
      }

      return this
   }

   appendElement(node: HTMLElement | Node): Node {
      if (this._current === undefined) throw new Error('Node not set!')

      let childNode = node instanceof Node ? node.root() : node

      this._current = this._current.appendChild(childNode)

      return this
   }

   appendElement_(node: HTMLElement | Node): Node {
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
}