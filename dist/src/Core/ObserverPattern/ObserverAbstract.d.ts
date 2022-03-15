/**
 * Observer pattern interface
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
import { Event } from "./Event";
import { ObserverInterface } from "./ObserverInterface";
export declare abstract class ObserverAbstract implements ObserverInterface {
    eventNumber: number;
    abstract update(event: Event): any;
}
