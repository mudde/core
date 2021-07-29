import Node from "./NodeCore";
export default class BsNodeCore extends Node {
    formGroup(): Node;
    formGroup_(): Node;
    inputGroupText(text: string): Node;
    inputGroupText_(text: string): Node;
    inputGroup(): Node;
    inputGroup_(): Node;
    label(label: string, forAttribute: string, attributes?: any): Node;
    label_(label: string, forAttribute: string, attributes?: any): Node;
    input(type: string, id: string): Node;
    input_(type: string, id: string): Node;
    help(text: string, id: string): Node;
    help_(text: string, id: string): Node;
    span(text: string, attributes?: any): Node;
    span_(text: string, attributes?: any): Node;
}
