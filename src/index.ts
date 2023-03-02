import RouteRecognizer from 'route-recognizer';
// import 'redefine-custom-elements';

import { Connector , ConnectorTemplate } from './connector';
import DesignSystem from './design-system';
import { Controller } from './controller';

export {
    DesignSystem,
    Connector,
    ConnectorTemplate
};

export interface NodeTemplate extends ConnectorTemplate{
    /** local name of the component */
    localName:string;
    /** extends from existing component */
    extends?:string;
    attr?:Record<string,string>;
    childrens?:NodeTemplate[];
    proto?:Record<string,any>;
}

/** Allow to generate element with a template */
export const BuildNode = (template:NodeTemplate) => {

    const element = document.createElement(template.localName);

    if(template.attr)Array.from( Object.keys(template.attr) , (attributeName) => {
        if(attributeName == 'text')element.innerText = template.attr[attributeName];
        else element.setAttribute(attributeName , (template.attr as Record<string,any>)[attributeName]);
    })

    if(template.childrens)Array.from( template.childrens , (childTemplate) => {
        element.appendChild(BuildNode(childTemplate));
    })

    if(template.proto)Array.from( Object.keys(template.proto) , (protoKey) => {
        element[protoKey] = (template.proto as Record<string,any>)[protoKey];
    })

    return element;

}

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

}

export default {Thorium};