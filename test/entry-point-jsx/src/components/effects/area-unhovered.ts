export const AreaUnHovered = {
  name : 'area-unhovered',
  callback : (element) => {
    element.classList.remove('hover');
    element.setAttribute('area-hovered' , 'false');
  }
}