import { PageController } from "./page-controller";
import { ThoriumController } from "./thorium-controller";
import { ViewController , IViewController , ViewDesignPatern } from "./view-controller";
import DesignSystem, { DesignPatern , CustomElementPatern, CustomElement, CssObject } from "../design-system";
import { DOM, NodeTemplate, VDOM } from "../dom";
import { Transactions , ITransaction } from "./transactions";
import { Effects } from "./effects";
import { ConnectorTemplate } from "../connector";
import { PaternArea } from "./area";
import { VirtualElement } from "../dom/dom-virtual-v2";

import * as path from 'path';
import * as DOMCSSOM from 'dom-cssom';

export interface CustomElementController{
  /**
    * Récupère le contexte de l'élément personnalisé.
    *
    * @method context
    * @typeparam T - Le type de l'élément contextuel recherché.
    * @param contextNameToFind - Le nom optionnel du contexte à rechercher.
    * @returns L'élément contextuel correspondant ou `undefined` si aucun contexte n'est trouvé.
  */
  context<T>(contextNameToFind?:string):T;
  useContext<T>(hook:(context:T) => void):void;
  contextPage<T>():T;
  useVirtual( hook:(virtualElement:VirtualElement) => void ):void;
  /** Gestionnaire de cycle de vie : connectedCallback */
  connectedCallback():void;
  /** Gestionnaire de cycle de vie : disconnectedCallback */
  disconnectedCallback():void;
  /** Gestionnaire de changement d'attribut observé */
  attributeChangedCallback(name: string, oldValue: string, newValue: string):void;
  /**
     * Active une transaction spécifique sur le composant.
     *
     * @method useTransaction
     * @param transactionName - Le nom de la transaction à activer.
    */
  useTransaction:(transactionName:string) => void;
  /**
     * Ajoute une transaction au contrôleur Thorium.
     *
     * @method addTransaction
     * @param transaction - La transaction à ajouter.
     * @returns L'ID de la transaction ajoutée.
    */
  addTransaction:(transaction) => string;
  /**
    * Supprime une transaction au contrôleur Thorium.
    *
    * @method removeTransaction
    * @param transactionId - L'ID de la transaction à supprimer.
    * @returns True si la transaction a été supprimée avec succès, sinon null.
  */
  removeTransaction:(transactionId:string) => boolean;
  /**
    * Active un effet spécifique du contrôleur Thorium.
    *
    * @method useEffect
    * @param operationName - Le nom de l'effet à activer.
    * @param options - Options supplémentaires à transmettre à l'effet.
  */
  useEffect : (operationName:string,...options) => void;
  /**
    * Ajoute un nouvel effet au contrôleur Thorium.
    *
    * @method addEffect
    * @param effect - L'effet à ajouter, représenté par un objet contenant les propriétés `name` (nom de l'effet) et `callback` (fonction callback de l'effet).
    * @returns L'ID de l'effet ajouté.
  */
  addEffect:(effect) => string;
  /**
    * Supprime un effet du contrôleur Thorium.
    *
    * @method removeEffect
    * @param effectId - L'ID de l'effet à supprimer.
    * @returns `true` si l'effet a été supprimé avec succès, sinon `false`.
  */
  removeEffect:(effectId:string) => boolean;
  /**
    * Map contenant les observateurs pour chaque attribut.
    * Chaque clé de la map correspond à un nom d'attribut,
    * et chaque valeur est un map contenant les observateurs
    * associés à cet attribut.
  */
  oberservers:Observers;
  /**
    * Récupère l'observateur correspondant à l'ID spécifié.
    * 
    * @param observerId L'ID de l'observateur à récupérer.
    * @returns L'observateur correspondant à l'ID spécifié, s'il existe ; sinon, null.
  */
  getObserver:(observerId:string) => Observer;
  /**
    * Supprime l'observateur correspondant à l'ID spécifié.
    * 
    * @param observerId L'ID de l'observateur à supprimer.
    * @returns True si l'observateur a été supprimé avec succès ; sinon, false.
  */
  removeObserver:(observerId:string) => boolean;
  /**
    * Déclenche les rappels des observateurs en réponse à une mutation observée.
    * 
    * @param mutation La mutation observée.
  */
  delegateObservedMutation:(mutation:Mutation) => void;
  /**
    * Ajoute un observateur pour surveiller les modifications d'attributs d'un composant tiers.
    * @param sourceElement L'élément personnalisé ou l'élément HTML correspondant au composant tiers.
    * @param event L'événement correspondant à la modification d'attribut à observer.
    * @param callback La fonction de rappel à appeler lorsque la modification d'attribut est détectée.
    * @returns L'observateur créé pour la surveillance des modifications d'attributs.
    * @throws Une erreur si `sourceElement` n'est pas un composant Thorium valide.
  */
  addComponentObserver:(sourceElement:CustomElement<Element,{}> | Element , event:string , callback:(mutation:Mutation)=>void) => Observer;
  /**
    * Attache un observateur à un attribut spécifique d'un élément personnalisé ou d'un élément DOM.
    * L'observateur sera déclenché lorsqu'un changement est détecté sur l'attribut spécifié.
    *
    * @param attributeName - Le nom de l'attribut à observer.
    * @param callback - La fonction de rappel qui sera exécutée lorsque le changement est détecté.
    *                   La fonction de rappel reçoit un argument contenant des informations sur la mutation.
    * @param sourceElement - (Facultatif) L'élément personnalisé ou l'élément DOM à observer.
    *                       Si non spécifié, l'observateur sera attaché à l'élément courant.
    * @returns L'observateur créé, qui peut être utilisé pour le détacher ultérieurement.
  */
  on:( attributeName:string , callback:(mutation:Mutation)=>void , sourceElement?:CustomElement<Element,{}> | Element ) => Observer;
  isStyleSheetAttached:boolean;
  styleSheetId:string;
  appliedStyles:string[];
  attachStyleSheet : DOMCSSOM;
  styleSheet : () => DOMCSSOM;
};

