/// LOCAL IMPORTS
import Thorium , { Connector , DesignSystem , DOM , ThoriumController , PaternArea } from '../../../';
import useState from '/Users/guillaume/Documents/github/Types/States/src';
/// MODULES IMPORTS
import { provideFluentDesignSystem , allComponents } from '@fluentui/web-components';
/// 
import MainView from './app';

export const AppPage = Thorium.CreatePage('app');

let connector = AppPage.connector();

  // export const PageConnector = testPage.Connector({});

import './style.css';

export {
  useState,
  Thorium,
  Connector,
  DesignSystem,
  DOM,
  ThoriumController,
  PaternArea
}

(async () => {

  AppPage.effects.set({
    name : 'simple-notification',
    callback : (target,options) => {

      target.appendChild(DOM.render( {
        localName : 'dialog',
        attr : { style : `position:absolute;height:100%;width:100%;left:0;top:0;z-index:1000;pointer-events: none;display: grid;background:transparent;border: none;` },
        childrens : [
          {
            localName : 'dialog-container',
            attr : { style : 'height:min-content;width:min-content;padding:20px;align-items:center;justify-content:center;background:white;margin:auto;border:1px solid dimgray;' },
            childrens : [
              {
                localName : 'h1',
                attr : { text : 'Simple Notification' , style : 'padding:0;width:0;height:fit-content;width:fit-content;'}
              }
            ]
          }
        ]
      } ))

    }
  })

  await provideFluentDesignSystem().register(allComponents);

  // AppPage.Show();

  console.log({Thorium})

  // const testPage = Thorium.CreatePage('test' , {
  //   childrens : [MainView()]
  // });

  // testPage.Show();

  // const { body , render } = DOM;

  // await provideFluentDesignSystem().register(allComponents);
  // // console.log(render( MainView() ));

  document.body.appendChild( DOM.render( connector({
    childrens : [MainView({
      attr : { context : 'home' }
    })]
  }) ) )

  // DOM.useEffect();

})()