import { DOMRender } from "../dom/dom-render";
import { DesignPatern } from '../design-system';
import { Controller } from ".";

export function PageController(paternName:string,patern:DesignPatern,T):any{

  return class extends Controller(paternName,patern,T){

    connectedCallback(): void {

      if(this.parentNode.tagName == "BODY"){
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
      else {
        alert('Page component have to be mounted on body');
        this.remove();
      }
    }

  }

}