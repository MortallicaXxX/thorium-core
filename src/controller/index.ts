import { PageController } from "./page-controller";
import { ThoriumController } from "./thorium-controller";
import { ViewController , ViewDesignPatern } from "./view-controller";
import { DesignPatern , CustomElementPatern, CustomElement } from "../design-system";
import { DOM, NodeTemplate } from "../dom";
import { Transactions , ITransaction } from "./transactions";
import { Effects } from "./effects";
import { ConnectorTemplate } from "../connector";
import { PaternArea } from "./area";


export {
  PageController,
  ThoriumController,
  ViewController,
  ViewDesignPatern,
  PaternArea
}

export const Controller = <T>(paternName:string,patern:DesignPatern<T>,sourceClass) => {

  return class Controller extends sourceClass{

    static transactions = Transactions();
    static effects = Effects();
    static connector = () => {
        return (connectorTemplate?:ConnectorTemplate<T>):NodeTemplate<T> => {
            return {
                localName : paternName,
                attr : (connectorTemplate && connectorTemplate.attr ? connectorTemplate.attr : {}),
                childrens : (connectorTemplate && connectorTemplate.childrens ? connectorTemplate.childrens : []),
                proto : (connectorTemplate && connectorTemplate.proto ? connectorTemplate.proto : {}) as T
            };
        }
    }

    static get observedAttributes() {
      return [ ...( patern.observedAttibutes ? patern.observedAttibutes : [] ) , 'context'];
    }

    patern:DesignPatern<T>;
    isMounted:boolean = false;

    constructor(){
        super();
        this.patern = patern;

        if(patern.childrens){
          const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
          Array.from( patern.childrens , (children) => {
              shadow.appendChild(DOM.render<HTMLElement>(children) )
          } )
        }

        if(patern.__getter__ && Object.keys(patern.__getter__).length > 0){
          Array.from( Object.keys( patern.__getter__ ) , (key) => {
            let element = this;
  
            this.__defineGetter__( key , () => {
              return patern.__getter__[key](element as any)
            } )
          } )
        }
  
        if(patern.__setter__ && Object.keys(patern.__setter__).length > 0){
          Array.from( Object.keys( patern.__setter__ ) , (key) => {
            let element = this;
  
            this.__defineSetter__( key , (value) => {
              return patern.__setter__[key](value , element as any)
            } )
          } )
        }

        if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
          this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
        })

        let c = (customElements.get(paternName) as CustomElementPatern<T>);
        let {transactions , transactions_onload} = c.transactions;
        let { effects } = c.effects;
                
        this.$Thorium = {
            transactions , 
            transactions_onload ,
            effects
        };

        if(this.beforeMounting)this.beforeMounting();
    }
    
    /**
     * ## Context
     * ### Return the context of the element.
     * @Description La méthode context retourne le premier élément parent ayant une classe "context" et, si un nom de contexte est fourni en argument, ayant un attribut "name" correspondant à ce nom. La fonction utilise une fonction interne récursive pour chercher l'élément parent.
     * @param contextNameToFind 
     * @returns 
    */
    context(contextNameToFind?:string){
  
      const findUpperElementContext = (node:Controller) => {
  
        // if the parentNode is body, return element
        if(node.parentNode == document.body)return node;
  
        // if the node is a context
        if(node.attributes['context']){
          // if we search te context by is name, we make a comparaison between node.name and contextNameToFind
          if(contextNameToFind){
            // if the name matching, return the element
            if(node.attributes['context'].value == contextNameToFind)return node;
            // if not, try to search on upper levels
            else return findUpperElementContext(node.parentNode as Controller);
          }
          // if the context is find and the node is different that the one serached for is context, return of the node.
          else if(node != this){ return node }
          // if not, try to search on upper levels
          else return findUpperElementContext(node.parentNode as Controller)
  
        }
        else return findUpperElementContext(node.parentNode as Controller);
  
      }
  
      return findUpperElementContext(this)
  
    }

    connectedCallback(){

      let {transactions , transactions_onload} = this.$Thorium;

      Array.from([...transactions_onload.values()] , (transaction) => {
        let template = transaction.template;

        if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
            if(attributeName == 'class')this.classList.add(template.attr[attributeName]);
            else if(attributeName == 'text') this.innerText = template.attr[attributeName];
            else this.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
        })

        if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
            this[protoKey] = (template.proto as Record<string,any>)[protoKey];
        })
      })

      if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
        this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
      })

      if(this.afterMounting && !this.isMounted)this.afterMounting(this);
      if(!this.isMounted)this.isMounted = true;

    }

    disconnectedCallback(){
      if(this.onunmount)this.onunmount();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      let mutation = {attributeName:name,oldValue,newValue};
      if(this.onmutation)this.onmutation(mutation);
      if(this.oncontextchange)this.oncontextchange(newValue);
      this.delegateObservedMutation(mutation)
    }

    useTransaction = (transactionName:string) => {
      let thorium_controller = this.$Thorium;
      Array.from([...thorium_controller.transactions.values()] , (transaction) => {
        if(transaction.name == transactionName){

          let template = transaction.template;

          if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
            this.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
          })

          if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
              this[protoKey] = (template.proto as Record<string,any>)[protoKey];
          })


        }
      })
    }

    addTransaction = (transaction) => {
      let transactionId = crypto.randomUUID();
      this.$Thorium.transactions.set(transactionId , { id : transactionId , ...transaction});
      return transactionId;
    }

    removeTransaction = (transactionId:string) => {
      return ( this.$Thorium.transactions.has(transactionId) ? this.$Thorium.transactions.delete(transactionId) : null );
    }

    useEffect = (operationName:string,...options) => {
      let thorium_controller = this.$Thorium;
      Array.from([...thorium_controller.effects.values()] , (effect) => {
        if(effect.name == operationName)effect.callback(this,options)
      })
    }

    addEffect = (effect) => {
      let effectId = crypto.randomUUID();
      this.$Thorium.effects.set(effectId , { id : effectId , ...effect});
      return effectId;
    }

    removeEffect = (effectId:string) => {
      return ( this.$Thorium.effects.has(effectId) ? this.$Thorium.effects.delete(effectId) : null );
    }

    oberservers:Observers = new Map();
    getObserver = (observerId:string) => {

      return Array.from( this.oberservers.values() , (stack) => {
        return Array.from( stack.values() , (observerInfo) => {
          if(observerInfo._id == observerId)return observerInfo;
        } )
      } ).flat().filter((x) => x)[0];

    }
    removeObserver = (observerId:string) => {
      console.warn('remove observer' , this.oberservers.values())

      return Array.from( this.oberservers.values() , (stack) => {
        return (stack.has(observerId) ? stack.delete(observerId) : null)
      } ).flat().filter((x) => x)[0];

    }
    delegateObservedMutation = (mutation:Mutation) => {

      let {attributeName,oldValue,newValue} = mutation;
      let stack = ( this.oberservers.has(attributeName) ? this.oberservers.get(attributeName) : null );

      if(stack)Array.from( stack.values() , (observer) => {
        if(observer.sourceElement && document.body.contains(observer.sourceElement))observer.callback(mutation);
        else if(!observer.sourceElement)observer.callback(mutation);
        else stack.delete(observer._id);
      } )

    }

    /** Observer les modification d'attributs d'un components tiers */
    addComponentObserver = (sourceElement:CustomElement<Element,{}> | Element , event:string , callback:(mutation:Mutation)=>void):Observer => {

      let patern = ( 'patern' in sourceElement ? sourceElement.patern : null) as NodeTemplate<any> | DesignPatern<any>;
      console.warn('sourceElement : ',sourceElement);
      console.warn('patern : ',patern);

      if(patern){
        let observedAttibutes = ( 'observedAttibutes' in patern ? (patern as DesignPatern<any>).observedAttibutes : null);
        console.warn('observedAttibutes : ',observedAttibutes , event );
        if(observedAttibutes.includes(event)){
          return (sourceElement as CustomElement<Element,{}>).on( event , callback , this as unknown as CustomElement<Element,{}>);
        }
      }
      else console.error("Seems that this sourceElement ins't a thorium-component");

    }

    on = ( attributeName:string , callback:(mutation:Mutation)=>void , sourceElement?:CustomElement<Element,{}> | Element ):Observer => {

      let stack = (this.oberservers.has(attributeName) ? this.oberservers.get(attributeName) : (() => {
        this.oberservers.set(attributeName , new Map());
        return this.oberservers.get(attributeName);
      })() );

      let oberserverId = crypto.randomUUID();
      stack.set(oberserverId , {
        _id : oberserverId,
        attributeName : attributeName,
        target : this as unknown as CustomElement<Element,{}>,
        sourceElement : sourceElement,
        callback : callback
      });

      return stack.get(oberserverId);

    }
  
  }

}

export interface Mutation{
  attributeName:string;
  oldValue:string;
  newValue:string
}

export type Observers = Map<string,ObserversStack>;

export type ObserversStack = Map<string,Observer>

export interface Observer{
  _id : string;
  attributeName : string,
  target?:CustomElement<Element,{}>;
  sourceElement?:CustomElement<Element,{}> | Element;
  callback : (mutation:Mutation) => void;
}

