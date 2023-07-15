import { NodeTemplate , DOMRender } from "../dom-render";
import { DOMTokenList , IVirtualElement , ITemplateReference , getElementByElementId , fragment} from ".";
import { CssObject, CustomElement } from "../../design-system";
import { htmlToNodeTemplate } from './html-transform';

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


  render = () => {

    let _fragment = fragment( this.key ) as NodeTemplate<any>;
    let parent = getElementByElementId( this.parent_key );

    if((this.element as HTMLElement).children.length > 0){
      removeElement( this );
      createElementFromTemplate( _fragment , parent.element );
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

export const createElementFromTemplate = <T>( template:NodeTemplate<T> , parent?:HTMLElement ):string => {

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
    return createElementFromTemplate( template , ref.element )
  } )

  DOMTokenList.set( ref.key , ref );

  return ref.key;

}

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

/** Crée un nouveau nœud de texte virtuel avec le contenu spécifié */
export const createTextNode = (text: string) => {
  let ve = createElement( 'p' );
  ve.setProperty( 'textContent' , text );
  return ve;
}

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

/**  Supprime un élément virtuel enfant d'un élément virtuel parent */
export const removeChild = (parent: VirtualElement, child: VirtualElement) => {

}

/** Remplace un élément virtuel enfant par un autre élément virtuel au sein d'un élément virtuel parent */
export const replaceChild = (parent: VirtualElement, newChild: VirtualElement, oldChild: VirtualElement) => {

}

/** Insère un élément virtuel avant un élément virtuel de référence au sein d'un élément virtuel parent */
export const insertBefore = (parent: VirtualElement, newChild: VirtualElement, refChild: VirtualElement) => {
  
}

/** Définit la valeur d'un attribut pour un élément virtuel spécifié */
export const setAttribute = (ve: VirtualElement, attributeName: string, value: any) => {

}

/** Supprime un attribut spécifié d'un élément virtuel */
export const removeAttribute = (ve: VirtualElement, attributeName: string) => {

}

/** Ajoute un écouteur d'événement à un élément virtuel */
export const addEventListener = (ve: VirtualElement, event: string, handler: Function) => {

}

/** Supprime un écouteur d'événement d'un élément virtuel */
export const removeEventListener = (ve: VirtualElement, event: string, handler: Function) => {

}

/** Crée un fragment de document virtuel, qui peut être utilisé comme un conteneur temporaire pour d'autres éléments virtuels avant de les ajouter au DOM */
export const createDocumentFragment = () => {

}

/** Crée une copie d'un élément virtuel existant. */
export const cloneElement = (ve: VirtualElement) => {
  return createElement( ve.patern.localName );
}

/** Recherche et renvoie le premier élément virtuel correspondant au sélecteur CSS spécifié */
export const querySelector = (selector: string) => {

}

/** Recherche et renvoie tous les éléments virtuels correspondant au sélecteur CSS spécifié */
export const querySelectorAll = (selector: string) => {

}

/** Définit le contenu HTML d'un élément virtuel */
export const setInnerHTML = (ve: VirtualElement, html: string) => {

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, "text/html");
  let content = parsedDocument.body.children[0] as HTMLElement;

  // netoyage des enfants
  ve.childrens.forEach( (childVeElement) => {
    removeElement( childVeElement );
  });

  if(content){
    let _nodeTemplate = htmlToNodeTemplate(content);
    createElementFromTemplate( _nodeTemplate , ve.element );
  }
  else ve.element.innerHTML = html;

}

/** Récupère le contenu HTML d'un élément virtuel */
export const getInnerHTML = (ve: VirtualElement) => {

}

/** Définit les styles CSS pour un élément virtuel */
export const setStyle = (ve: VirtualElement, style: CssObject) => {

}

/** Récupère la liste des classes CSS d'un élément virtuel */
export const getClassList = (ve: VirtualElement) => {

}

export const setProperty = ( ve: VirtualElement , propertyName:string , value : any ) => {
  ve.patern.proto[propertyName] = value;
  if(ve.element)ve.element[propertyName] = value;
}

export const removeProperty = () => {

}

/// ===== GETTER ======
/** Renvoie l'élément virtuel parent d'un élément virtuel donné */
export const getParentNode = ( ve:VirtualElement ) => {
  return ve.element.parentNode;
}

/** Renvoie la liste des éléments virtuels enfants d'un élément virtuel donné */
export const getChildNodes = ( ve:VirtualElement ) => {

  if( 'patern' in ve == false )return [];
  else if('childrens' in ve.patern == false)return [];
  else return Array.from( ve.patern.childrens , (key) => {
    return DOMTokenList.get( key );
  } )

}

/** Renvoie l'élément virtuel suivant (le frère suivant) d'un élément virtuel donné */
export const getNextSibling = ( ve: VirtualElement ) => {

}

/** Renvoie l'élément virtuel précédent (le frère précédent) d'un élément virtuel donné */
export const getPreviousSibling = ( ve: VirtualElement ) => {

}

/** Renvoie le nom de balise de l'élément virtuel */
export const getTagName = ( ve: VirtualElement ) => {
  return ve.element.tagName;
}

// export const deleteElement = ( refElement:CustomElement<HTMLElement,{}> ) => {

//   if(refElement['_id'] && DOMTokenList.has(refElement['_id'])){

//     let virtualElement = DOMTokenList.get(refElement['_id']);
//     if('childrens' in virtualElement.patern)virtualElement.patern.childrens.forEach( (key) => {
//       let virtualElement = getElementByElementId(key);
//       let virtualParentElement = getElementByElementId(virtualElement.parent_key);

//       deleteElement( virtualElement.element );
//       // Update parent keys
//       if(virtualParentElement && 'childrens' in virtualParentElement.patern)virtualParentElement.patern.childrens = virtualParentElement.patern.childrens.reduce((arr , key) => {
//         if(key != virtualElement.key)arr.push(key);
//         return arr;
//       } , []);

//     })
//     DOMTokenList.delete(refElement['_id']);

//   }
//   refElement.remove();

// }

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