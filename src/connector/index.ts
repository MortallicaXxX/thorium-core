import { NodeTemplate } from "../node-builder";

export interface ConnectorTemplate{
  /** component's attributes */
  attr?:Record<string,string>;
  /** component's childrens */
  childrens?:NodeTemplate[];
  /** component's prototypes methods and variables */
  proto?:Record<string,any>;
}

export const Connector = (localName:NodeTemplate["localName"]) => {
  return (connectorTemplate?:ConnectorTemplate) => {
      return {
          localName : localName,
          attr : (connectorTemplate.attr ? connectorTemplate.attr : {}),
          childrens : (connectorTemplate.childrens ? connectorTemplate.childrens : []),
          proto : (connectorTemplate.proto ? connectorTemplate.proto : {})
      };
  }
}