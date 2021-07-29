import {ObserverInterface} from "./ObserverInterface";

export interface SubjectInterface {

   attach(observer:ObserverInterface):void
   detach(observer:ObserverInterface):void
   notify(source:any, eventNumber:number, id:string):void
   
}