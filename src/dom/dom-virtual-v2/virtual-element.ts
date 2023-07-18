import { CssObject, CustomElement } from "../../design-system";
import { ConnectorTemplate } from "../../connector";
import { NodeTemplate , DOMRender } from "../dom-render";

import { 
  getTagName,
  removeElement,
  createNodeElement,
  appendChild,
  setInnerHTML,
  cloneElement,
  getParentNode,
  getChildNodes,
  getPreviousSibling,
  getNextSibling,
  setProperty,
  getElementByElementId,
  addEventListener,
  createDocumentFragment
} from './controllers';

export interface ITemplateReference{
  localName:string;
  attr:ConnectorTemplate<any>['attr'];
  proto:ConnectorTemplate<any>['proto'];
  childrens?:string[];
  ref?:CustomElement<Element,{}> | HTMLElement
}

export interface IVirtualElement{
  parent_key?:string;
  key:string;
  element?:CustomElement<HTMLElement,{}> | HTMLElement;
  patern:ITemplateReference;
}

export class VirtualElement implements IVirtualElement{

  parent_key = null;
  key = null;
  element:HTMLElement | CustomElement<HTMLElement,any> = null;
  patern:ITemplateReference = {
    localName : null,
    attr : null,
    proto : null,
    childrens : []
  }

  constructor(initOptions:IVirtualElement){

    if(initOptions.parent_key)this.parent_key = initOptions.parent_key;
    if(initOptions.key)this.key = initOptions.key;
    if(initOptions.element)this.element = initOptions.element;
    if(initOptions.patern)this.patern = initOptions.patern;

  }
  /** Renvoie l'élément virtuel parent de l'élément virtuel */
  get parentNode(){ return getParentNode(this); }
  /** Renvoie la liste des éléments virtuels enfants de l'élément virtuel */
  get childNodes(){ return getChildNodes(this) }
  /** Renvoie l'élément virtuel suivant (le frère suivant) de l'élément virtuel */
  get nextSibling(){ return getNextSibling(this) }
  /** Renvoie l'élément virtuel précédent (le frère précédent) de l'élément virtuel */
  get previousSibling(){ return getPreviousSibling(this) }
  /** Renvoie le nom de balise de l'élément virtuel */
  get tagName(){ return getTagName(this) }

  get childrens(){ return this.patern.childrens ? Array.from( this.patern.childrens , (key) => {
    return getElementByElementId( key );
  } ).filter(x => x) : []}

  get children():Record<string,VirtualElement> & { addKey(key:string):string , removeKey(key:string):void }{

    const virtualElement = this;

    let childrens = this.childrens;
    let childrensMap = new Map( childrens.reduce((arr , ve) => {
      if(ve.patern.attr && 'name' in ve.patern.attr)arr.push([ ve.patern.attr.name , ve ]);
      return arr;
    } , []) );
    let childrensByName = Object.fromEntries( childrensMap );

    return {
      ...childrensByName,
      /** ajout d'une clée enfant */
      addKey(key:string){
        if('childrens' in virtualElement.patern == false)virtualElement.patern.childrens = [];
        if(!virtualElement.patern.childrens.includes(key))virtualElement.patern.childrens.push(key);
        else return null;
      },
      /** suppression d'une clée enfant */
      removeKey(key:string){
        let keyId = virtualElement.patern.childrens.findIndex((k) => k == key);
        console.log(virtualElement.patern.childrens , keyId);
        delete virtualElement.patern.childrens[keyId];
        virtualElement.patern.childrens = virtualElement.patern.childrens.filter((x => x));
      }
    }

  }

  addEventListener = ( eventName , callback ) => {
    return addEventListener( this , eventName , callback );
  }

  render = () => {

    let _fragment = createDocumentFragment( this.key ) as NodeTemplate<any>;
    let parent = getElementByElementId( this.parent_key );

    if((this.element as HTMLElement).children.length > 0){
      removeElement( this );
      createNodeElement( _fragment , parent.element );
    }
    else {
      let e = DOMRender( _fragment , parent.element );
      (this.element as HTMLElement).replaceWith( e );
      this.element = e;
      e['_id'] = this.key;
    }

  }

  appendChild = ( child:VirtualElement ) => { return appendChild( this , child ); }

  remove = () => {
    return removeElement( this );
  }

  setAttribute = (attributeName:string , attributeValue:any) => {
    this.patern.attr[attributeName] = attributeValue;
    // this.render();
  }

  getAttribute = ( attributeName?:string ):string | ( Record<string,string> | CssObject ) => {
    return ( attributeName ? this.patern.attr[attributeName] : this.patern.attr );
  }
  
  getElementByElementId = getElementByElementId;
  setProperty = (propertyName:string , value:any) => { 
    return setProperty( this , propertyName , value ) 
  };
  set innerHTML( value:string ){
    setInnerHTML( this , value );
  }
  clone(){ 
    return cloneElement(this); 
  }

}