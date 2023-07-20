import { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate , IViewController } from '../..';
import { Button , IButtonOptionsInit } from '..';

export type TFooter = CustomElement<HTMLDivElement , IViewController>;


export const Footer = () => {

    return <footer>
        <div class='footer-title'>
            <ul class='titles'>
                <li><a href='Components'>Licence</a></li>
                <li><a href='Documentation'>Privacy & Policy</a></li>
                <li><a href='Community'>Terms of use</a></li>
                <li><a href='Community'>Trademarks</a></li>
                <li><a href='Community'>©Odysee</a></li>
            </ul>
        </div>
    </footer>

}