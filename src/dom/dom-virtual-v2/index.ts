import { ConnectorTemplate } from "../../connector";
import { CustomElement } from "../../design-system";
import { domStack , IOperation } from "./virtual-dom-stack";

import { VirtualElement , IVirtualElement , ITemplateReference} from './virtual-element';
import { getElementByElementId } from "./controllers";

export * from './controllers';
export * from './virtual-element'

/** Contient le token ( référence virtuelle du body ) */
export var bodyToken = null;
export const setBodyToken = ( value:string ) => {
  bodyToken = value;
}

export const getBody = () => {
  return bodyToken ? getElementByElementId(bodyToken) : null;
}

export const DOMTokenList:TMapDomTokenList = new Map();

export const prepare_addMapElement = ( data ):IOperation => {
  return {
    command : 'addMapElement',
    data : data
  };
}

export type TMapDomTokenList = Map<string,VirtualElement>;

export const mapDOMTokenList = (target:CustomElement<Element,{}> | HTMLElement):TMapDomTokenList => {

  let mapElement = (src:CustomElement<Element,{}> | HTMLElement , parentKey?:string ) => {

    let templateReference:ITemplateReference = {
      localName : ( 'patern' in src ? (src.patern as any).localName : null),
      attr : ( 'patern' in src ? src.patern.attr : null),
      proto : ( 'patern' in src ? src.patern.proto : null),
      ref : src
    };

    let key = crypto.randomUUID();

    if(src.children.length > 0)return [{
      element : src,
      patern : templateReference,
      key,
      ...( parentKey ? { parent_key : parentKey } : {} )
    },
    ...Array.from( src.children as any , (element:CustomElement<Element,{}>) => {
        return mapElement(element , key).flat();
    } ).flat()
    ];
    else return [{
        element : src,
        patern : templateReference,
        key,
        ...( parentKey ? { parent_key : parentKey } : {} )
    }]

  };

  let mapResult = mapElement(target);
  let mapReduce = new Map(mapResult.reduce((arr , data) => {
    // let key = crypto.randomUUID();
    let key = data.key;
    arr.push( [key , new VirtualElement(data)] );
    return arr;
  } , [])) as Map<string,VirtualElement>;

  return mapReduce;

}

let result = domStack().execute([
  prepare_addMapElement( mapDOMTokenList( document.body ) )
]);

console.log({result})