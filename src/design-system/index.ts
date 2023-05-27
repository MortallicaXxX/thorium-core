import { register , DesignPatern , CustomElementPatern , CustomElement } from './register';

export * from './register';

const DesignSystem = ( ) => {
  return {
    register
  } as {
    register:typeof register
  }
}

export default DesignSystem;