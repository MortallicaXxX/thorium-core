import { DOM } from "../dom";
import { DesignPatern } from '../design-system';
import { NodeTemplate } from '../dom/dom-render';
import { Transactions } from "./transactions";
import { Effects } from "./effects";
import { CustomElementPatern } from "../design-system/register";
import { Controller } from ".";

type Views = Record<string,NodeTemplate<any>>;

/**
 * Interface décrivant le patron de conception pour une vue.
*/
export interface ViewDesignPatern<T> extends DesignPatern<T>{
  defaultView:string;
  views:Record<string,NodeTemplate<any>>;
  'views-elements'?:Record<string,HTMLElement>;
}

/**
 * Interface décrivant les fonctionnalités d'un contrôleur de vue.
*/
export interface IViewController{
  /** Récupère le contexte de la vue courante */
  getContext():string;
  /** Récupère la liste des contextes de vue disponibles */
  getContextList():string[];
  /** Définit le contexte de la vue */
  setContext(context:string):void;
}

/**
 * Fonction qui génère un contrôleur de vue.
 *
 * @param paternName - Nom du modèle de conception du contrôleur.
 * @param patern - Modèle de conception de la vue.
 * @param T - Type générique pour les données du contrôleur.
 * @returns Une classe qui étend le contrôleur de base avec le modèle de conception de la vue.
*/
export function ViewController<T,X,Z>(paternName:string,patern:ViewDesignPatern<T>,T):any{

  return class extends Controller<T,X,Z>(paternName,patern,T){

    patern:ViewDesignPatern<T> = patern;

    /**
     * Méthode appelée lorsque l'élément est rattaché au DOM.
     * Effectue les opérations d'initialisation et de montage de la vue.
    */
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

    /**
     * Méthode appelée lorsque l'élément est détaché du DOM.
     * Effectue les opérations de démontage de la vue.
    */
    disconnectedCallback(){
      if(this.onunmount)this.onunmount();
    }

    /**
     * Méthode appelée lorsqu'un attribut de l'élément est modifié.
     * Gère les changements de contexte et met à jour la vue en conséquence.
     *
     * @param name - Nom de l'attribut modifié.
     * @param oldValue - Ancienne valeur de l'attribut.
     * @param newValue - Nouvelle valeur de l'attribut.
    */
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
        DOM.render(views[newValue] , this as any)
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

    /**
     * Méthode permettant de récupérer le contexte de la vue courante.
     *
     * @returns Le contexte de la vue courante.
    */
    getContext(){ return this.getAttribute('context') }

    /**
     * Méthode permettant de récupérer la liste des contextes de vue disponibles.
     *
     * @returns La liste des contextes de vue disponibles.
    */
    getContextList(){ return [...new Set([
      ...('views' in this.patern ? Object.keys(this.patern.views) : []),
      ...('views-elements' in this.patern ? Object.keys(this.patern['views-elements'] as any) : []),
    ])]; }

    /**
     * Méthode permettant de définir le contexte de la vue.
     *
     * @param newContext - Le nouveau contexte de la vue.
    */
    setContext(newContext){ 
      if(this.getContextList().includes(newContext))this.setAttribute('context' , newContext);
      else console.error(`context ${newContext} is not existing`);
    }

  }

}