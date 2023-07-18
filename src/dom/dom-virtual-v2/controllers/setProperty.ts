import { VirtualElement } from "../virtual-element";

export const setProperty = ( ve: VirtualElement , propertyName:string , value : any ) => {
  ve.patern.proto[propertyName] = value;
  if(ve.element)ve.element[propertyName] = value;
}