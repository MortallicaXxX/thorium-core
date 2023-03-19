import * as htmlTags from 'html-tags';
import { ConnectorTemplate } from '../'

import { DOMRender , NodeTemplate } from "../dom/dom-render";
import { ThoriumController , ViewController , ViewDesignPatern } from '../controller';

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

export const register = ( type : 'page' | 'thorium' | 'local' | 'views' , patern:DesignPatern|ViewDesignPatern) => {
    
  const isUnknownElement = ():boolean => {
      // console.log(htmlTags , template.localName);
      return !(htmlTags as string[]).includes(patern.baseName);
  }

  if(!isUnknownElement() && type == 'local'){

      const constructor = (document.createElement(patern.baseName) as any).__proto__.constructor.name as string;

      if(!customElements.get(`${type}-${patern.baseName}`))customElements.define(`${type}-${patern.baseName}`, class extends ThoriumController(window[constructor]){

        constructor(){
            super();

            if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
                (this as unknown as HTMLElement).setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
            })

            if(patern.childrens){
                const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
                Array.from( patern.childrens , (children) => {
                    shadow.appendChild(DOMRender(children))
                } )
            }

            if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
                this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
            })

        }

        
      } as CustomElementConstructor , { extends : patern.baseName });
      return customElements.get(`${type}-${patern.baseName}`);

  }
  else{

    if(type == 'views'){
        if(!customElements.get(`${type}-${patern.baseName}`))customElements.define(`${type}-${patern.baseName}`, class extends ViewController(HTMLElement){

            constructor(){
    
                super(patern);
    
                if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
                    this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
                })
    
                if(patern.childrens){
                    const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
                    Array.from( patern.childrens , (children) => {
                        shadow.appendChild(DOMRender(children))
                    } )
                }
    
                if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
                    this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
                })
    
            }
    
        } as any );
    }
    else if(type == 'thorium'){
        if(!customElements.get(`${type}-${patern.baseName}`))customElements.define(`${type}-${patern.baseName}`, class extends ThoriumController(HTMLElement){

            constructor(){
    
                super(patern);
    
                if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
                    this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
                })
    
                if(patern.childrens){
                    const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
                    Array.from( patern.childrens , (children) => {
                        shadow.appendChild(DOMRender(children))
                    } )
                }
    
                if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
                    this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
                })
    
            }
    
        } as any );
    }

    return customElements.get(`${type}-${patern.baseName}`)

  }
  
}