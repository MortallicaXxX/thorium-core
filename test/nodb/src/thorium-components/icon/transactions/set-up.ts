export const iconSetUp = {
  name : 'icon-set-up',
  template : {
    proto : {
      setIcon : function(iconPath:string){
        this.useEffect('set-icon' , iconPath);
      },
      setType : function(icontype:string){
        this.useEffect('set-type' , icontype);
      }
    }
  }
}