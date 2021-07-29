import ObserverInterface from "./ObserverInterface";

export default interface SubjectInterface {

   attach(observer:ObserverInterface):void
   detach(observer:ObserverInterface):void
   notify(source:any, eventNumber:number, id:string):void
   
}