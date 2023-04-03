import { PageController } from "./page-controller";
import { ThoriumController } from "./thorium-controller";
import { ViewController , ViewDesignPatern } from "./view-controller";
import { DesignPatern , CustomElementPatern } from "../design-system";
import { DOM } from "../dom";
import { Transactions } from "./transactions";
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

export const Controller = (paternName:string,patern:DesignPatern,T) => {

  return class Controller extends T{

    static transactions = Transactions();
    static effects = Effects();
    static connector = () => {
        return (connectorTemplate?:ConnectorTemplate) => {
            return {
                localName : paternName,
                attr : (connectorTemplate && connectorTemplate.attr ? connectorTemplate.attr : {}),
                childrens : (connectorTemplate && connectorTemplate.childrens ? connectorTemplate.childrens : []),
                proto : (connectorTemplate && connectorTemplate.proto ? connectorTemplate.proto : {})
            };
        }
    }

    static get observedAttributes() {
      return ['context'];
    }

    patern:DesignPatern;

    constructor(){
        super();
        this.patern = patern;

        if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
          this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
        })

        if(patern.childrens){
          const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
          Array.from( patern.childrens , (children) => {
              shadow.appendChild(DOM.render(children))
          } )
        }

        if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
          this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
        })

        let c = (customElements.get(paternName) as CustomElementPatern);
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

      if(this.afterMounting)this.afterMounting();

  }

    disconnectedCallback(){
      if(this.onunmount)this.onunmount();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if(this.onmutation)this.onmutation({name,oldValue,newValue})
      if(this.oncontextchange)this.oncontextchange(newValue)
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

