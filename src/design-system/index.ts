import { register , DesignPatern , CustomElementPatern , CustomElement } from './register';

export { 
  DesignPatern,
  CustomElementPatern,
  CustomElement
};

const DesignSystem = ( ) => {
  return {
    register
  } as {
    register:typeof register
  }
}

export default DesignSystem;