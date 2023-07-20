import { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate , IViewController } from '../..';
import { Button , IButtonOptionsInit } from '..';

import Style from '../rightsidebar/style.module.css';

export type TRightSideBar = CustomElement<HTMLDivElement , IViewController>;

export const RightSideBar = () => {

    return <rightsidebar class = {Style.RightSideBar}>
        <div class='header-links'>
            <ul class='links'>
                <li><a href='github'>Github</a></li>
                <li><a href='npm'>Npm</a></li>
            </ul>
        </div>
        <div class='indicators'>
            <span class='indicator'></span>
            <span class='indicator'></span>
            <span class='indicator'></span>
            <span class='indicator'></span>
            <span class='indicator'></span>
        </div>
    </rightsidebar>

}