export const ElementController = <X,Y = null,Z = null>(target:CustomElement<HTMLElement,X,Y,Z>):CustomElementController => {
  const controller = {
    context<T>(contextNameToFind?:string){
      /**
       * Fonction récursive pour rechercher le contexte dans les éléments parents.
       *
       * @function findUpperElementContext
       * @param node - L'élément en cours d'examen.
       * @returns L'élément contextuel correspondant ou `undefined` si aucun contexte n'est trouvé.
      */
      const findUpperElementContext = (node:CustomElement<HTMLElement,X,Y,Z>) => {
  
        // Si le parentNode est body, retourner l'élément actuel
        if(node.parentNode == document.body)return node;
        if(!node.parentNode)return node;
  
        // Si l'élément est un contexte
        if(node.attributes['context']){
          // Si nous cherchons le contexte par son nom, nous comparons node.name avec contextNameToFind
          if(contextNameToFind){
            // Si le nom correspond, retourner l'élément
            if(node.attributes['context'].value == contextNameToFind)return node;
            // Sinon, essayer de chercher dans les niveaux supérieurs
            else return findUpperElementContext(node.parentNode as CustomElement<HTMLElement,X,Y,Z>);
          }
          // Si le contexte est trouvé et que l'élément est différent de celui recherché pour son contexte, retourner l'élément
          else if(node != target){ return node }
          // Sinon, essayer de chercher dans les niveaux supérieurs
          else return findUpperElementContext(node.parentNode as CustomElement<HTMLElement,X,Y,Z>)
  
        }
        // Sinon, essayer de chercher dans les niveaux supérieurs
        else return findUpperElementContext(node.parentNode as CustomElement<HTMLElement,X,Y,Z>);
  
      }
  
      // Appeler la fonction de recherche en commençant par l'élément actuel et la convertir en type T
      return findUpperElementContext(target) as T
  
    },
    useContext<T>( hook:( context?:T )=>void , contextNameToFind?:string ){

      let srcElement = this as CustomElement<HTMLElement , {}>;
      if( srcElement && 'context' in srcElement ){
        let elementContext = ( contextNameToFind ? srcElement.context(contextNameToFind) : srcElement.context() ) as T;
        return hook.bind(elementContext)( elementContext );
      }
      else return ;
    
    },
    useVirtual( hook:( virtualELement:VirtualElement ) => void ){
      let srcElement = this as CustomElement<HTMLElement , {}>;
      console.log(srcElement , this)
      if(srcElement['_id']){
        let virtualElement = VDOM.getElementByElementId(srcElement['_id']);
        return hook.bind(virtualElement)( virtualElement );
      }
    },
    contextPage<T>(){

    },
    // connectedCallback(){

    //   console.log(target,'connectedCallback');
  
    //   let { patern } = target;
    //   let {transactions , transactions_onload} = target.$Thorium;
  
    //   // Parcours des transactions et transactions_onload définies dans le modèle du composant
    //   Array.from([...transactions_onload.values()] , (transaction) => {
    //     let template = transaction.template;
  
    //     // Application des attributs correspondant au template de la transaction
    //     if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
    //         if(attributeName == 'class')target.classList.add(template.attr[attributeName]);
    //         else if(attributeName == 'text') target.innerText = template.attr[attributeName];
    //         else if(attributeName == 'stylesheet'){
    //           console.warn('add style sheet')
    //           let context = target.context<CustomElement<HTMLElement , {}>>();
    //           if(context.isStyleSheetAttached){
    //             let {stylesheet} = template.attr;
    //             DesignSystem().style(stylesheet)
    //             .then((result) => {
    //               console.log(result);
    //             })
    //           }
    //         }
    //         else target.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
    //     })
  
    //     // Application des variables et méthodes prototypes correspondant au template de la transaction
    //     if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
    //         target[protoKey] = (template.proto as Record<string,any>)[protoKey];
    //     })
    //   })
  
    //   // Application des attributs déclaré dans le patern à l'élément custom
    //   if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
    //     if(attributeName == 'class')target.classList.add(patern.attr[attributeName] as string);
    //     else if(attributeName == 'text') target.innerText = patern.attr[attributeName] as string;
    //     else if(attributeName == 'stylesheet'){
    //       console.warn('add style sheet')
    //       let context = target.context<CustomElement<HTMLElement , {}>>();
    //       if(!context.isStyleSheetAttached)target.attachStyleSheet();
    //       let { styleSheet } = patern.attr;
    //       DesignSystem().style( styleSheet as CssObject )
    //       .then((result) => {
    //         console.log(result);
    //       })
    //     }
    //     else target.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
    //   })
  
    //   if(target.afterMounting && !target.isMounted)target.afterMounting(target);
    //   if(!target.isMounted)target.isMounted = true;
  
    // },
    // disconnectedCallback(){
    //   if(target.onunmount)target.onunmount();
    // },
    // attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //   let mutation = {attributeName:name,oldValue,newValue};
    //   if(target.onmutation)target.onmutation(mutation);
    //   if(target.oncontextchange)target.oncontextchange(newValue);
    //   target.delegateObservedMutation(mutation);
    // },
    useTransaction : (transactionName:string) => {
      // Récupérer le contrôleur Thorium associé au composant
      let thorium_controller = target.$Thorium;
      // Parcourir toutes les transactions du contrôleur
      Array.from([...thorium_controller.transactions.values()] , (transaction) => {
        // Si le nom de la transaction correspond
        if(transaction.name == transactionName){
  
          let template = transaction.template;
  
          // Appliquer les attributs de modèle à l'élément
          if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
            target.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
          })
  
          // Appliquer les variables et méthodes de modèle à l'élément
          if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
            target[protoKey] = (template.proto as Record<string,any>)[protoKey];
          })
  
  
        }
      })
    },
    addTransaction : (transaction) => {
      // Générer un ID unique pour la transaction
      let transactionId = crypto.randomUUID();
      // Ajouter la transaction au contrôleur Thorium en utilisant l'ID généré
      target.$Thorium.transactions.set(transactionId , { id : transactionId , ...transaction});
      // Retourner l'ID de la transaction ajoutée
      return transactionId;
    },
    removeTransaction : (transactionId:string) => {
      return ( target.$Thorium.transactions.has(transactionId) ? target.$Thorium.transactions.delete(transactionId) : null );
    },
    useEffect : (operationName:string,...options) => {
      let thorium_controller = target.$Thorium;
      // Parcours de tous les effets du contrôleur Thorium
      Array.from([...thorium_controller.effects.values()] , (effect) => {
        if(effect.name == operationName)effect.callback(target,options)
      })
    },
    addEffect : (effect) => {
      let effectId = crypto.randomUUID();
      target.$Thorium.effects.set(effectId , { id : effectId , ...effect});
      return effectId;
    },
    removeEffect : (effectId:string) => {
      return ( target.$Thorium.effects.has(effectId) ? target.$Thorium.effects.delete(effectId) : null );
    },
    oberservers : new Map(),
    getObserver : (observerId:string) => {
  
      return Array.from( target.oberservers.values() , (stack) => {
        return Array.from( stack.values() , (observerInfo) => {
          if(observerInfo._id == observerId)return observerInfo;
        } )
      } ).flat().filter((x) => x)[0];
  
    },
    removeObserver : (observerId:string) => {
  
      return Array.from( target.oberservers.values() , (stack) => {
        return (stack.has(observerId) ? stack.delete(observerId) : null)
      } ).flat().filter((x) => x)[0];
  
    },
    delegateObservedMutation : (mutation:Mutation) => {
  
      let {attributeName,oldValue,newValue} = mutation;
      // Récupération de la pile d'observateurs correspondant à l'attribut modifié
      let stack = ( target.oberservers.has(attributeName) ? target.oberservers.get(attributeName) : null );
  
      if(stack)Array.from( stack.values() , (observer) => {
         // Vérification si l'observateur a un élément source et si cet élément est toujours présent dans le document
        if(observer.sourceElement && document.body.contains(observer.sourceElement))observer.callback(mutation);
        // Si l'observateur n'a pas d'élément source, le rappel du callback est effectué
        else if(!observer.sourceElement)observer.callback(mutation);
        // Si l'observateur a un élément source mais il n'est plus présent dans le document,
        // il est supprimé de la pile d'observateurs
        else (stack as ObserversStack).delete(observer._id);
      } )
  
    },
    addComponentObserver : (sourceElement:CustomElement<HTMLElement,{}> | HTMLElement , event:string , callback:(mutation:Mutation)=>void):Observer|void => {
  
      let patern = ( 'patern' in sourceElement ? sourceElement.patern : null) as NodeTemplate<any> | DesignPatern<any>;
      console.warn('sourceElement : ',sourceElement);
      console.warn('patern : ',patern);
  
      if(patern){
        let observedAttibutes = ( 'observedAttibutes' in patern ? (patern as DesignPatern<any>).observedAttibutes : null);
        console.warn('observedAttibutes : ',observedAttibutes , event );
        if((observedAttibutes as string[]).includes(event)){
          return (sourceElement as CustomElement<HTMLElement,{}>).on( event , callback , target as unknown as CustomElement<HTMLElement,{}>);
        }
      }
      else console.error("Seems that target sourceElement ins't a thorium-component");
  
    },
    on : ( attributeName:string , callback:(mutation:Mutation)=>void , sourceElement?:CustomElement<HTMLElement,{}> | HTMLElement ):Observer => {
  
      let stack = (target.oberservers.has(attributeName) ? target.oberservers.get(attributeName) : (() => {
        target.oberservers.set(attributeName , new Map());
        return target.oberservers.get(attributeName);
      })() );
  
      let oberserverId = crypto.randomUUID();
      (stack as ObserversStack).set(oberserverId , {
        _id : oberserverId,
        attributeName : attributeName,
        target : target as any,
        sourceElement : sourceElement,
        callback : callback
      });
  
      return (stack as any).get(oberserverId);
  
    },
    /// STYLES
    isStyleSheetAttached : false,
    styleSheetId : null,
    appliedStyles : [],
    attachStyleSheet : null,
    styleSheet : () => {
      if(!target.attachStyleSheet)target.attachStyleSheet = DOMCSSOM({scoped: true}).appendTo(target) as HTMLStyleElement;
      return target.attachStyleSheet;
    },
  } as unknown as CustomElementController;

  return controller;
}

