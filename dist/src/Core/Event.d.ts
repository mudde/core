export default class Event {
    private _source?;
    private _eventNumber?;
    constructor(source: any, event: number);
    get source(): any;
    get eventNumber(): number;
}
