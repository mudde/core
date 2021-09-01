/**
 * Event for Observer pattern
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
export declare class Event {
    private _source?;
    private _eventNumber?;
    constructor(source: any, event: number);
    get source(): any;
    get eventNumber(): number;
}
