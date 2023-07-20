import { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate , IViewController } from '../..';
import { Button , TButton , IButtonOptionsInit } from '..';
import { TMainView } from '../../views/view-components'

export type THeader = CustomElement<HTMLDivElement , {}>;

export const Header = () => {

    return <nav>
        <div class='header-title'>
        <Button options = {{ text : 'Components' , action : ( event) => {
            let target = event.target as TButton;
            let context = target.context() as TMainView;
            context.setContext( 'components' );
        } }}  />
        <Button options = {{ text : 'Documentation' , action : ( event ) => {
            let target = event.target as TButton;
            let context = target.context() as TMainView;
            context.setContext( 'documentation' );
        } }} />
        <Button options = {{ text : 'Community' , action : ( event ) => {
            let target = event.target as TButton;
            let context = target.context() as TMainView;
            context.setContext( 'community' );
        } }} />
        </div>
    </nav>

}