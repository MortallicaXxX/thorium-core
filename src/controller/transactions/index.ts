import { NodeTemplate } from "../../dom";

/**
  * Modèle de transaction utilisé pour configurer les propriétés d'un élément personnalisé.
  * 
  * @property {Record<string, string>} [attr] - Les attributs de l'élément personnalisé.
  * @property {NodeTemplate<any>[]} [childrens] - Les enfants de l'élément personnalisé.
  * @property {Record<string, any>} [proto] - Les variables et méthodes à implémenter à l'élément personnalisé.
*/
export interface NodeTransaction extends Partial<NodeTemplate<any>>{
  attr?:Record<string,string>;
  childrens?:NodeTemplate<any>[];
  proto?:Record<string,any>;
}

/**
 * Représente une transaction qui applique un modèle de template à un élément personnalisé.
 * 
 * @property {string} [id] - L'identifiant de la transaction.
 * @property {string} name - Le nom de la transaction.
 * @property {NodeTransaction} template - Le modèle de transaction qui configure les propriétés de l'élément personnalisé.
*/
export interface ITransaction{
  id?:string;
  name:string;
  template:NodeTransaction;
}

/**
 * Représente un patron de transactions pour gérer les transactions d'éléments personnalisés.
 * 
 * @property {Map<T, any>} transactions - Une map contenant les transactions enregistrées, indexées par une clé de type générique T.
 * @property {Map<T, any>} transactions_onload - Une map contenant les transactions à exécuter lors de la génération de l'élément personnalisé. Ces transactions sont également stockées dans `transactions` et seront accessibles durant le runtime.
 * @property {(transaction: ITransaction) => string} set - Ajoute une nouvelle transaction à la map des transactions et retourne son identifiant unique.
 * @property {(transaction: ITransaction) => string} add - Ajoute une nouvelle transaction à la map des transactions et retourne son identifiant unique.
 * @property {(transactionId: string) => void} get - Récupère une transaction à partir de son identifiant.
*/
export interface TransactionPatern<T>{
  transactions:Map<T,any>;
  transactions_onload:Map<string,any>;
  set:(transaction:ITransaction)=>string;
  add:(transaction:ITransaction)=>string;
  get:(transactionId:string)=>void;
}

/**
 * Fonction utilitaire pour créer une instance de TransactionPatern avec des transactions spécifiques de type générique X.
 * 
 * @function Transactions
 * @template X - Type générique pour les noms de transactions
 * @returns {TransactionPatern<X>} Une instance de TransactionPatern avec des transactions spécifiques de type X.
 */
export const Transactions = <X>():TransactionPatern<X> => {

  return new class {
    transactions = new Map();
    transactions_onload = new Map();
    /**
     * Ajoute une nouvelle transaction à la fois dans les transactions normales et les transactions à exécuter lors de la génération de l'élément personnalisé.
     * 
     * @method set
     * @param {ITransaction} transaction - La transaction à ajouter.
     * @returns {string} L'identifiant unique de la transaction ajoutée.
     */
    set(transaction:ITransaction):string{
      let transactionId = crypto.randomUUID();
      this.transactions_onload.set( transactionId , { id : transactionId , ...transaction} );
      this.transactions.set( transactionId , { id : transactionId , ...transaction} );
      return transactionId;
    }
    /**
     * Ajoute une nouvelle transaction uniquement dans les transactions normales.
     * 
     * @method add
     * @param {ITransaction} transaction - La transaction à ajouter.
     * @returns {string} L'identifiant unique de la transaction ajoutée.
     */
    add(transaction:ITransaction){
      let transactionId = crypto.randomUUID();
      this.transactions.set( transactionId , { id : transactionId , ...transaction} );
      return transactionId;
    }
    /**
     * Récupère une transaction à partir de son identifiant.
     * 
     * @method get
     * @param {string} transactionId - L'identifiant de la transaction à récupérer.
     */
    get(transactionName:string){
      
    }
  }

}