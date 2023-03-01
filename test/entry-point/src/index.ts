import Thorium , { Connector , DesignSystem , Hook } from '../../../';

const Container = Connector({ localName : 'thorium-container' , attr : { class : 'container' }});

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

    document.body.appendChild(Hook({
        localName : 'page-app',
        childrens : [
            Container({
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
