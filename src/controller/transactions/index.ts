import { NodeTemplate } from "../../dom";

export interface NodeTransaction extends Partial<NodeTemplate>{
  attr?:Record<string,string>;
  childrens?:NodeTemplate[];
  proto?:Record<string,any>;
}

export interface ITransaction{
  id?:string;
  name:string;
  template:NodeTransaction;
}

export interface TransactionPatern{
  transactions:Map<string,any>;
  transactions_onload:Map<string,any>;
  set:(transaction:ITransaction)=>string;
  add:(transaction:ITransaction)=>string;
  get:(transactionId:string)=>void;
}

export const Transactions = ():TransactionPatern => {

  return new class {
    transactions = new Map();
    transactions_onload = new Map();
    set(transaction:ITransaction):string{
      let transactionId = crypto.randomUUID();
      this.transactions_onload.set( transactionId , { id : transactionId , ...transaction} );
      this.transactions.set( transactionId , { id : transactionId , ...transaction} );
      return transactionId;
    }
    add(transaction:ITransaction){
      let transactionId = crypto.randomUUID();
      this.transactions.set( transactionId , { id : transactionId , ...transaction} );
      return transactionId;
    }
    get(transactionName:string){
      
    }
  }

}