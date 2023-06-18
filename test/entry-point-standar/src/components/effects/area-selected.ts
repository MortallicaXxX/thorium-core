export const AreaSelected = {
  name : 'area-selected',
  callback : (element) => {
    element.classList.add('select');
    element.setAttribute('area-selected' , 'true');
  }
}