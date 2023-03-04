import * as htmlTags from 'html-tags';
import { ConnectorTemplate } from '../'

import { BuildNode , NodeTemplate } from "../node-builder";
import { Controller } from '../controller';

export interface DesignPatern extends ConnectorTemplate{
  /**  */
  baseName:string;
  attr?:Record<string,string>;
  childrens?:NodeTemplate[];
  content?:string;
  proto?:Record<string,any>;
  styles?:string[];
  __getter__?:any[];
  __setter__?:any[];
}

export const register = ( type : 'page' | 'thorium' , patern:DesignPatern) => {
    
  const isUnknownElement = ():boolean => {
      // console.log(htmlTags , template.localName);
      return !(htmlTags as string[]).includes(patern.baseName);
  }

  if(!isUnknownElement()){

      const constructor = (document.createElement(patern.baseName) as any).__proto__.constructor.name as string;

      if(!customElements.get(`${patern.baseName}`))customElements.define(`${patern.baseName}`, class extends window[constructor]{

          constructor(options){
              super();

              console.log('options : ',options);

              if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
                  (this as unknown as HTMLElement).setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
              })
  
              if(patern.childrens){
                  const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
                  Array.from( patern.childrens , (childTemplate) => {
                      shadow.appendChild(BuildNode(childTemplate));
                  })
              }
  
              if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
                  (this as unknown as HTMLElement)[protoKey] = (patern.proto as Record<string,any>)[protoKey];
              })

          }
      } as any , { extends : patern.baseName });
      return customElements.get(`${patern.baseName}`);

  }
  else{

      if(!customElements.get(`${type}-${patern.baseName}`))customElements.define(`${type}-${patern.baseName}`, class extends Controller{

          constructor(){
              super();

              if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
                  this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
              })
  
              if(patern.childrens){
                  const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
                  Array.from( patern.childrens , (children) => {
                      shadow.appendChild(BuildNode(children))
                  } )
              }
  
              if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
                  this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
              })
  
          }

          connectedCallback(){
              let slot = this.querySelectorAll('slot')[0];
              if(patern.childrens && slot)Array.from( patern.childrens , (children) => {
                  slot.appendChild(BuildNode(children))
              } )
          }

      } );
      return customElements.get(`${type}-${patern.baseName}`)

  }
  
}