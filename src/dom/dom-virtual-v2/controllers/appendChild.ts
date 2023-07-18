import { VirtualElement } from "../virtual-element";
import { DOMRender } from "../../dom-render";

/** Ajoute un élément virtuel enfant à un élément virtuel parent */
export const appendChild = (parent: VirtualElement, child: VirtualElement) => {

  if('patern' in parent == false)return ;
  else if( 'childrens' in parent.patern == false )parent.patern.childrens = [];

  if(!parent.patern.childrens.includes(child.key)){
    child.element = DOMRender( child.patern as any , parent.element );
    child.element['_id'] = child.key;
    child['parent_key'] = parent.key;
    child.element['parent_id'] = parent.key;
    parent.patern.childrens.push(child.key);
  }

}