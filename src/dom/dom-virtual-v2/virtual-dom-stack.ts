import { DOMTokenList , TMapDomTokenList } from ".";

export type TCommandAddMapElement = 'addMapElement';
export type TCommandAddElement = 'addElement';

export type TCommands = 
  TCommandAddMapElement | 
  TCommandAddElement;

export interface IOperation{
  command : TCommands;
  data : any;
}

export interface IAddMapElementOperation extends IOperation{
  command : TCommandAddMapElement;
  data : TMapDomTokenList;
}

function addReferenceElement () {
  
}

function addMapReferenceElement ( referenceElements:TMapDomTokenList ) {

  [...referenceElements.values()].map( ( reference ) => {
    DOMTokenList.set( reference.key , reference );
  } )

}

const stack = new class{
  
  #_addReferenceElement = addReferenceElement.bind(this);
  #_addMapReferenceElement = addMapReferenceElement.bind(this);

  execute = (operations:IOperation[]) => {
    
    return operations.reduce((arr:any , operation:any) => {

      let { command , data} = operation;

      // if(command == 'addElement')return this.#_addReferenceElement(data);
      if(command == 'addMapElement')return this.#_addMapReferenceElement(data);

      return arr;
    } , [])

  }

}

export const domStack = () => {
  return stack;
}



