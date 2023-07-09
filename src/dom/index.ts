import { DOMRender , NodeTemplate } from "./dom-render";
import { DOMVirtual , htmlDocument as document , body , head , applyDOMChanges } from "./dom-virtual";

export * from "./dom-render";
export * from "./dom-virtual";
export * as VDOM from "./dom-virtual-v2";

/**
 * # DOM
 */
export const DOM = {
  /**
   * La fonction `render` permet de rendre un `NodeTemplate` dans le DOM réel.
   * @function render
   * @memberof DOM
   * @param {NodeTemplate} template - Le template à rendre.
  */
  render : DOMRender,
  /**
   * La classe `virtual` permet de créer et manipuler un DOM virtuel.
   * @class virtual
   * @memberof DOM
  */
  virtual : DOMVirtual,
  /**
   * L'élément `document` représente l'élément racine du DOM virtuel.
   * @member document
   * @memberof DOM
   * @type {HTMLElement}
  */
  document,
  /**
    * L'élément `head` représente la balise `<head>` du DOM virtuel.
    * @member head
    * @memberof DOM
    * @type {HTMLElement}
  */
  head,
  /**
   * L'élément `body` représente la balise `<body>` du DOM virtuel.
   * @member body
   * @memberof DOM
   * @type {HTMLElement}
  */
  body,
  /**
   * Applique les changements du DOM virtuel au DOM réel.
   *
   * Cette fonction est utilisée pour synchroniser le DOM virtuel avec le DOM réel en appliquant les modifications nécessaires.
   * Elle permet de rendre le contenu du DOM virtuel visible dans le navigateur en mettant à jour le DOM réel avec les changements correspondants.
   *
   * @param callback - La fonction de rappel contenant les modifications du DOM virtuel à appliquer.
  */
  applyDOMChanges
};

