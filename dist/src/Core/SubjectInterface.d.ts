/**
 * Subject for Observer pattern
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
import { ObserverInterface } from "./ObserverInterface";
export interface SubjectInterface {
    attach(observer: ObserverInterface): void;
    detach(observer: ObserverInterface): void;
    notify(source: any, eventNumber: number): void;
}
