import { DOMRender } from "../dom/dom-render";
import { DesignPatern } from '../design-system';
import { Controller } from ".";

export function ThoriumController<T,X,Z>(paternName:string,patern:DesignPatern<T>,T):any{

  return class extends Controller<T,X,Z>(paternName,patern,T){}

}