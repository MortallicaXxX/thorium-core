import { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate , IViewController } from '../..';
import { Button , IButtonOptionsInit } from '..';

import Style from '../leftsidebar/style.module.css';
import thorium_logo from '../leftsidebar/thorium.png';

export type TLeftSideBar = CustomElement<HTMLDivElement , IViewController>;

export const LeftSideBar = () => {

    return <leftsidebar class = {`${Style.LeftSideBar}`}>
        <div class='banner' style = {`background-image:url(${thorium_logo});`}>
        </div>
    </leftsidebar>

}