import * as htmlTags from 'html-tags';
import { ConnectorTemplate } from '../'

import { DOMRender , NodeTemplate } from "../dom/dom-render";
import { ThoriumController , ViewController , ViewDesignPatern } from '../controller';
import { Transactions , TransactionPatern } from '../controller/transactions';
import { Effects , EffectPatern } from '../controller/effects';

export interface DesignPatern extends ConnectorTemplate{
  /**  */
  baseName:string;
  attr?:Record<string,string>;
  childrens?:NodeTemplate[];
  content?:string;
  proto?:Record<string,any>;
  styles?:string[];
  __getter__?:Record<string,() => void>;
  __setter__?:Record<string,(value:any) => void>;
}

export interface CustomElementPatern extends CustomElementConstructor{
    transactions:TransactionPatern;
    transactions_onload:TransactionPatern;
    effects:EffectPatern;
    connector:() => (connectorTemplate?:ConnectorTemplate) => {
        localName: string;
        attr: Record<string, string>;
        childrens: NodeTemplate[];
        proto: Record<string, any>;
    };
}

export const register = ( type : 'page' | 'thorium' | 'local' | 'views' , patern:DesignPatern|ViewDesignPatern):CustomElementPatern => {

    let paternName = `${type}-${patern.baseName}`;
    
    const isUnknownElement = ():boolean => {
        // console.log(htmlTags , template.localName);
        return !(htmlTags as string[]).includes(patern.baseName);
    }

    if(!isUnknownElement() && type == 'local'){

      const constructor = (document.createElement(patern.baseName) as any).__proto__.constructor.name as string;

      if(!customElements.get(paternName))customElements.define(paternName, class extends ThoriumController(paternName,patern,window[constructor]){

        static transactions = Transactions();

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

      } as CustomElementPatern , { extends : patern.baseName });

      return customElements.get(`${type}-${patern.baseName}`) as CustomElementPatern;

    }
    else{

    if(type == 'views' && !customElements.get(paternName))customElements.define(paternName , ViewController(paternName,patern as ViewDesignPatern,HTMLElement))
    else if(type == 'thorium' && !customElements.get(paternName))customElements.define(paternName, ThoriumController(paternName , patern , HTMLElement) )

    return customElements.get(paternName) as CustomElementPatern;

  }
  
}