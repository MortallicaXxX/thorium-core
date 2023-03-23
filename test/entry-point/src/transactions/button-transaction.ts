export const buttonTransaction = {
  name : 'button-transaction',
  template : {
    proto : {
      onmousedown(event){
        let { button } = event;
        if(button == 0)this.useEffect('add-user');
        else if(button == 2)this.useEffect('remove-user');
      }
    }
  }
}