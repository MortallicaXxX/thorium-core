/// LOCAL IMPORTS
import Thorium , { Connector , DesignSystem , DOM , ThoriumController } from '../../../';
import useState from '/Users/guillaume/Documents/github/Types/States/src';
/// MODULES IMPORTS
import { provideFluentDesignSystem , allComponents } from '@fluentui/web-components';
/// 
import MainView from './main-view';

import './style.css';

export {
  useState,
  Thorium,
  Connector,
  DesignSystem,
  DOM,
  ThoriumController
}

(async () => {

  const { body , render } = DOM;

  await provideFluentDesignSystem().register(allComponents);
  // console.log(render( MainView() ));

  document.body.appendChild( render( MainView() ) )
  // DOM.useEffect();

})()