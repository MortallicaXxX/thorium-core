import { VirtualElement } from "../virtual-element";

/** Renvoie le nom de balise de l'élément virtuel */
export const getTagName = ( ve: VirtualElement ) => {
  return ve.element.tagName;
}