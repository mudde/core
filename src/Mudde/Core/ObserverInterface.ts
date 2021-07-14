import Event from "Mudde/Core/Event";

export default interface ObserverInterface {

   eventNumber:number

   update(event: Event)
   
}