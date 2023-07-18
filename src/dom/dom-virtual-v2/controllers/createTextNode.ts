import { createElement } from "./createElement";

/** Crée un nouveau nœud de texte virtuel avec le contenu spécifié */
export const createTextNode = (text: string) => {
  let ve = createElement( 'p' );
  ve.setProperty( 'textContent' , text );
  return ve;
}