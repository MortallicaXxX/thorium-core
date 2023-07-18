import { NodeTemplate } from "../dom/dom-render";
import { CssObject } from "../design-system/style";

export type AttributePropertie = 'id' | 'class' | 'name' | 'local-name' | 'context' | 'style' | 'stylesheet' | string;

export interface ConnectorTemplate<T>{
  /** Attributs du component */
  attr?:Record<AttributePropertie,string|CssObject>;
  /** Enfants du component */
  childrens?:NodeTemplate<any>[];
  /** Méthodes et variables du component */
  proto?:Partial<T>;
}

export * from './page';

export const Connector = <T>(localName:NodeTemplate<T>["localName"]) => {
  return (connectorTemplate?:ConnectorTemplate<T>) => {
      return {
          localName : localName,
          attr : (connectorTemplate && connectorTemplate.attr ? connectorTemplate.attr : {}),
          childrens : (connectorTemplate && connectorTemplate.childrens ? connectorTemplate.childrens : []),
          proto : (connectorTemplate && connectorTemplate.proto ? connectorTemplate.proto : {})
      };
  }
}