export const setType = {
  name : 'set-type',
  callback : (target,options:[string]) => {
    let [type] = options;
    target.setAttribute('icon-type' , type);
  }
}