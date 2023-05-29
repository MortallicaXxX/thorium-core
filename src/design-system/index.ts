import { register , DesignPatern , CustomElementPatern , CustomElement } from './register';
import { style } from './style';

export * from './register';
export * from './style';

const DesignSystem = ( ) => {
  return {
    register,
    style
  } as {
    register:typeof register,
    style: typeof style
  }
}

export default DesignSystem;