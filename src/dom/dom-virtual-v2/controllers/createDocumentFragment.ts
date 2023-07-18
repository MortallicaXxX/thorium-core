import { VirtualElement } from "../virtual-element";
import { DOMTokenList } from "..";
import { getElementByElementId } from "..";

/** Crée un fragment de document virtuel, qui peut être utilisé comme un conteneur temporaire pour d'autres éléments virtuels avant de les ajouter au DOM */
export const createDocumentFragment = (elementId:string) => {

  if(!DOMTokenList.has(elementId))return null;

  let recursiveMap = ( virtualElement:VirtualElement ) => {
    let { patern } = virtualElement;

    let newPatern = { ...patern } as (VirtualElement['patern'] | {childrens : any[]});

    if(newPatern.childrens && newPatern.childrens.length > 0){
      newPatern.childrens = Array.from( patern.childrens , ( key ) => {
        return recursiveMap( getElementByElementId(key) );
      } )
    };

    return newPatern;
  }

  let virtualElement = getElementByElementId(elementId);
  return recursiveMap( virtualElement );

}