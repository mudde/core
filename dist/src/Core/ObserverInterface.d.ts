/**
 * Observer pattern interface
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
import { Event } from "./Event";
export interface ObserverInterface {
    eventNumber: number;
    update(event: Event): any;
}
