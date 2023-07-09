import { DOMRender } from "../dom-render";

export interface VirtualElement{
  /** reference du HTMLElement */
  reference:HTMLElement;
  /** Tag du HTMLElement */
  localName:string;
  /** attributes of the HTMLelement */
  attr:Record<string,string>;
  /** children's of VirtualElement */
  children?:VirtualElement[];
  /** attatched templates to VirtualElement who can be rendered */
  attatched:any[];
  /** attatch a template to the VirtualELement */
  attatch:(template:any)=>VirtualElement;
  /** Render all attatched template */
  render:()=>void;
}

const buildReferences = (element:HTMLElement) => {

  const virtual:VirtualElement = {
    reference : element,
    get localName(){ return element.tagName },
    get attr(){
      return Object.fromEntries(new Map(Array.from(Object.values({...element.attributes}) , (attribute:any) => {
        return [attribute.name , attribute.value];
      })))
    },
    // localName : element.tagName,
    // attr : Object.fromEntries(new Map(Array.from(Object.values({...element.attributes}) , (attribute:any) => {
    //   return [attribute.name , attribute.value];
    // }))),
    get children(){
      return Array.from( element.children as any, ( element:HTMLElement ) => {
        return buildReferences(element);
      })
    },
    attatched : [],
    attatch : (template:any) => {
      if(Array.isArray(template))Array.from(template , (t) => {
        virtual.attatched.push(t);
      })
      else virtual.attatched.push(template);
      return virtual;
    },
    render : () => {
      Array.from(virtual.attatched , (template) => {
        DOMRender<any>(template as any , element);
      })
    }
  }

  return virtual;

}

const recursiveReferenceCloning = (node:HTMLElement , clone:HTMLElement) => {
  // let clone = node.cloneNode() as HTMLElement;
  // if(node.innerText)clone.innerText = node.innerText;
  if(node.children.length > 0)Array.from( node.children as any , (child:HTMLElement) => {
    let cloneELement = clone.appendChild(child.cloneNode()) as HTMLElement;
    recursiveReferenceCloning(child , cloneELement);
  } )
  else if(node.childNodes.length > 0)Array.from( node.childNodes , (child) => {
    if(child.nodeType === child.TEXT_NODE)clone.textContent = child.textContent;
  } )
  return clone;
}

export const htmlDocument = document.implementation.createHTMLDocument()
export const head = recursiveReferenceCloning(document.head , htmlDocument.head);
export const body = recursiveReferenceCloning(document.body , htmlDocument.body);

export const DOMVirtual = { htmlDocument };

export const applyDOMChanges = () => {

  const recursiveEffect = ( source:HTMLElement , virtual:HTMLElement ) => {

    if(!Object.is(source,virtual))
    if(!source.isEqualNode(virtual)){

      source.replaceWith( virtual.cloneNode(true) );

      Array.from( virtual.children as any , (virtualChild:HTMLElement) => {
        let childNode = source.appendChild( virtualChild.cloneNode() ) as HTMLElement;
        recursiveEffect( childNode , virtualChild );
      })

    }



  }

  recursiveEffect(document.body , body);

}