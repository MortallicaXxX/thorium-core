import Thorium , { Connector , DesignSystem , DOM , ThoriumController } from '../../../../../dist';

import { InitInput } from './transactions/input-transaction';
import { AreaHovered } from '../effects/area-hovered';
import { AreaUnHovered } from '../effects/area-unhovered';
import { AreaSelected } from '../effects/area-selected';
import { AreaUnSelected } from '../effects/area-unselected';

const ThoriumInput = DesignSystem()
.register('thorium' , {
    baseName : 'input',
    childrens : [
        {
            localName : 'area',
            childrens : [
                { localName : 'start' },
                { localName : 'slot' },
                { localName : 'input' },
                { localName : 'end' }
            ],
            proto : {
                onmouseenter(){ this.root.useEffect('area-hovered'); },
                onmouseleave(){ this.root.useEffect('area-unhovered'); },
                onmousedown(){ this.root.useEffect('area-selected'); },
                onmouseup(){ this.root.useEffect('area-unselected'); }
            }
        }
    ],
    // Ajout de getters au component
    __getter__ : {
        ['child-area'] : function(){ return this.shadowRoot.children[0] },
        ['child-start'] : function(){ return this['child-area'].children[0] },
        ['child-slot'] : function(){ return this['child-area'].children[1] },
        ['child-input'] : function(){ return this['child-area'].children[2] },
        ['child-end'] : function(){ return this['child-area'].children[3] },
        value : function(){return this['child-input'].value},
    },
    // Ajout de setters au component
    __setter__ : {
        value : function(value){ this['child-input'].value = value }
    }
})

/** Transaction pour mettre en place l'initialisation de l'input  */
export const InitInputTransaction = ThoriumInput.transactions.set(InitInput);

/** Effect qui ajoute l'attribut area-hovered et la class hover */
export const areHoverEffect = ThoriumInput.effects.set(AreaHovered);
/** Effect qui retire l'attribut area-hovered et la class hover */
export const areaUnHoverEffect = ThoriumInput.effects.set(AreaUnHovered);
/** Effect qui ajoute l'attribut area-selected et la class select */
export const areaSelectEffect = ThoriumInput.effects.set(AreaSelected);
/** Effect qui retire l'attribut area-selected et la class select */
export const areaUnSelectEffect = ThoriumInput.effects.set(AreaUnSelected);

export default (() => {return ThoriumInput.connector()})();