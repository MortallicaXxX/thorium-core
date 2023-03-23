import { DOM } from "../dom";
import { DesignPatern } from '../design-system';
import { NodeTemplate } from '../dom/dom-render';
import { Transactions } from "./transactions";
import { Effects } from "./effects";
import { CustomElementPatern } from "../design-system/register";

type Views = Record<string,NodeTemplate>;

export interface ViewDesignPatern extends DesignPatern{
  defaultView:string;
  views:Record<string,NodeTemplate>;
}

export function ViewController(T):any{

  return class Controller extends T{

    static transactions;
    static effects;

    static get observedAttributes() {
      return ['context'];
    }

    patern:DesignPatern;
    views:Views;
    slotContainer:HTMLSlotElement;

    constructor(patern:ViewDesignPatern){
        super();
        this.patern = patern;
        this.views = patern.views;
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

    getContext(){ return this.getAttribute('context') }

    getContextList(){ return Object.keys(this.views); }

    setContext(newContext){ 
      if(this.getContextList().includes(newContext))this.setAttribute('context' , newContext);
      else console.error(`context ${newContext} is not existing`);
    }

    connectedCallback(){

        let {transactions , transactions_onload} = this.$Thorium;

        Array.from([...transactions_onload.values()] , (transaction) => {
          let template = transaction.template;

          if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {

              this.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
          })

          if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
              this[protoKey] = (template.proto as Record<string,any>)[protoKey];
          })
      })

    }

    disconnectedCallback(){
      if(this.onunmount)this.onunmount();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      // let slot = this.slotContainer;
      let views = this.views;
      if(this.onmutation)this.onmutation({name,oldValue,newValue})
      if(this.oncontextchange)this.oncontextchange(newValue);
      // console.log(this.views , newValue);

      if(views[newValue]){
        Array.from([...this.children].reverse() , (element:HTMLElement) => {
          element.remove();
        })
        this.appendChild(DOM.render(this.views[newValue]))
      }else {

        if(oldValue){
          console.error(`context ${newValue} is not existing`);
          this.setAttribute('context' , oldValue);
        }

      }
      
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
  
  }

}