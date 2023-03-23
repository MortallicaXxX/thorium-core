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
      return Array.from( element.children , ( element:HTMLElement ) => {
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
        element.appendChild( DOMRender(template as any) );
      })
    }
  }

  return virtual;

}

export const DOMVirtual = {
  html : {
    head : buildReferences(document.head),
    body : buildReferences(document.body)
  },
  get head():VirtualElement{return this.html.head},
  get body():VirtualElement{return this.html.body},
  // html : {
    // head : (new DocumentFragment()).append(document.head),
    // body : (new DocumentFragment()).append(document.body),
  // }
}