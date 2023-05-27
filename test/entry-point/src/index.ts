import Thorium , { Connector , DesignSystem , DOM , ThoriumController , PaternArea } from '../../../';
import useState from '/Users/guillaume/Documents/github/Types/States/src';

import './components/app-view';
import ThoriumInput , { IThoriumInput , areHoverEffect , areaUnHoverEffect , areaSelectEffect , areaUnSelectEffect } from './components/thorium-input';

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

( () => {

    // const { document , body , head , useEffect } = DOM;

    window.onload = () => {

        let element = DOM.render<IThoriumInput>( ThoriumInput({
            attr : { loading : 'false' },
            childrens : [
                { localName : 'label' , attr : { text : 'lol : ' } }
            ]
        }));

        element.afterMounting = (target) => {
            // alert('hello');
        }
    
        document.body.appendChild( element );
    
        console.log(document.body , element);
        console.log(document.body.appendChild( element ));

    }

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
