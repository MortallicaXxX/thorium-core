import { VirtualElement } from "../virtual-element";
import { getElementByElementId } from './getElementByElementId';
import { DOMTokenList } from "../";

export const removeElement = ( virtualElement:VirtualElement ) => {

  // Childrens du virtualElement
  let childrens = (virtualElement.patern.childrens ? virtualElement.patern.childrens.reduce((arr , key) => {
    arr.push( getElementByElementId( key ) )
    return arr;
  } , []) as VirtualElement[] : []);

  let parent = getElementByElementId( virtualElement.parent_key );
  if(parent)parent.children.removeKey( virtualElement.key );

  childrens.forEach(( ve ) => {
    removeElement( ve );
  });

  virtualElement.element.remove();

  DOMTokenList.delete(virtualElement.key);

}