import { NodeTemplate , DOMRender } from "../../dom-render";
import { DOMTokenList} from "../";
import { VirtualElement } from "../virtual-element";

export const createElement = ( tagName:string ) => {

  let elementUUID = crypto.randomUUID();

  let patern = {
    localName:tagName,
    attr:{},
    childrens : [],
    proto:{}
  };

  let ve = new VirtualElement({
    parent_key:(parent && '_id' in parent ? parent['_id'] as string : null),
    key:elementUUID,
    patern : patern
  });

  DOMTokenList.set( elementUUID , ve );

  return DOMTokenList.get( elementUUID );

}