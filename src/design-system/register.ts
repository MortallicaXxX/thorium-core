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
    
  const isUnknownElement = ():boolean => {
      // console.log(htmlTags , template.localName);
      return !(htmlTags as string[]).includes(patern.baseName);
  }

  if(!isUnknownElement() && type == 'local'){

      const constructor = (document.createElement(patern.baseName) as any).__proto__.constructor.name as string;

      if(!customElements.get(`${type}-${patern.baseName}`))customElements.define(`${type}-${patern.baseName}`, class extends ThoriumController(window[constructor]){

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

    if(type == 'views'){
        if(!customElements.get(`${type}-${patern.baseName}`))customElements.define(`${type}-${patern.baseName}`, class extends ViewController(HTMLElement){

            static transactions = Transactions();
            static effects = Effects();
            static connector = () => {
                return (connectorTemplate?:ConnectorTemplate) => {
                    return {
                        localName : `${type}-${patern.baseName}`,
                        attr : (connectorTemplate && connectorTemplate.attr ? connectorTemplate.attr : {}),
                        childrens : (connectorTemplate && connectorTemplate.childrens ? connectorTemplate.childrens : []),
                        proto : (connectorTemplate && connectorTemplate.proto ? connectorTemplate.proto : {})
                    };
                }
            }

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

                let c = (customElements.get(`${type}-${patern.baseName}`) as CustomElementPatern);
                let {transactions , transactions_onload} = c.transactions;
                let { effects } = c.effects;
                
                this.$Thorium = {
                    transactions , 
                    transactions_onload ,
                    effects
                };
    
            }
    
        } as any );
    }
    else if(type == 'thorium'){
        if(!customElements.get(`${type}-${patern.baseName}`))customElements.define(`${type}-${patern.baseName}`, class extends ThoriumController(HTMLElement){

            static transactions = Transactions();
            static effects = Effects();
            static connector = () => {
                return (connectorTemplate?:ConnectorTemplate) => {
                    return {
                        localName : `${type}-${patern.baseName}`,
                        attr : (connectorTemplate && connectorTemplate.attr ? connectorTemplate.attr : {}),
                        childrens : (connectorTemplate && connectorTemplate.childrens ? connectorTemplate.childrens : []),
                        proto : (connectorTemplate && connectorTemplate.proto ? connectorTemplate.proto : {})
                    };
                }
            }

            constructor(){
    
                super(patern);
    
                if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
                    this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
                })
    
                if(patern.childrens){
                    const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
                    Array.from( patern.childrens , (children) => {
                        let e = DOMRender(children);
                        e['root'] = this;
                        shadow.appendChild(e)
                    } )
                }
    
                if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
                    this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
                })

                if(patern.__getter__)Array.from( Object.keys(patern.__getter__) , (key) => {
                    Object.defineProperty( this , key , {
                        get : patern.__getter__[key],
                        ...(patern.__setter__[key] ? { set : patern.__setter__[key] } : {})
                    } )
                } )

                if(patern.__setter__)Array.from( Object.keys(patern.__setter__) , (key) => {
                    if(!this[key])Object.defineProperty( this , key , {
                        set : patern.__setter__[key]
                    } )
                } )

                let c = (customElements.get(`${type}-${patern.baseName}`) as CustomElementPatern);
                let {transactions , transactions_onload} = c.transactions;
                let { effects } = c.effects;
                
                this.$Thorium = {
                    transactions , 
                    transactions_onload ,
                    effects
                };
    
            }
    
        } as any );
    }

    return customElements.get(`${type}-${patern.baseName}`) as CustomElementPatern;

  }
  
}