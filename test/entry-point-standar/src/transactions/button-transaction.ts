export const buttonTransaction = {
  name : 'button-transaction',
  template : {
    proto : {
      onmousedown(event){
        let { button } = event;
        if(button == 0)(this as any).useEffect('add-user');
        else if(button == 2)(this as any).useEffect('remove-user');
      }
    }
  }
}