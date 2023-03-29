import { DOMRender } from "../dom/dom-render";
import { DesignPatern } from '../design-system';
import { Controller } from ".";

export function ThoriumController(paternName:string,patern:DesignPatern,T):any{

  return class extends Controller(paternName,patern,T){}

}