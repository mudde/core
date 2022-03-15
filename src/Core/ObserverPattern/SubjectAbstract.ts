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

   attach(eventNumber: number, observer: ObserverInterface): void {
      this._observers[eventNumber] = this._observers[eventNumber] ?? []
      this._observers[eventNumber].push(observer)
   }

   detach(observer: ObserverInterface): void {
      this._observers.forEach(
         (observerList) => {
            observerList.flatten(
               (item: ObserverInterface) => { return item !== observer })
         }
      )
   }

   notify(source: any, eventNumber: number = null): void {
      var event = source instanceof Event ? source : new Event(source, eventNumber)
      let pause = this._pause
      
      if (this._observers[eventNumber]) {
         this._observers[eventNumber].forEach(element => {
            pause.indexOf(element) != -1 || element.update(event)
         })
      }
   }

   pauseAttach(observer: ObserverInterface): void {
      let pause = this._pause

      if (pause.indexOf(observer) == -1) {
         this._pause.push(observer)
      }
   }

}