/**
 * Chain of responsibility base handler
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
import { HandlerInterface } from "./HandlerInterface"

export abstract class BaseHandler implements HandlerInterface {

  abstract handler(data)

  private _nextEvent?: HandlerInterface | undefined
  
  setNext(event: HandlerInterface): HandlerInterface {
    this._nextEvent = event

    return event
  }

  handle(data: any) {
    this.handler(data)

    if (this._nextEvent) {
      this._nextEvent.handle(data)
    }

    return data
  }

  public get nextEvent(): HandlerInterface | undefined {
    return this._nextEvent
  }
}