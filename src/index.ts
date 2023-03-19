import RouteRecognizer from 'route-recognizer';
// import 'redefine-custom-elements';

import { Connector , ConnectorTemplate } from './connector';
import DesignSystem from './design-system';
// import { DOMRender , NodeTemplate } from './dom/dom-render';
import { DOM , NodeTemplate } from './dom';
import { ThoriumController } from './controller';

// export declare var DOMwindow: Window ; // vous pouvez spécifier le type de votre variable ici
// export declare var DOMdocument: Document // vous pouvez spécifier le type de votre variable ici

// DOMwindow = ( window ? window : (new JSDOM()).dom );
// DOMdocument = DOMwindow.document;

export {
    DesignSystem,
    Connector,
    ConnectorTemplate,
    ThoriumController,
    DOM,
    NodeTemplate
};

export class Page{

    #_component:any;

    constructor(component){
        this.#_component = component;
    }

    /**
     * Rendering process
     */
    #_render(){

    }

    /**
     * Build the page
     */
    show(){this.#_render();}

}

interface Route{
    path:string;
    component:any;
}

export class PageHandler extends RouteRecognizer{

    #_pages:Map<string,any> = new Map();
    /**
     * Define the endpoint of the page
     * @param pageOption 
     * @returns 
     */
    set(pageOption:Route):Page{
        // Ajout de la page au répertoir
        this.#_pages.set(pageOption.path , new Page(pageOption.component));
        // Ajout du path dans le gestionaire + ajout d'un point de lancement
        this.add([{path : pageOption.path , handler :  () => {
            console.log('Page Launched');
        } }])
        // Return la page
        return this.#_pages.get(pageOption.path);
    }
}

namespace Thorium{

    // Distribue un routeur
    export const router = () => {return RouteRecognizer};
    // Routeur gérant les pages
    export const pages:PageHandler = new PageHandler();

    export const on = (pathname:string , page) => {
        Thorium.pages.add([{ path : pathname , handler : () => {
            page.Show();
        } }])
    }

    export const CreatePage = ( baseName , connectorTemplate:ConnectorTemplate ) => {

        DesignSystem()
        .register('page' , {
            baseName : baseName,
            childrens : [{localName : 'slot'}]
        });

        return {
            Connector : Connector(`page-${baseName}`),
            Show(){ document.body.appendChild(DOM.render(this.Connector(connectorTemplate))) }
        }

    }

}

export default Thorium;