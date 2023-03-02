import { ConnectorTemplate } from "../connector";

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
export const BuildNode = (template:NodeTemplate) => {

  const element = document.createElement(template.localName);

  if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
      if(attributeName == 'text')element.innerText = template.attr[attributeName];
      else element.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
  })

  if(template.childrens)Array.from( template.childrens , (childTemplate) => {
      element.appendChild(BuildNode(childTemplate));
  })

  if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
      element[protoKey] = (template.proto as Record<string,any>)[protoKey];
  })

  return element;

}