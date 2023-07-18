import {  createElement } from "./createElement";
import { VirtualElement } from "../virtual-element";

/** Crée une copie d'un élément virtuel existant. */
export const cloneElement = (ve: VirtualElement) => {
  return createElement( ve.patern.localName );
}