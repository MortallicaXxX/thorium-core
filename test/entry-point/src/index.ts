import Thorium , { Controller , DesignSystem , Hook } from '../../../';

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

    // customElements.define('app-page', App);

    // document.body.appendChild(document.createElement('app-page'));

    document.body.appendChild(Hook({
        localName : 'page-app',
        childrens : [
            {
                localName : 'thorium-container',
                childrens : [
                    {
                        localName : 'p',
                        attr:{text : 'hello'}
                    }
                ]
            }
        ]
    }))

})()