export {
  PageController,
  ThoriumController,
  ViewController,
  IViewController,
  ViewDesignPatern,
  PaternArea
}

export * from "./page-controller";
export * from "./thorium-controller";
export * from "./view-controller";
export * from "./transactions";
export * from "./effects";
export * from "./area";

/**
 * Fonction générique permettant de créer un contrôleur personnalisé pour un composant web.
 * 
 * @param paternName - Le nom du modèle de design utilisé pour le composant.
 * @param patern - Le modèle de design utilisé pour le composant.
 * @param sourceClass - La classe source à partir de laquelle le contrôleur est étendu.
 * @returns La classe du contrôleur personnalisé pour le composant web.
*/
export const Controller = <T,X,Z>(paternName:string,patern:DesignPatern<T>,sourceClass) => {

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

        // Création et attache de l'ombre du web component
        if(patern.childrens){
          const shadow = (this as unknown as HTMLElement).attachShadow({mode: 'open'});
          Array.from( patern.childrens , (children) => {
              DOM.render<HTMLElement>(children , shadow)
          } )
        }

        // Définition des getters du contrôleur
        if(patern.__getter__ && Object.keys(patern.__getter__).length > 0){
          Array.from( Object.keys( patern.__getter__ ) , (key) => {
            let element = this;
  
            this.__defineGetter__( key , () => {
              return (patern as any).__getter__[key](element as any)
            } )
          } )
        }
  
        // Définition des setters du contrôleur
        if(patern.__setter__ && Object.keys(patern.__setter__).length > 0){
          Array.from( Object.keys( patern.__setter__ ) , (key) => {
            let element = this;
  
            this.__defineSetter__( key , (value) => {
              return (patern as any).__setter__[key](value , element as any)
            } )
          } )
        }

        // Copie des variables et méthodes vers l'instance du controller
        if(patern.proto)Array.from( Object.keys(patern.proto) , (protoKey) => {
          this[protoKey] = (patern.proto as Record<string,any>)[protoKey];
        })

        // Récupération des transactions et des effets depuis le modèle du web component
        let c = (customElements.get(paternName) as CustomElementPatern<X,Z>);
        let {transactions , transactions_onload} = c.transactions;
        let { effects } = c.effects;
                
        let $Thorium = {
            transactions , 
            get transactionList(){
              return Array.from( [...$Thorium.transactions.keys()] , (key) => {
                return { key : key , name : $Thorium.transactions.get(key).name }
              } )
            },
            transactions_onload ,
            effects,
            get effectList(){
              return Array.from( [...$Thorium.effects.keys()] , (key) => {
                return { key : key , name : $Thorium.effects.get(key).name }
              } )
            },
        };

        this.$Thorium = $Thorium;

        if(this.beforeMounting)this.beforeMounting();
    }

    connectedCallback(){

      console.log(this.parentNode,'connectedCallback');

      // Object.assign(this , ElementController(this as any));
  
      let { patern , $Thorium } = this;
      let {transactions , transactions_onload} = $Thorium;
  
      // Parcours des transactions et transactions_onload définies dans le modèle du composant
      Array.from([...transactions_onload.values()] , (transaction) => {
        let template = transaction.template;
  
        // Application des attributs correspondant au template de la transaction
        if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
            if(attributeName == 'class')this.classList.add(template.attr[attributeName]);
            else if(attributeName == 'text') this.innerText = template.attr[attributeName];
            else if(attributeName == 'stylesheet'){
              console.warn('add style sheet')
              let context = this.context();
              if(context.isStyleSheetAttached){
                let {stylesheet} = template.attr;
                DesignSystem().style(stylesheet)
                .then((result) => {
                  console.log(result);
                })
              }
            }
            else this.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
        })
  
        // Application des variables et méthodes prototypes correspondant au template de la transaction
        if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
            this[protoKey] = (template.proto as Record<string,any>)[protoKey];
        })
      });

      console.log(patern.attr);
  
      // Application des attributs déclaré dans le patern à l'élément custom
      // if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
      //   alert(attributeName)
      //   if(attributeName == 'class')this.classList.add(patern.attr[attributeName] as string);
      //   else if(attributeName == 'text') this.innerText = patern.attr[attributeName] as string;
      //   else if(attributeName == 'stylesheet'){
      //     console.warn('add style sheet')
      //     let context = this.context();
      //     if(!context.isStyleSheetAttached)this.attachStyleSheet();
      //     let { styleSheet } = patern.attr;
      //     DesignSystem().style( styleSheet as CssObject )
      //     .then((result) => {
      //       console.log(result);
      //     })
      //   }
      //   else this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
      // })
  
      if(this.afterMounting && !this.isMounted)this.afterMounting(this);
      if(!this.isMounted)this.isMounted = true;
  
    };
    disconnectedCallback(){
      if(this.onunmount)this.onunmount();
    };
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      let mutation = {attributeName:name,oldValue,newValue};
      if(this.onmutation)this.onmutation(mutation);
      if(this.oncontextchange)this.oncontextchange(newValue);
      if(this.delegateObservedMutation)this.delegateObservedMutation(mutation);
    };
    
    // /**
    //  * Récupère le contexte de l'élément personnalisé.
    //  *
    //  * @method context
    //  * @typeparam T - Le type de l'élément contextuel recherché.
    //  * @param contextNameToFind - Le nom optionnel du contexte à rechercher.
    //  * @returns L'élément contextuel correspondant ou `undefined` si aucun contexte n'est trouvé.
    // */
    // context<T>(contextNameToFind?:string){
  
    //   /**
    //    * Fonction récursive pour rechercher le contexte dans les éléments parents.
    //    *
    //    * @function findUpperElementContext
    //    * @param node - L'élément en cours d'examen.
    //    * @returns L'élément contextuel correspondant ou `undefined` si aucun contexte n'est trouvé.
    //   */
    //   const findUpperElementContext = (node:Controller) => {
  
    //     // Si le parentNode est body, retourner l'élément actuel
    //     if(node.parentNode == document.body)return node;
  
    //     // Si l'élément est un contexte
    //     if(node.attributes['context']){
    //       // Si nous cherchons le contexte par son nom, nous comparons node.name avec contextNameToFind
    //       if(contextNameToFind){
    //         // Si le nom correspond, retourner l'élément
    //         if(node.attributes['context'].value == contextNameToFind)return node;
    //         // Sinon, essayer de chercher dans les niveaux supérieurs
    //         else return findUpperElementContext(node.parentNode as Controller);
    //       }
    //       // Si le contexte est trouvé et que l'élément est différent de celui recherché pour son contexte, retourner l'élément
    //       else if(node != this){ return node }
    //       // Sinon, essayer de chercher dans les niveaux supérieurs
    //       else return findUpperElementContext(node.parentNode as Controller)
  
    //     }
    //     // Sinon, essayer de chercher dans les niveaux supérieurs
    //     else return findUpperElementContext(node.parentNode as Controller);
  
    //   }
  
    //   // Appeler la fonction de recherche en commençant par l'élément actuel et la convertir en type T
    //   return findUpperElementContext(this) as T
  
    // }

    // /** Gestionnaire de cycle de vie : connectedCallback */
    // connectedCallback(){

    //   let {transactions , transactions_onload} = this.$Thorium;

    //   // Parcours des transactions et transactions_onload définies dans le modèle du composant
    //   Array.from([...transactions_onload.values()] , (transaction) => {
    //     let template = transaction.template;

    //     // Application des attributs correspondant au template de la transaction
    //     if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
    //         if(attributeName == 'class')this.classList.add(template.attr[attributeName]);
    //         else if(attributeName == 'text') this.innerText = template.attr[attributeName];
    //         else this.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
    //     })

    //     // Application des variables et méthodes prototypes correspondant au template de la transaction
    //     if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
    //         this[protoKey] = (template.proto as Record<string,any>)[protoKey];
    //     })
    //   })

    //   // Application des attributs déclaré dans le patern à l'élément custom
    //   if(patern.attr)Array.from( Object.keys(patern.attr) , (attributeName) => {
    //     this.setAttribute(attributeName , (patern.attr as Record<string,any>)[attributeName]);
    //   })

    //   if(this.afterMounting && !this.isMounted)this.afterMounting(this);
    //   if(!this.isMounted)this.isMounted = true;

    // }

    // /** Gestionnaire de cycle de vie : disconnectedCallback */
    // disconnectedCallback(){
    //   if(this.onunmount)this.onunmount();
    // }

    // /** Gestionnaire de changement d'attribut observé */
    // attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //   let mutation = {attributeName:name,oldValue,newValue};
    //   if(this.onmutation)this.onmutation(mutation);
    //   if(this.oncontextchange)this.oncontextchange(newValue);
    //   this.delegateObservedMutation(mutation)
    // }

    // /**
    //  * Active une transaction spécifique sur le composant.
    //  *
    //  * @method useTransaction
    //  * @param transactionName - Le nom de la transaction à activer.
    // */
    // useTransaction = (transactionName:string) => {
    //   // Récupérer le contrôleur Thorium associé au composant
    //   let thorium_controller = this.$Thorium;
    //   // Parcourir toutes les transactions du contrôleur
    //   Array.from([...thorium_controller.transactions.values()] , (transaction) => {
    //     // Si le nom de la transaction correspond
    //     if(transaction.name == transactionName){

    //       let template = transaction.template;

    //       // Appliquer les attributs de modèle à l'élément
    //       if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
    //         this.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
    //       })

    //       // Appliquer les variables et méthodes de modèle à l'élément
    //       if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
    //           this[protoKey] = (template.proto as Record<string,any>)[protoKey];
    //       })


    //     }
    //   })
    // }

    // /**
    //  * Ajoute une transaction au contrôleur Thorium.
    //  *
    //  * @method addTransaction
    //  * @param transaction - La transaction à ajouter.
    //  * @returns L'ID de la transaction ajoutée.
    // */
    // addTransaction = (transaction) => {
    //   // Générer un ID unique pour la transaction
    //   let transactionId = crypto.randomUUID();
    //   // Ajouter la transaction au contrôleur Thorium en utilisant l'ID généré
    //   this.$Thorium.transactions.set(transactionId , { id : transactionId , ...transaction});
    //   // Retourner l'ID de la transaction ajoutée
    //   return transactionId;
    // }

    // /**
    //  * Supprime une transaction au contrôleur Thorium.
    //  *
    //  * @method removeTransaction
    //  * @param transactionId - L'ID de la transaction à supprimer.
    //  * @returns True si la transaction a été supprimée avec succès, sinon null.
    // */
    // removeTransaction = (transactionId:string) => {
    //   return ( this.$Thorium.transactions.has(transactionId) ? this.$Thorium.transactions.delete(transactionId) : null );
    // }

    // /**
    //  * Active un effet spécifique du contrôleur Thorium.
    //  *
    //  * @method useEffect
    //  * @param operationName - Le nom de l'effet à activer.
    //  * @param options - Options supplémentaires à transmettre à l'effet.
    // */
    // useEffect = (operationName:string,...options) => {
    //   let thorium_controller = this.$Thorium;
    //   // Parcours de tous les effets du contrôleur Thorium
    //   Array.from([...thorium_controller.effects.values()] , (effect) => {
    //     if(effect.name == operationName)effect.callback(this,options)
    //   })
    // }

    // /**
    //  * Ajoute un nouvel effet au contrôleur Thorium.
    //  *
    //  * @method addEffect
    //  * @param effect - L'effet à ajouter, représenté par un objet contenant les propriétés `name` (nom de l'effet) et `callback` (fonction callback de l'effet).
    //  * @returns L'ID de l'effet ajouté.
    // */
    // addEffect = (effect) => {
    //   let effectId = crypto.randomUUID();
    //   this.$Thorium.effects.set(effectId , { id : effectId , ...effect});
    //   return effectId;
    // }

    // /**
    //  * Supprime un effet du contrôleur Thorium.
    //  *
    //  * @method removeEffect
    //  * @param effectId - L'ID de l'effet à supprimer.
    //  * @returns `true` si l'effet a été supprimé avec succès, sinon `false`.
    // */
    // removeEffect = (effectId:string) => {
    //   return ( this.$Thorium.effects.has(effectId) ? this.$Thorium.effects.delete(effectId) : null );
    // }

    // /**
    //  * Map contenant les observateurs pour chaque attribut.
    //  * Chaque clé de la map correspond à un nom d'attribut,
    //  * et chaque valeur est un map contenant les observateurs
    //  * associés à cet attribut.
    // */
    // oberservers:Observers = new Map();
    
    // /**
    //  * Récupère l'observateur correspondant à l'ID spécifié.
    //  * 
    //  * @param observerId L'ID de l'observateur à récupérer.
    //  * @returns L'observateur correspondant à l'ID spécifié, s'il existe ; sinon, null.
    // */
    // getObserver = (observerId:string) => {

    //   return Array.from( this.oberservers.values() , (stack) => {
    //     return Array.from( stack.values() , (observerInfo) => {
    //       if(observerInfo._id == observerId)return observerInfo;
    //     } )
    //   } ).flat().filter((x) => x)[0];

    // }

    // /**
    //  * Supprime l'observateur correspondant à l'ID spécifié.
    //  * 
    //  * @param observerId L'ID de l'observateur à supprimer.
    //  * @returns True si l'observateur a été supprimé avec succès ; sinon, false.
    // */
    // removeObserver = (observerId:string) => {

    //   return Array.from( this.oberservers.values() , (stack) => {
    //     return (stack.has(observerId) ? stack.delete(observerId) : null)
    //   } ).flat().filter((x) => x)[0];

    // }

    // /**
    //  * Déclenche les rappels des observateurs en réponse à une mutation observée.
    //  * 
    //  * @param mutation La mutation observée.
    // */
    // delegateObservedMutation = (mutation:Mutation) => {

    //   let {attributeName,oldValue,newValue} = mutation;
    //   // Récupération de la pile d'observateurs correspondant à l'attribut modifié
    //   let stack = ( this.oberservers.has(attributeName) ? this.oberservers.get(attributeName) : null );

    //   if(stack)Array.from( stack.values() , (observer) => {
    //      // Vérification si l'observateur a un élément source et si cet élément est toujours présent dans le document
    //     if(observer.sourceElement && document.body.contains(observer.sourceElement))observer.callback(mutation);
    //     // Si l'observateur n'a pas d'élément source, le rappel du callback est effectué
    //     else if(!observer.sourceElement)observer.callback(mutation);
    //     // Si l'observateur a un élément source mais il n'est plus présent dans le document,
    //     // il est supprimé de la pile d'observateurs
    //     else stack.delete(observer._id);
    //   } )

    // }

    // /**
    //  * Ajoute un observateur pour surveiller les modifications d'attributs d'un composant tiers.
    //  * @param sourceElement L'élément personnalisé ou l'élément HTML correspondant au composant tiers.
    //  * @param event L'événement correspondant à la modification d'attribut à observer.
    //  * @param callback La fonction de rappel à appeler lorsque la modification d'attribut est détectée.
    //  * @returns L'observateur créé pour la surveillance des modifications d'attributs.
    //  * @throws Une erreur si `sourceElement` n'est pas un composant Thorium valide.
    // */
    // addComponentObserver = (sourceElement:CustomElement<HTMLElement,{}> | HTMLElement , event:string , callback:(mutation:Mutation)=>void):Observer => {

    //   let patern = ( 'patern' in sourceElement ? sourceElement.patern : null) as NodeTemplate<any> | DesignPatern<any>;
    //   console.warn('sourceElement : ',sourceElement);
    //   console.warn('patern : ',patern);

    //   if(patern){
    //     let observedAttibutes = ( 'observedAttibutes' in patern ? (patern as DesignPatern<any>).observedAttibutes : null);
    //     console.warn('observedAttibutes : ',observedAttibutes , event );
    //     if(observedAttibutes.includes(event)){
    //       return (sourceElement as CustomElement<HTMLElement,{}>).on( event , callback , this as unknown as CustomElement<HTMLElement,{}>);
    //     }
    //   }
    //   else console.error("Seems that this sourceElement ins't a thorium-component");

    // }

    // /**
    //  * Attache un observateur à un attribut spécifique d'un élément personnalisé ou d'un élément DOM.
    //  * L'observateur sera déclenché lorsqu'un changement est détecté sur l'attribut spécifié.
    //  *
    //  * @param attributeName - Le nom de l'attribut à observer.
    //  * @param callback - La fonction de rappel qui sera exécutée lorsque le changement est détecté.
    //  *                   La fonction de rappel reçoit un argument contenant des informations sur la mutation.
    //  * @param sourceElement - (Facultatif) L'élément personnalisé ou l'élément DOM à observer.
    //  *                       Si non spécifié, l'observateur sera attaché à l'élément courant.
    //  * @returns L'observateur créé, qui peut être utilisé pour le détacher ultérieurement.
    // */
    // on = ( attributeName:string , callback:(mutation:Mutation)=>void , sourceElement?:CustomElement<HTMLElement,{}> | HTMLElement ):Observer => {

    //   let stack = (this.oberservers.has(attributeName) ? this.oberservers.get(attributeName) : (() => {
    //     this.oberservers.set(attributeName , new Map());
    //     return this.oberservers.get(attributeName);
    //   })() );

    //   let oberserverId = crypto.randomUUID();
    //   stack.set(oberserverId , {
    //     _id : oberserverId,
    //     attributeName : attributeName,
    //     target : this as unknown as CustomElement<HTMLElement,{}>,
    //     sourceElement : sourceElement,
    //     callback : callback
    //   });

    //   return stack.get(oberserverId);

    // }
  
  }

}

