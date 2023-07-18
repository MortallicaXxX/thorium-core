import { VirtualElement } from "../virtual-element";
import { DOMTokenList } from "../";

/** Renvoie la liste des éléments virtuels enfants d'un élément virtuel donné */
export const getChildNodes = ( ve:VirtualElement ) => {

  if( 'patern' in ve == false )return [];
  else if('childrens' in ve.patern == false)return [];
  else return Array.from( ve.patern.childrens , (key) => {
    return DOMTokenList.get( key );
  } )

}