import { DOMTokenList } from '..';

export const getElementByElementId = (elementId:string) => {
  return ( DOMTokenList.has(elementId) ? DOMTokenList.get(elementId) : null );
}