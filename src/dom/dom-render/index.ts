import { body } from "../dom-virtual";
import { ConnectorTemplate } from "../../connector";
import { CustomElement } from "../../design-system";

export interface NodeTemplate<T> extends ConnectorTemplate<T>{
  /** local name of the component */
  localName:string;
  /** extends from existing component */
  extends?:string;
  attr?:Record<string,string>;
  childrens?:NodeTemplate<any>[];
  proto?:T;
}

/** Allow to generate element with a template */
export const DOMRender = <T>(template:NodeTemplate<T>):T => {

  let isLocal = (template && template.localName && template.localName.includes('local-') ? true : false);

  console.log(template)
  
  const element = (() => {
    if(!isLocal)return document.createElement( template.localName );
    else {
      let tag = template.localName.split('local-').filter((x) => x).join('');
      return document.createElement( tag , { is : template.localName } );
    }
  })()

  if(template.childrens)Array.from( template.childrens , (childTemplate) => {
      let e = DOMRender<HTMLElement>(childTemplate);

      // Design patern
      if('connectedCallback' in e)element.appendChild(e);
      // Not Design patern
      else {
        (childTemplate.proto && childTemplate.proto.beforeMounting ? childTemplate.proto.beforeMounting(e) : null);
        element.appendChild(e);
        (childTemplate.proto && childTemplate.proto.afterMounting ? childTemplate.proto.afterMounting(e) : null);
      }
  })

  if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
      element[protoKey] = (template.proto as Record<string,any>)[protoKey];
  })

  if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
    if(attributeName == 'text')element.innerText = template.attr[attributeName];
    else element.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
})

  return element as CustomElement<T,any>;

}