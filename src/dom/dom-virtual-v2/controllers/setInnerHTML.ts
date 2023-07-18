import { VirtualElement } from "../virtual-element";
import { removeElement } from "./removeElement";
import { htmlToNodeTemplate } from '../html-transform';
import { createNodeElement } from "./createNodeElement";

/** Définit le contenu HTML d'un élément virtuel */
export const setInnerHTML = (ve: VirtualElement, html: string) => {

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, "text/html");
  let content = parsedDocument.body.children[0] as HTMLElement;

  // netoyage des enfants
  ve.childrens.forEach( (childVeElement) => {
    removeElement( childVeElement );
  });

  if(content){
    let _nodeTemplate = htmlToNodeTemplate(content);
    createNodeElement( _nodeTemplate , ve.element );
  }
  else ve.element.innerHTML = html;

}