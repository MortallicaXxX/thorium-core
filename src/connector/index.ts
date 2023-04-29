import { NodeTemplate } from "../dom/dom-render";

export interface ConnectorTemplate<T>{
  /** component's attributes */
  attr?:Record<string,string>;
  /** component's childrens */
  childrens?:NodeTemplate<any>[];
  /** component's prototypes methods and variables */
  proto?:Partial<T>;
}

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