import { NodeCore } from "./NodeCore";
export declare class BsNodeCore extends NodeCore {
    formGroup(): NodeCore;
    formGroup_(): NodeCore;
    inputGroupText(text: string): NodeCore;
    inputGroupText_(text: string): NodeCore;
    inputGroup(): NodeCore;
    inputGroup_(): NodeCore;
    label(label: string, forAttribute: string, attributes?: any): NodeCore;
    label_(label: string, forAttribute: string, attributes?: any): NodeCore;
    input(type: string, id: string): NodeCore;
    input_(type: string, id: string): NodeCore;
    help(text: string, id: string): NodeCore;
    help_(text: string, id: string): NodeCore;
    span(text: string, attributes?: any): NodeCore;
    span_(text: string, attributes?: any): NodeCore;
}
