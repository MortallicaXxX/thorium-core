import Thorium , { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate } from '../../../dist';
export * from '../../../dist';

import { App } from './app';
import './index.css';

(() => {

    DOM.render(<root>
        <App/>
    </root> , document.body );

})()

