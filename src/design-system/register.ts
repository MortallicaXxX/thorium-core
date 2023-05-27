import * as htmlTags from 'html-tags';
import { ConnectorTemplate } from '../'

import { DOMRender , NodeTemplate } from "../dom/dom-render";
import { Observer , Observers , Mutation, PageController , ThoriumController , ViewController , ViewDesignPatern } from '../controller';
import { Transactions , TransactionPatern } from '../controller/transactions';
import { Effects , EffectPatern } from '../controller/effects';

export interface DesignPatern<T> extends ConnectorTemplate<T>{
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

/**
 * Représente un élément personnalisé qui combine les fonctionnalités d'un HTMLElement existant et des méthodes personnalisées.
 *
 * @typeparam T - L'interface de l'HTMLElement existant.
 * @typeparam X - L'interface personnalisée définie par le développeur pour étendre l'HTMLElement existant.
 * @typeparam ITransaction - Le type des transactions utilisées par l'élément personnalisé (optionnel).
 * @typeparam IEffect - Le type des effets utilisés par l'élément personnalisé (optionnel).
 */
export type CustomElement<T,X,ITransaction = null,IEffect = null> = T & X & {
    /**
     * Récupère le contexte de l'élément personnalisé.
     *
     * @method context
     * @typeparam T - Le type de l'élément contextuel recherché.
     * @param contextNameToFind - Le nom optionnel du contexte à rechercher.
     * @returns L'élément contextuel correspondant ou `undefined` si aucun contexte n'est trouvé.
    */
    context<Y>(contextName?:string):CustomElement<Y,Element,any,any>;
    onmutation(mutation:Mutation):void;
    beforeMounting(target:CustomElement<T,X,ITransaction,IEffect>):void;
    afterMounting(target:CustomElement<T,X,ITransaction,IEffect>):void;
    onunmount():void;
    oncontextchange():void;
    /**
     * Active une transaction spécifique sur le composant.
     *
     * @method useTransaction
     * @param transactionName - Le nom de la transaction à activer.
    */
    useTransaction(transactionName:ITransaction):void;
    /**
     * Ajoute une transaction au contrôleur Thorium.
     *
     * @method addTransaction
     * @param transaction - La transaction à ajouter.
     * @returns L'ID de la transaction ajoutée.
    */
    addTransaction():void;
    /**
     * Supprime une transaction au contrôleur Thorium.
     *
     * @method removeTransaction
     * @param transactionId - L'ID de la transaction à supprimer.
     * @returns True si la transaction a été supprimée avec succès, sinon null.
    */
    removeTransaction():void;
    /**
     * Active un effet spécifique du contrôleur Thorium.
     *
     * @method useEffect
     * @param operationName - Le nom de l'effet à activer.
     * @param options - Options supplémentaires à transmettre à l'effet.
    */
    useEffect(effectName:IEffect):void;
    /**
     * Ajoute un nouvel effet au contrôleur Thorium.
     *
     * @method addEffect
     * @param effect - L'effet à ajouter, représenté par un objet contenant les propriétés `name` (nom de l'effet) et `callback` (fonction callback de l'effet).
     * @returns L'ID de l'effet ajouté.
    */
    addEffect():void;
    /**
     * Supprime un effet du contrôleur Thorium.
     *
     * @method removeEffect
     * @param effectId - L'ID de l'effet à supprimer.
     * @returns `true` si l'effet a été supprimé avec succès, sinon `false`.
    */
    removeEffect():void;
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
    getObserver(observerId:string):Observer;
    /**
     * Supprime l'observateur correspondant à l'ID spécifié.
     * 
     * @param observerId L'ID de l'observateur à supprimer.
     * @returns True si l'observateur a été supprimé avec succès ; sinon, false.
    */
    removeObserver(observerId:string):void;
    /**
     * Déclenche les rappels des observateurs en réponse à une mutation observée.
     * 
     * @param mutation La mutation observée.
    */
    delegateObservedMutation(mutation:Mutation):void;
    /**
     * Ajoute un observateur pour surveiller les modifications d'attributs d'un composant tiers.
     * @param sourceElement L'élément personnalisé ou l'élément HTML correspondant au composant tiers.
     * @param event L'événement correspondant à la modification d'attribut à observer.
     * @param callback La fonction de rappel à appeler lorsque la modification d'attribut est détectée.
     * @returns L'observateur créé pour la surveillance des modifications d'attributs.
     * @throws Une erreur si `sourceElement` n'est pas un composant Thorium valide.
    */
    addComponentObserver(sourceElement:CustomElement<Element,{},any,any> | Element , event:string , callback:(mutation:Mutation)=>void):Observer;
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
    on( attributeName:string , callback:(mutation:Mutation)=>void , sourceElement?:CustomElement<Element,{},ITransaction,IEffect> | Element ):Observer;
};

/**
 * Représente le modèle de conception d'un élément personnalisé.
 *
 * @typeparam ITransaction - Le type des transactions utilisées par l'élément personnalisé.
 * @typeparam IEffects - Le type des effets utilisés par l'élément personnalisé.
 */
export interface CustomElementPatern<ITransaction,IEffects> extends CustomElementConstructor{
    transactions:TransactionPatern<ITransaction>;
    transactions_onload:TransactionPatern<ITransaction>;
    effects:EffectPatern<IEffects>;
    connector:<T>() => (connectorTemplate?:ConnectorTemplate<T>) => NodeTemplate<T>;
}

/**
 * Enregistre un composant personnalisé dans le registre des composants.
 *
 * @param type - Le type du composant personnalisé. Peut être "page", "thorium", "local" ou "views".
 * @param patern - Le modèle de conception du composant personnalisé à enregistrer.
 * @returns Le constructeur de l'élément personnalisé enregistré.
 */
export const register = <T,X,Z>( type : 'page' | 'thorium' | 'local' | 'views' , patern:DesignPatern<T>|ViewDesignPatern<T>):CustomElementPatern<X,Z> => {

    let paternName = `${type}-${patern.baseName}`;
    
    const isUnknownElement = ():boolean => {
        // console.log(htmlTags , template.localName);
        return !(htmlTags as string[]).includes(patern.baseName);
    }

    if(!isUnknownElement() && type == 'local'){

      const constructor = (document.createElement(patern.baseName) as any).__proto__.constructor.name as string;

      if(!customElements.get(paternName))customElements.define(paternName, class extends ThoriumController(paternName,patern,window[constructor]){

        static transactions = Transactions<X>();

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

      } as CustomElementPatern<X,Z> , { extends : patern.baseName });

      return customElements.get(`${type}-${patern.baseName}`) as CustomElementPatern<X,Z>;

    }
    else{

    if(type == 'page' && !customElements.get(paternName))customElements.define(paternName , PageController<T,X,Z>(paternName,patern as ViewDesignPatern<T>,HTMLElement))
    if(type == 'views' && !customElements.get(paternName))customElements.define(paternName , ViewController<T,X,Z>(paternName,patern as ViewDesignPatern<T>,HTMLElement))
    else if(type == 'thorium' && !customElements.get(paternName))customElements.define(paternName, ThoriumController<T,X,Z>(paternName , patern , HTMLElement) )

    return customElements.get(paternName) as CustomElementPatern<X,Z>;

  }
  
}