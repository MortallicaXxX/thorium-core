/**
 * Représente un effet utilisé par un élément personnalisé.
 *
 * @property id - L'ID de l'effet.
 * @property name - Le nom de l'effet, qui doit correspondre au type `IEffects`.
 * @property callback - Le callback exécuté lors de l'application de l'effet. Il reçoit un élément de type `Element` et des options supplémentaires.
 */
export interface IEffect{
  /** id - ID de l'effet */
  id?:string;
  /** name - Le nom de l'effet, qui doit correspondre au type `IEffects` */
  name:string;
  /** callback - Le callback exécuté lors de l'application de l'effet. Il reçoit un élément de type `Element` et des options supplémentaires */
  callback:(element:Element , options:any)=>void;
}

/**
 * Représente un modèle de patrons d'effets utilisés par un élément personnalisé.
 *
 * @property effects - Un `Map` associant les noms d'effets (`Z`) à leurs définitions.
 * @method set - Ajoute un nouvel effet au modèle en utilisant un objet de type `IEffect`. Retourne l'ID de l'effet ajouté.
 * @method get - Récupère le callback associé à un effet à partir de son nom (`effectName`).
 */
export interface EffectPatern<Z>{
  /** effects - Un `Map` associant les noms d'effets (`Z`) à leurs définitions */
  effects:Map<Z,any>;
  /** Ajoute un nouvel effet au modèle en utilisant un objet de type `IEffect`. Retourne l'ID de l'effet ajouté */
  set:(effect:IEffect)=>string;
  /** Récupère le callback associé à un effet à partir de son nom (`effectName`) */
  get:(effectName:string)=>void;
}

/**
 * Fonction permettant de créer un modèle de gestion des effets utilisés par un élément personnalisé.
 *
 * @template Z - Le type de nom d'effet.
 * @returns Un objet contenant les méthodes pour gérer les effets.
 */
export const Effects = <Z>():EffectPatern<Z> => {

  return new class{

    effects = new Map();

    /**
     * Ajoute un nouvel effet à la collection d'effets.
     * 
     * @method set
     * @param {IEffect} effect - L'effet à ajouter.
     * @returns {string} L'identifiant unique de l'effet ajouté.
    */
    set(effect:IEffect):string{
      let effectId = crypto.randomUUID();
      this.effects.set(effectId , { id : effectId , ...effect});
      return effectId;
    }

    /**
     * Récupère la fonction de rappel associée à un effet à partir de son nom.
     * 
     * @method get
     * @param {string} effectName - Le nom de l'effet à récupérer.
     * @returns {Function} La fonction de rappel associée à l'effet, ou undefined si l'effet n'est pas trouvé.
    */
    get(effectName:string){
      return Array.from([...this.effects.values()] , (effect) => {
        if(effect.name == effectName)return effect.callback;
      })[0];
    }

  }

}