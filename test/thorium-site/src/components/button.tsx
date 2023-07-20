import { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , IViewController , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate } from '../';

import Style from './style.module.css';

export interface IButtonOptionsInit{
    text:string;
    name?:string;
    class?:string;
    action?:(event:Event) => void;
}

export type TButton = CustomElement<HTMLButtonElement , {}>;

export const Button = (args:{options:IButtonOptionsInit}) => {

    console.log(args);

    let { options } = args;

    return <div>
        <button
        class={options.class}
        style={Style}
        _onmousedown = {options.action}
        text={ options.text} />
    </div>
};