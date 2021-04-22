export default class Node {

  private _root?: HTMLElement
  private _current?: HTMLElement

  constructor(tagName: string, attributes?: any, text?: string) {
     this._root = this._current = this.createNode(tagName, attributes, text)
  }

  addClass(className: string): Node {
     if (this._current === undefined) throw new Error('Node not set!')

     this._current.className = `${this._current.className} ${className}`

     return this
  }

  set innerHTML(html: string) {
     if (this._current === undefined) throw new Error('Node not set!')

     this._current.innerHTML = html
  }

  private createNode(tagName: string, attributes?: any, text?: string): HTMLElement {
     var node = document.createElement(tagName)

     if (attributes) {
        for (let key in attributes) {
           let value = attributes[key];
           node.setAttribute(key, value)
        }
     }

     if (text) {
        node.innerText = text
     }

     return node
  }

  getElementById(id: string): Node {
     var element = document.getElementById(id)

     if (element) {
        this._current = element
     }

     return this
  }

  getElementByTagName(tagName: string): HTMLCollectionOf<Element> {
     if (this._root === undefined) throw new Error('Node not set!')

     var element = this._root.getElementsByTagName(tagName)

     return element
  }

  getElementByClass(className: string): HTMLCollectionOf<Element> {
     if (this._root === undefined) throw new Error('Node not set!')

     var element = this._root.getElementsByClassName(className)

     return element
  }

  hasElementByClass(className: string): boolean {
     if (this._root === undefined) throw new Error('Node not set!')

     return this._root.getElementsByClassName(className).length !== 0
  }

  appendNode(tagName: string, attributes?: any, text?: string, setCurrent?: boolean) {
     if (this._current === undefined) throw new Error('Node not set!')

     var HTMLElement = this._current.appendChild(this.createNode(tagName, attributes))

     HTMLElement.innerText = text ? text : ''

     if (setCurrent === true) {
        this._current = HTMLElement
     }

     return this
  }

  appendNode_(tagName: string, attributes?: any, text?: string) {
     return this.appendNode(tagName, attributes, text, true)
  }

  toHTML(outerHTML: boolean = true): string {
     if (this._root === undefined) throw new Error('Node not set!')

     var root: HTMLElement = this._root

     return outerHTML ? root.outerHTML : root.innerHTML
  }

  setAttributes(attributes: any) {
     if (this._current === undefined) throw new Error('Node not set!')

     var node = this._current

     for (let key in attributes) {
        let value = attributes[key];

        node.setAttribute(key, value)
     }

     return this
  }

  _(): Node {       //  goto parent element
     if (this._current === undefined) throw new Error('Node not set!')

     var parent = this._current.parentElement

     this._current = parent === null ? this._current : parent

     return this
  }

  prependElement(node: HTMLElement | Node): Node {
     if (this._current === undefined) throw new Error('Node not set!')

     var childNode = node instanceof Node ? node.root() : node
     var firstChild = this._current.firstChild;

     if (firstChild) {
        this._current = firstChild.insertBefore(childNode, null)
     }

     return this
  }

  appendElement(node: HTMLElement | Node): Node {
     if (this._current === undefined) throw new Error('Node not set!')

     var childNode = node instanceof Node ? node.root() : node

     this._current = this._current.appendChild(childNode)

     return this
  }

  appendElement_(node: HTMLElement | Node): Node {
     if (this._current === undefined) throw new Error('Node not set!')

     var childNode = node instanceof Node ? node.root() : node

     this._current.appendChild(childNode)

     return this
  }

  gotoRoot(): Node {
     this._current = this._root;

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
}