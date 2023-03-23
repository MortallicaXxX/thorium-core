export interface IEffect{
  id?:string;
  name:string;
  callback:(element:Element , options:any)=>void;
}

export interface EffectPatern{
  effects:Map<string,any>;
  set:(effect:IEffect)=>string;
  get:(effectName:string)=>void;
}

export const Effects = ():EffectPatern => {

  return new class{

    effects = new Map();

    set(effect:IEffect):string{
      let effectId = crypto.randomUUID();
      this.effects.set(effectId , { id : effectId , ...effect});
      return effectId;
    }

    get(effectName:string){
      return Array.from([...this.effects.values()] , (effect) => {
        if(effect.name == effectName)return effect.callback;
      })[0];
    }

  }

}