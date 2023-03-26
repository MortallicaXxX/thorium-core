export const setIcon = {
  name : 'set-icon',
  callback : (target , options:[string]) => {
    let [path] = options;
    target.setAttribute('style' , `--icon-path:url(${path})`);
  }
}