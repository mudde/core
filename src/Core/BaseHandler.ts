import HandlerInterface from "./HandlerInterface"

export default abstract class BaseHandler implements HandlerInterface {

  private _nextEvent?: HandlerInterface | undefined
  
  setNext(event: HandlerInterface): HandlerInterface {
    this._nextEvent = event

    return event
  }

  handle(data: any) {
    if (this._nextEvent) {
      this._nextEvent.handle(data)
    }

    return data
  }

  public get nextEvent(): HandlerInterface | undefined {
    return this._nextEvent
  }
}