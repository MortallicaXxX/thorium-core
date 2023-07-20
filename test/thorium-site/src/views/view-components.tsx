import { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate , IViewController } from '../';

import Style from './style.view.component.css';
import { 
    LeftSideBar,
    RightSideBar,
    Content,
    Header
} from '../components';

export type TMainView = CustomElement<HTMLDivElement , IViewController>;

const ViewPatern = DesignSystem()
.register('views' , {
    baseName: 'main',
    defaultView: 'components',
    views: {
        'components': <div class='content'>
            <LeftSideBar/>
            <Content/>
            <RightSideBar/>
        </div>,
        'documentation': <div class='content'>
            <LeftSideBar/>
            <Header/>
            <RightSideBar/>
        </div>,
        'community': <div class='content'>
            <LeftSideBar/>
            <Header/>
            <RightSideBar/>
        </div>,
    }
});

export const MainView = ViewPatern.connector();

