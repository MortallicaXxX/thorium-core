import { NodeTemplate , DOMRender } from "../dom-render";
import { DOMTokenList , IELementReference , ITemplateReference , getElementByElementId , fragment} from ".";
import { CssObject, CustomElement } from "../../design-system";

export class VirtualElement implements IELementReference{

  parent_key = null;
  key = null;
  element:HTMLElement | CustomElement<HTMLElement,any> = null;
  patern:ITemplateReference = {
    localName : null,
    attr : null,
    proto : null,
    childrens : []
  }

  constructor(initOptions:IELementReference){

    if(initOptions.parent_key)this.parent_key = initOptions.parent_key;
    if(initOptions.key)this.key = initOptions.key;
    if(initOptions.element)this.element = initOptions.element;
    if(initOptions.patern)this.patern = initOptions.patern;

  }

  render = () => {

    let _fragment = fragment( this.key ) as NodeTemplate<any>;
    let parent = getElementByElementId( this.parent_key );

    if((this.element as HTMLElement).children.length > 0){
      deleteElement( this.element );
      createElement( _fragment , parent.element );
    }
    else {
      let e = DOMRender( _fragment , parent.element );
      (this.element as HTMLElement).replaceWith( e );
      this.element = e;
      e['_id'] = this.key;
    }

  }

  setAttribute = (attributeName:string , attributeValue:any) => {
    this.patern.attr[attributeName] = attributeValue;
    this.render();
  }

  getAttribute = ( attributeName?:string ):string | ( Record<string,string> | CssObject ) => {
    return ( attributeName ? this.patern.attr[attributeName] : this.patern.attr );
  }
  
  getElementByElementId = getElementByElementId;

  get parentNode(){ return this.element.parentNode; }

}

export const createElement = <T>( template:NodeTemplate<T> , parent?:HTMLElement ) => {

  let elementUUID = crypto.randomUUID();

  let ref = new VirtualElement({
    parent_key:(parent && '_id' in parent ? parent['_id'] as string : null),
    key:elementUUID,
    patern : {
      localName:template.localName,
      attr:template.attr,
      proto:template.proto
    }
  })

  ref.element = DOMRender<T>( ref.patern as unknown as NodeTemplate<T> , parent ) as HTMLElement;
  ref.element['_id'] = elementUUID;
  if(parent && '_id' in parent)ref.element['parent_id'] = parent['_id'];

  if( template.childrens && template.childrens.length > 0 )ref.patern.childrens = Array.from( template.childrens , (template) => {
    return createElement( template , ref.element )
  } )

  DOMTokenList.set( elementUUID , ref )

  return elementUUID.toString();

}

export const deleteElement = ( refElement:CustomElement<HTMLElement,{}> ) => {

  if(refElement['_id'] && DOMTokenList.has(refElement['_id'])){

    let virtualElement = DOMTokenList.get(refElement['_id']);
    if('childrens' in virtualElement.patern)virtualElement.patern.childrens.forEach( (key) => {
      let virtualElement = getElementByElementId(key);
      let virtualParentElement = getElementByElementId(virtualElement.parent_key);

      deleteElement( virtualElement.element );
      // Update parent keys
      if(virtualParentElement && 'childrens' in virtualParentElement.patern)virtualParentElement.patern.childrens = virtualParentElement.patern.childrens.reduce((arr , key) => {
        if(key != virtualElement.key)arr.push(key);
        return arr;
      } , []);

    })
    DOMTokenList.delete(refElement['_id']);

  }
  refElement.remove();

}

document.createElement