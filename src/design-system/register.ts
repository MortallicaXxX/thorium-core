import * as htmlTags from 'html-tags';
import { ConnectorTemplate } from '../'

import { DOMRender , NodeTemplate } from "../dom/dom-render";
import { Observer , Observers , Mutation, PageController , ThoriumController , ViewController , ViewDesignPatern } from '../controller';
import { Transactions , TransactionPatern } from '../controller/transactions';
import { Effects , EffectPatern } from '../controller/effects';

export interface DesignPatern<T> extends ConnectorTemplate<T>{
  /**  */
  baseName:string;
  observedAttibutes?:string[];
  attr?:Record<string,string>;
  childrens?:NodeTemplate<any>[];
  content?:string;
  proto?:T;
  styles?:string[];
  __getter__?:Record<string,(target?:T) => void>;
  __setter__?:Record<string,(value:any,target?:T) => void>;
}

// export type CustomElement<T> = T;
export type CustomElement<T,X> = T & X & {
    context<Y>(contextName?:string):CustomElement<Y,Element>;
    onmutation(mutation:Mutation):void;
    beforeMounting(target:CustomElement<T,X>):void;
    afterMounting(target:CustomElement<T,X>):void;
    onunmount():void;
    oncontextchange():void;
    useTransaction():void;
    addTransaction():void;
    removeTransaction():void;
    useEffect():void;
    addEffect():void;
    removeEffect():void;
    oberservers:Observers;
    getObserver(observerId:string):Observer;
    removeObserver(observerId:string):void;
    delegateObservedMutation(mutation:Mutation):void;
    addComponentObserver(sourceElement:CustomElement<Element,{}> | Element , event:string , callback:(mutation:Mutation)=>void):Observer;
    on( attributeName:string , callback:(mutation:Mutation)=>void , sourceElement?:CustomElement<Element,{}> | Element ):Observer;
};

export interface CustomElementPatern<T> extends CustomElementConstructor{
    transactions:TransactionPatern;
    transactions_onload:TransactionPatern;
    effects:EffectPatern;
    connector:() => (connectorTemplate?:ConnectorTemplate<T>) => {
        localName: string;
        attr: Record<string, string>;
        childrens: NodeTemplate<any>[];
        proto:T;
    };
}

export const register = <T>( type : 'page' | 'thorium' | 'local' | 'views' , patern:DesignPatern<T>|ViewDesignPatern<T>):CustomElementPatern<T> => {

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
                    shadow.appendChild(DOMRender<HTMLElement>(children))
                } )
            }

            if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
                this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
            })

        }

      } as CustomElementPatern<T> , { extends : patern.baseName });

      return customElements.get(`${type}-${patern.baseName}`) as CustomElementPatern<T>;

    }
    else{

    if(type == 'page' && !customElements.get(paternName))customElements.define(paternName , PageController<T>(paternName,patern as ViewDesignPatern<T>,HTMLElement))
    if(type == 'views' && !customElements.get(paternName))customElements.define(paternName , ViewController<T>(paternName,patern as ViewDesignPatern<T>,HTMLElement))
    else if(type == 'thorium' && !customElements.get(paternName))customElements.define(paternName, ThoriumController<T>(paternName , patern , HTMLElement) )

    return customElements.get(paternName) as CustomElementPatern<T>;

  }
  
}