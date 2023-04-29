import { DOM } from "../dom";
import { DesignPatern } from '../design-system';
import { NodeTemplate } from '../dom/dom-render';
import { Transactions } from "./transactions";
import { Effects } from "./effects";
import { CustomElementPatern } from "../design-system/register";
import { Controller } from ".";

type Views = Record<string,NodeTemplate<any>>;

export interface ViewDesignPatern<T> extends DesignPatern<T>{
  defaultView:string;
  views:Record<string,NodeTemplate<any>>;
}

export function ViewController<T>(paternName:string,patern:ViewDesignPatern<T>,T):any{

  return class extends Controller(paternName,patern,T){

    patern:ViewDesignPatern<T>;

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

      if(this.afterMounting)this.afterMounting();

      if(this.patern.defaultView){
        this.setAttribute('context' , this.patern.defaultView);
      }

      // if(this.afterMounting)this.afterMounting();

    }

    disconnectedCallback(){
      if(this.onunmount)this.onunmount();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      // let slot = this.slotContainer;
      let views = this.patern.views;
      console.log(views)
      if(this.onmutation)this.onmutation({name,oldValue,newValue})
      if(this.oncontextchange)this.oncontextchange(newValue);
      // console.log(this.views , newValue);

      if(views[newValue]){
        Array.from([...this.children].reverse() , (element:HTMLElement) => {
          element.remove();
        })
        this.appendChild(DOM.render(views[newValue]))
      }else {

        if(oldValue){
          console.error(`context ${newValue} is not existing`);
          this.setAttribute('context' , oldValue);
        }

      }
      
    }

    getContext(){ return this.getAttribute('context') }

    getContextList(){ return Object.keys(this.patern.views); }

    setContext(newContext){ 
      if(this.getContextList().includes(newContext))this.setAttribute('context' , newContext);
      else console.error(`context ${newContext} is not existing`);
    }

  }

}