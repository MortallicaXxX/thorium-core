import Thorium , { Connector , DesignSystem , DOM , ThoriumController , CustomElement, PaternArea } from '../../../../../dist';

const ThoriumInput = DesignSystem()
.register('thorium' , {
    baseName : 'input',
    observedAttibutes : ['loading'],
    childrens : [PaternArea({ childrens : [] })],
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