/**
 * Représente une mutation d'attribut sur un élément.
*/
export interface Mutation{
  /** Le nom de l'attribut qui a été modifié */
  attributeName:string;
  /** La valeur précédente de l'attribut avant la modification */
  oldValue:string;
  /** La nouvelle valeur de l'attribut après la modification */
  newValue:string
}

/**
 * Type utilisé pour représenter les observateurs.
 * Il s'agit d'un mappage entre le nom de l'attribut observé et la pile d'observateurs associée.
*/
export type Observers = Map<string,ObserversStack>;

/**
 * Type utilisé pour représenter une pile d'observateurs.
 * Il s'agit d'un mappage entre l'identifiant de l'observateur et l'objet observateur lui-même.
 */
export type ObserversStack = Map<string,Observer>

/**
 * Représente un observateur pour les mutations d'attributs.
*/
export interface Observer{
  /** L'identifiant unique de l'observateur */
  _id : string;
  /** Le nom de l'attribut observé */
  attributeName : string,
  /** La cible de l'observateur, généralement un élément personnalisé */
  target?:CustomElement<Element,{}>;
  /** L'élément source associé à l'observateur */
  sourceElement?:CustomElement<Element,{}> | Element;
  /** La fonction de rappel à appeler lorsque la mutation d'attribut est observée */
  callback : (mutation:Mutation) => void;
}

