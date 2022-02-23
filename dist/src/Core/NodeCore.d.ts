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
export declare class NodeCore {
    private _root?;
    private _current?;
    private _document?;
    private _idSearch;
    private _click;
    private _change;
    constructor(tagName: string, attributes?: any, text?: string, documentX?: Document);
    private getNodeById;
    private createNode;
    click(callable: EventListener): NodeCore;
    change(callable: EventListener): NodeCore;
    moveInNode(callable: CallableFunction): NodeCore;
    removeChildren(): NodeCore;
    removeChild(node: NodeCore | HTMLElement): NodeCore;
    addSibling_(tagName: string, attributes?: any, text?: string): NodeCore;
    addSibling(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): NodeCore;
    addSiblingNode_(node: NodeCore): NodeCore;
    addSiblingNode(node: NodeCore, setCurrent?: boolean): NodeCore;
    addClass(className: string): NodeCore;
    removeClass(className: string): NodeCore;
    clear(): void;
    getAttribute(name: string): string | null;
    getElementById(id: string): NodeCore;
    getElementByTagName(tagName: string): HTMLCollectionOf<Element>;
    getElementByClass(className: string): HTMLCollectionOf<Element>;
    hasAttribute(name: string): boolean;
    hasElementById(id: string): boolean;
    hasElementByClass(className: string): boolean;
    a(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): NodeCore;
    prependNode_(tagName: string, attributes?: any, text?: string): NodeCore;
    prependNode(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): NodeCore;
    appendNode(tagName: string, attributes?: any, text?: string, setCurrent?: boolean): NodeCore;
    a_(tagName: string, attributes?: any, text?: string): NodeCore;
    appendNode_(tagName: string, attributes?: any, text?: string): NodeCore;
    toHTML(outerHTML?: boolean): string;
    setAttributes(attributes: any): NodeCore;
    parent(): NodeCore;
    _(): NodeCore;
    prependElement(node: HTMLElement | NodeCore | null): NodeCore;
    prependElement_(node: HTMLElement | NodeCore | null): NodeCore;
    appendElement(node: HTMLElement | NodeCore | null): NodeCore;
    importElement(node: HTMLElement | NodeCore): HTMLElement;
    appendElement_(node: HTMLElement | NodeCore | null): NodeCore;
    gotoRoot(): NodeCore;
    get root(): HTMLElement;
    get id(): string | null;
    set innerHTML(html: string);
    get idSearch(): HTMLElement[];
    get current(): HTMLElement;
    get document(): Document;
}
