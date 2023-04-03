import { body } from "../dom-virtual";
import { ConnectorTemplate } from "../../connector";

export interface NodeTemplate extends ConnectorTemplate{
  /** local name of the component */
  localName:string;
  /** extends from existing component */
  extends?:string;
  attr?:Record<string,string>;
  childrens?:NodeTemplate[];
  proto?:Record<string,any>;
}

/** Allow to generate element with a template */
export const DOMRender = (template:NodeTemplate) => {

  let isLocal = (template && template.localName && template.localName.includes('local-') ? true : false);

  console.log(template)
  
  const element = (() => {
    if(!isLocal)return document.createElement( template.localName );
    else {
      let tag = template.localName.split('local-').filter((x) => x).join('');
      return document.createElement( tag , { is : template.localName } );
    }
  })()

  if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
      if(attributeName == 'text')element.innerText = template.attr[attributeName];
      else element.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
  })

  if(template.childrens)Array.from( template.childrens , (childTemplate) => {
      element.appendChild(DOMRender(childTemplate));
  })

  if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
      element[protoKey] = (template.proto as Record<string,any>)[protoKey];
  })

  return element;

}