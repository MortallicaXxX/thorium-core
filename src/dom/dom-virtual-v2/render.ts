import { NodeTemplate } from "../dom-render";
import { createElement } from "./createElement"

export const render = <T>( template:NodeTemplate<T> , parent?:HTMLElement ) => {
  return createElement( template , parent );
}