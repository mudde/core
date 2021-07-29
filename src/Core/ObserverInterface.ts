import Event from "./Event";

export default interface ObserverInterface {

   eventNumber:number

   update(event: Event)
   
}