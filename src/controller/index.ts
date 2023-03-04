export class Controller extends HTMLElement{

  constructor(){
      super()
  }
  
  /**
   * ## Context
   * ### Return the context of the element.
   * @Description La méthode context retourne le premier élément parent ayant une classe "context" et, si un nom de contexte est fourni en argument, ayant un attribut "name" correspondant à ce nom. La fonction utilise une fonction interne récursive pour chercher l'élément parent.
   * @param contextNameToFind 
   * @returns 
  */
  context(contextNameToFind?:string){

    const findUpperElementContext = (node:Controller) => {

      // if the parentNode is body, return element
      if(node.parentNode == document.body)return node;

      // if the node is a context
      if(node.classList.contains('context')){
        // if we search te context by is name, we make a comparaison between node.name and contextNameToFind
        if(contextNameToFind){
          // if the name matching, return the element
          if(node.getAttribute('name') == contextNameToFind)return node;
          // if not, try to search on upper levels
          else return findUpperElementContext(node.parentNode as Controller);
        }
        // if the context is find and the node is different that the one serached for is context, return of the node.
        else if(node != this){ return node }
        // if not, try to search on upper levels
        else return findUpperElementContext(node.parentNode as Controller)

      }
      else return findUpperElementContext(node.parentNode as Controller);

    }

    return findUpperElementContext(this)

  }

}