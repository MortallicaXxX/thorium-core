import { register , DesignPatern , CustomElementPatern , CustomElement } from './register';
import { style , createStyleSheet , getStyleSheet } from './style';

export * from './register';
export * from './style';

const DesignSystem = ( ) => {
  return {
    register,
    style,
    createStyleSheet,
    getStyleSheet
  } as {
    register:typeof register,
    style: typeof style,
    createStyleSheet: typeof createStyleSheet,
    getStyleSheet: typeof getStyleSheet
  }
}

export default DesignSystem;