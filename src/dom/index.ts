import { DOMRender , NodeTemplate } from "./dom-render";
import { DOMVirtual , htmlDocument as document , body , head , useEffect } from "./dom-virtual";

export * from "./dom-render";
export * from "./dom-virtual";

/**
 * # DOM
 */
export const DOM = {
  render : DOMRender,
  virtual : DOMVirtual,
  document,
  head,
  body,
  useEffect
};

