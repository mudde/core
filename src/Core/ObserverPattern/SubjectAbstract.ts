import { Event } from "./Event"
import { ObserverInterface } from "./ObserverInterface"
import { SubjectInterface } from "./SubjectInterface"

/**
 * Subject for Observer pattern
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
export abstract class SubjectAbstract implements SubjectInterface {

   private _observers: any[] = []
   private _pause: any[] = []

   attach(eventNumber: number, observer: ObserverInterface | CallableFunction): void {
      this._observers[eventNumber] = this._observers[eventNumber] ?? []
      this._observers[eventNumber].push(observer)
   }

   detach(observer: ObserverInterface | CallableFunction): void {
      this._observers.forEach(
         (observerList) => {
            observerList.flatten(
               (item: ObserverInterface | CallableFunction) => { return item !== observer })
         }
      )
   }

   notify(source: any, eventNumber: number = null): void {
      let event = source instanceof Event ? source : new Event(source, eventNumber)
      let pause = this._pause
      let observers: (ObserverInterface | CallableFunction)[] = this._observers[event.eventNumber] ?? []

      observers.forEach(element => {
         if (pause.indexOf(element) === -1) {
            typeof element === 'function'
               ? element(event)
               : element.update(event)
         }
      })
   }

   pauseAttach(observer: ObserverInterface | CallableFunction): void {
      let pause = this._pause

      if (pause.indexOf(observer) == -1) {
         this._pause.push(observer)
      }
   }

   pauseDetach(observer: ObserverInterface | CallableFunction): void {
      let pause = this._pause
      let indexOf = pause.indexOf(observer)

      if (indexOf !== -1) {
         this._pause = [...pause.slice(0, indexOf), ...pause.slice(indexOf + 1)]
      }
   }

}