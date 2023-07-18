import { VirtualElement } from "../virtual-element";
import { NodeTemplate , DOMRender } from "../../dom-render";
import { getElementByElementId } from './getElementByElementId';
import { DOMTokenList } from "../";

export const createNodeElement = <T>( template:NodeTemplate<T> , parent?:HTMLElement ):string => {

  let elementUUID = crypto.randomUUID().toString();
  let virtualParent = parent && '_id' in parent ? getElementByElementId(parent['_id'] as string) : null;

  let ref = new VirtualElement({
    parent_key:( parent && parent['_id'] ? parent['_id'] : null),
    key:elementUUID,
    patern : {
      localName:template.localName,
      attr:template.attr,
      proto:template.proto
    }
  })

  ref.element = DOMRender<T | any>( ref.patern as unknown as NodeTemplate<T> , parent ) as HTMLElement;
  ref.element['_id'] = ref.key;

  if(virtualParent)console.warn( { parent_key : virtualParent.key } )

  if(virtualParent)ref.element['parent_id'] = virtualParent.key;
  if(virtualParent)virtualParent.children.addKey(ref.key);

  if( template.childrens && template.childrens.length > 0 )ref.patern.childrens = Array.from( template.childrens , (template) => {
    return createNodeElement( template , ref.element )
  } )

  DOMTokenList.set( ref.key , ref );

  return ref.key;

}