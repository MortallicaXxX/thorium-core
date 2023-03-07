import Thorium , { Connector , DesignSystem , BuildNode } from '../../../';

const Container = Connector('thorium-container');

DesignSystem()
.register( 'thorium' , {
    baseName : 'container',
    childrens : [
        {
            localName : 'slot',
        }
    ]
} );

const AppPage = Thorium.CreatePage( 'app' , {
    attr:{},
    childrens : [
        {
            localName : 'div',
            attr:{id:'content'},
            childrens : [
                Container({
                    attr : { class : 'container' },
                    childrens : [
                        {
                            localName : 'p',
                            attr:{text : 'hello'}
                        }
                    ]
                })
            ]
        }
    ],
    proto:{}
} );

( async () => {

    Thorium.on('/' , AppPage);
    
})()
