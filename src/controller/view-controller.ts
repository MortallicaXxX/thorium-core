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
  'views-elements'?:Record<string,HTMLElement>;
}

export interface IViewController{
  /** get view context */
  getContext():string;
  /** get view's context list */
  getContextList():string[];
  /** set view context */
  setContext(context:string):void;
}

export function ViewController<T,X,Z>(paternName:string,patern:ViewDesignPatern<T>,T):any{

  return class extends Controller<T,X,Z>(paternName,patern,T){

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

      if(this.afterMounting && !this.isMounted)this.afterMounting(this);
      if(!this.isMounted)this.isMounted = true;

      /// Définission des éléments HTML contnenu dans le view
      this.patern["views-elements"] = Object.fromEntries(new Map(Array.from( [...this.children].reverse() , (element:HTMLElement) => {
        let {tagName} = element;
        let defaultView = this.getAttribute('defaultView');
        if(tagName == 'CONTEXT-VIEW'){
          let contextName = element.getAttribute('context-name');
          if(defaultView != contextName)element.remove();
          return [contextName , element]
        }else element.remove();
      }).filter((x) => x) as [[string,HTMLElement]]));

      console.log(this.patern);

      if(this.patern.defaultView){
        this.setAttribute('context' , this.patern.defaultView);
      }

    }

    disconnectedCallback(){
      if(this.onunmount)this.onunmount();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      // let slot = this.slotContainer;
      let views = this.patern.views;
      let viewsElemens = this.patern['views-elements'];

      if(this.onmutation)this.onmutation({name,oldValue,newValue})
      if(this.oncontextchange)this.oncontextchange(newValue);
      // console.log(this.views , newValue);

      console.log({views , viewsElemens})

      if(views && views[newValue]){
        Array.from([...this.children].reverse() , (element:HTMLElement) => {
          element.remove();
        })
        this.appendChild(DOM.render(views[newValue]))
      }
      else if(viewsElemens && viewsElemens[newValue]){
        Array.from([...this.children].reverse() , (element:HTMLElement) => {
          element.remove();
        })
        this.appendChild(viewsElemens[newValue]);
      }else {

        if(oldValue){
          console.error(`context ${newValue} is not existing`);
          this.setAttribute('context' , oldValue);
        }

      }
      
    }

    getContext(){ return this.getAttribute('context') }

    getContextList(){ return [...new Set([
      ...('views' in this.patern ? Object.keys(this.patern.views) : []),
      ...('views-elements' in this.patern ? Object.keys(this.patern['views-elements']) : []),
    ])]; }

    setContext(newContext){ 
      if(this.getContextList().includes(newContext))this.setAttribute('context' , newContext);
      else console.error(`context ${newContext} is not existing`);
    }

  }

}