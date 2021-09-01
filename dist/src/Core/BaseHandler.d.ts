/**
 * Chain of responsibility base handler
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
import { HandlerInterface } from "./HandlerInterface";
export declare abstract class BaseHandler implements HandlerInterface {
    private _nextEvent?;
    setNext(event: HandlerInterface): HandlerInterface;
    handle(data: any): any;
    get nextEvent(): HandlerInterface | undefined;
}
