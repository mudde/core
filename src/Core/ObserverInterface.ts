import {Event} from "./Event";

export interface ObserverInterface {

   eventNumber:number

   update(event: Event)
   
}