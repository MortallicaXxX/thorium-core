import { VirtualElement } from "../virtual-element";

/** Renvoie l'élément virtuel parent d'un élément virtuel donné */
export const getParentNode = ( ve:VirtualElement ) => {
  return ve.element.parentNode;
}