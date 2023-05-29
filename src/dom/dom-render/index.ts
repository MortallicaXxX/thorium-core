import { body } from "../dom-virtual";
import { ConnectorTemplate , CustomElement , DesignPatern , Mutation , Observer , Observers , ElementController , DesignSystem , CssObject } from "../../";

/**
 * Représente la structure d'un nœud dans un template DOM.
 * Il étend `ConnectorTemplate` pour inclure des informations spécifiques au DOM.
 *
 * @template T - Type de l'élément DOM représenté par le nœud du template.
*/
export interface NodeTemplate<T> extends ConnectorTemplate<T>{
  /** Nom local du composant */
  localName:string;
  /** Étend un composant existant */
  extends?:string;
}

/**
 * Permet de générer un élément à partir d'un template DOM.
 *
 * Cette fonction prend un objet `template` représentant la structure du nœud DOM à générer.
 * Elle crée un nouvel élément DOM correspondant à la structure spécifiée dans le template.
 * La fonction renvoie l'élément nouvellement créé.
 *
 * @param template - Le template représentant la structure du nœud DOM à générer.
 * @returns L'élément DOM généré à partir du template.
*/
export const DOMRender = <T>(template:NodeTemplate<T> , parentNode:Element|ShadowRoot):T => {

  // Vérifie si le template est local
  let isLocal = (template && template.localName && template.localName.includes('local-') ? true : false);
  
  // Crée un nouvel élément DOM en fonction du template
  const element = (() => {
    if(!isLocal)return document.createElement( template.localName );
    else {
      let tag = template.localName.split('local-').filter((x) => x).join('');
      return document.createElement( tag , { is : template.localName } );
    }
  })() as CustomElement<HTMLElement,{}>

  parentNode.appendChild(element);

  element.patern = template;
  Object.assign( element , ElementController(element as any) )

  // Parcours les enfants du template et les ajoute à l'élément parent
  if(template.childrens)Array.from( template.childrens , (childTemplate) => {
      let e = DOMRender<HTMLElement>(childTemplate , element);

      // // Design pattern avec la méthode `connectedCallback`
      // if('connectedCallback' in e)element.appendChild(e);
      // // Autre cas sans design pattern
      // else {
      //   // Appel à la méthode `beforeMounting` du prototype si elle existe
      //   (childTemplate.proto && childTemplate.proto.beforeMounting ? childTemplate.proto.beforeMounting(e) : null);
      //   element.appendChild(e);
      //   // Appel à la méthode `afterMounting` du prototype si elle existe
      //   (childTemplate.proto && childTemplate.proto.afterMounting ? childTemplate.proto.afterMounting(e) : null);
      // }
  })

  // Implémente les variables et méthodes au nouvel élément DOM
  if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
      element[protoKey] = (template.proto as Record<string,any>)[protoKey];
  })

  // Applique les attributs au nouvel élément DOM
  if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
    if(attributeName == 'text')element.innerText = template.attr[attributeName] as string;
    else if(attributeName == 'stylesheet'){
      let context = element.context<HTMLDivElement>();
      // if(!context.isStyleSheetAttached)context.attachStyleSheet();
      let styleSheet = context.styleSheet();
      let styleSheetObject = template.attr[attributeName];

      DesignSystem().style( styleSheetObject as CssObject )
      .then((result) => {
        let {nodes} = result.root;
        Array.from( nodes as any[] , (rule) => {
          console.log(rule)
          let {selector , source , nodes} = rule;
          styleSheet.add(selector , Object.fromEntries(new Map(Array.from( nodes as any[] , (declaration) => {
            return [declaration.prop , declaration.value]
          }))))
        } )
      })

    }
    else element.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
  })

  return element as CustomElement<T,any>;

}