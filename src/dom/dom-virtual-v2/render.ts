import { NodeTemplate } from "../dom-render";
import { createElementFromTemplate } from "./createElement"

export const render = <T>( template:NodeTemplate<T> , parent?:HTMLElement ) => {
  return createElementFromTemplate( template , parent );
}