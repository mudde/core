import { ObserverInterface } from "./ObserverInterface";
import { SubjectInterface } from "./SubjectInterface";
/**
 * Subject for Observer pattern
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
export declare abstract class SubjectAbstract implements SubjectInterface {
    private _observers;
    attach(observer: ObserverInterface): void;
    detach(observer: ObserverInterface): void;
    notify(source: any, eventNumber?: number): void;
}
