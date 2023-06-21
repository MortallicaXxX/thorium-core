import Thorium , { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate } from '../../../dist';


const Patern = (options:DesignPatern<any> & {type:'page' | 'thorium' | 'local' | 'views'}):[CustomElementPatern<any, any>,(template:ConnectorTemplate<any>) => NodeTemplate<any>] => {
    let patern = DesignSystem().register( options.type , options );
    return [patern , patern.connector()]
}

export const [inputPatern , Input] = <Patern
    type = {"thorium"}
    baseName = {"input"}
    observedAttibutes={['loading']}
    attr = {{ 'loading' : 'false' }}
    childrens = {[
        <start></start>,
        <slot></slot>,
        <input></input>,
        <end></end>
    ]}
    __getter__ = {{}}
    __setter__ = {{}}
/>;

// (() => {

//     let [inputPatern , Input] = <Patern
//         type = {"thorium"}
//         baseName = {"input"}
//         observedAttibutes={['loading']}
//         attr = {{ 'loading' : 'false' }}
//         childrens = {[
//             <start></start>,
//             <slot></slot>,
//             <input></input>,
//             <end></end>
//         ]}
//         __getter__ = {{}}
//         __setter__ = {{}}
//     />;

//     DOM.render(<div>
//         <Input class = {'my-class'} />
//     </div> , document.body );

// })()

