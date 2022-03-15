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
    private _pause;
    attach(eventNumber: number, observer: ObserverInterface | CallableFunction): void;
    detach(observer: ObserverInterface | CallableFunction): void;
    notify(source: any, eventNumber?: number): void;
    pauseAttach(observer: ObserverInterface | CallableFunction): void;
    pauseDetach(observer: ObserverInterface | CallableFunction): void;
}
