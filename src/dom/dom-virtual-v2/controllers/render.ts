import { NodeTemplate } from "../../dom-render";
import { createNodeElement } from "./createNodeElement"

export const render = <T>( template:NodeTemplate<T> , parent?:HTMLElement ) => {
  return createNodeElement( template , parent );
}