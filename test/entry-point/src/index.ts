import Thorium , { Connector , DesignSystem , BuildNode } from '../../../';

const Container = Connector('thorium-container');

DesignSystem()
.register( 'thorium' , {
    baseName : 'container',
    childrens : [
        {
            localName : 'input',
            attr : { value : 'lulu' }
        }
    ]
} )

DesignSystem()
.register('page' , {
    baseName : 'app',
    attr : {},
    childrens : [
        {
            localName : 'div',
            attr:{id:'content'},
            childrens : [
                {
                    localName:'slot'
                }
            ]
        }
    ],
});

( async () => {

    document.body.appendChild(BuildNode({
        localName : 'page-app',
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
    }))

})()
