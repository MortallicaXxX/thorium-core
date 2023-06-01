import Thorium , { Connector , DesignSystem , DOM , ThoriumController , PaternArea } from '../../../';
// import useState from '/Users/guillaume/Documents/github/Types/States/src';

import './components/app-view';
import ThoriumInput , { IThoriumInput , areHoverEffect , areaUnHoverEffect , areaSelectEffect , areaUnSelectEffect } from './components/thorium-input';

import * as ThoriumAnimation from '../../../Thorium@Animation';

// const ViewApp = DesignSystem()
// .register('views' , {
//     baseName : 'app',
//     defaultView : 'home',
//     childrens : [{localName : 'slot'}],
//     views : {
//         'home' : {
//             localName : 'div',
//             attr : { name : 'dashboard' , text : '/dashboard' }
//         }
//     }
// });

// const AppView = Connector('views-app');

/**
 * Description : Comment créer un Custom Element ?
 ```typescript
    // SANS TRANSACTION &/OU EFFECTS
    type MyElement = CustomElement<HTMLElement , {...}>
    // AVEC TRANSACTION &/OU EFFECTS
    type MyElement = CustomElement<HTMLElement , {...} , Transactions , Effects>
 ``` 
*/

( async () => {

    // const { document , body , head , useEffect } = DOM;

    let cssStyle = await DesignSystem().style( {
        div : { height : 'stretch' }
    } );
    // let cssStyleSheet = await DesignSystem().styleSheet( 'div{height:stretch}' );


    // window.onload = () => {

        // let e = DOM.render<IThoriumInput>( ThoriumInput({
        //     attr : { loading : 'false' },
        //     childrens : [
        //         { localName : 'label' , attr : { text : 'lol : ' } }
        //     ],
        //     proto : {
        //         onmousedown : (event) => {
        //             ThoriumAnimation.Magic(event.target as HTMLElement)
        //         },
        //     }
        // }));

    //     // element.afterMounting = (target) => {
    //     //     // alert('hello');
    //     // }
    
    //     // document.body.appendChild( element );
    
    //     // console.log(document.body , element);
    //     // console.log(document.body.appendChild( element ));

    //     let element = DOM.render<HTMLDivElement>({
    //         localName : 'div',
    //         attr : {
    //             stye : await DesignSystem().style( 'div{height:stretch}' )
    //         },
    //         childrens : [
    //             ThoriumInput({
    //                 attr : { loading : 'false' },
    //                 childrens : [
    //                     { localName : 'label' , attr : { text : 'lol : ' } }
    //                 ],
    //                 proto : {
    //                     onmousedown : (event) => {
    //                         ThoriumAnimation.Magic(event.target as HTMLElement)
    //                     },
    //                 }
    //             })
    //         ]
    //     })

    //     document.body.appendChild(element);

    // }

    let {token:ThoriumInputStyle} = await DesignSystem().createStyleSheet({
        '#container' : {
            position:'absolute',
            height : 'stretch',
            width : 'stretch',
            top : '0',
            left : '0',
            display : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center'
        },
        '#test' : {
            position:'absolute',
            height : 'stretch',
            width : 'stretch',
            top : '0',
            left : '0',
            display : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center'
        }
    });

    console.log({ThoriumInputStyle});

    window.onload = () => {
        DOM.render<HTMLDivElement>({
            localName : 'div',
            attr : {
                id : 'container',
            },
            childrens : [
                ThoriumInput({
                    attr : { 
                        loading : 'false',
                        // "stylesheet" : {
                        //     '#container' : {
                        //         position:'absolute',
                        //         height : 'stretch',
                        //         width : 'stretch',
                        //         top : '0',
                        //         left : '0',
                        //         display : 'flex',
                        //         'align-items' : 'center',
                        //         'justify-content' : 'center'
                        //     },
                        //     '#test' : {
                        //         position:'absolute',
                        //         height : 'stretch',
                        //         width : 'stretch',
                        //         top : '0',
                        //         left : '0',
                        //         display : 'flex',
                        //         'align-items' : 'center',
                        //         'justify-content' : 'center'
                        //     }
                        // },
                        StyleSheet : ThoriumInputStyle
                     },
                    childrens : [
                        { localName : 'label' , attr : { text : 'lol : ' } }
                    ],
                    proto : {
                        onmousedown : (event) => {
                            ThoriumAnimation.OpenDownRight(event.target as HTMLElement);
                        },
                    }
                }),
                ThoriumInput({
                    attr : { 
                        loading : 'false',
                        "stylesheet" : {
                            '#container' : {
                                position:'absolute',
                                height : 'stretch',
                                width : 'stretch',
                                top : '0',
                                left : '0',
                                display : 'flex',
                                'align-items' : 'center',
                                'justify-content' : 'center'
                            },
                            '#test' : {
                                position:'absolute',
                                height : 'stretch',
                                width : 'stretch',
                                top : '0',
                                left : '0',
                                display : 'flex',
                                'align-items' : 'center',
                                'justify-content' : 'center'
                            }
                        },
                     },
                    childrens : [
                        { localName : 'label' , attr : { text : 'lol : ' } }
                    ],
                    proto : {
                        onmousedown : (event) => {
                            ThoriumAnimation.OpenDownRight(event.target as HTMLElement);
                        },
                    }
                })
            ]
        } , document.body)
    }

    // element.onload = () => {
    //     alert('onnload')
    // }

    // console.log(element)

    

    // document.body.appendChild(element);

    // Thorium.on('/' , AppPage);

    // AppPage.Show();
    
    // document.body.appendChild( DOMRender( Container({
    //     attr : { context : 'container' },
    //     childrens : [
    //         ThoriumButton({attr : { text : 'submit' }}),
    //         LocalButton({attr : { text : 'submit' }}),
    //         { localName : 'button' , attr : { text : 'submit 2' , is : 'thorium-button' } }
    //     ],
    //     proto : {
    //         oncontextchange : (newContext:string) => {
    //             alert(`changement de context : ${newContext}`)
    //         }
    //     }
    // }) ) )

    // document.body.appendChild( DOM.render( AppView({
    //     attr : { context : 'dashboard' }
    // }) ) )

    // useEffect();

    // let {render} = DOM.virtual.body.attatch( 
    //     [
    //         AppView({
    //             attr : { context : 'dashboard' }
    //         }),
    //         AppView({
    //             attr : { context : 'user' }
    //         })
    //     ]
    // )

    // // console.log(virtualElement)

    // console.log(ViewApp)

    // render();

})()
