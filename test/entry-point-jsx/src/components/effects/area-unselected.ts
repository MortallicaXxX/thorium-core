export const AreaUnSelected = {
  name : 'area-unselected',
  callback : (element) => {
    element.classList.remove('select');
    element.setAttribute('area-selected' , 'false');
  }
}