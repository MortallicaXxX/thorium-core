import { VirtualElement } from "../virtual-element";
import { Event , TEventName , TEventHandler } from "../events";

/** Ajoute un écouteur d'événement à un élément virtuel */
export const addEventListener = (ve: VirtualElement, eventName: TEventName, handler: TEventHandler) => {

  return ve.element.addEventListener( eventName , (e:any) => {
    handler.bind(ve)( e , ve ); 
  })

}