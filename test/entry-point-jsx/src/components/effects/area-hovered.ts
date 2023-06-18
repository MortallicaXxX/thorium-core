export const AreaHovered = {
  name : 'area-hovered',
  callback : (element) => {
    element.classList.add('hover');
    element.setAttribute('area-hovered' , 'true');
  }
}