import HandlerInterface from "./HandlerInterface";
export declare abstract class BaseHandler implements HandlerInterface {
    private _nextEvent?;
    setNext(event: HandlerInterface): HandlerInterface;
    handle(data: any): any;
    get nextEvent(): HandlerInterface | undefined;
}
