import Thorium , { Connector , DesignSystem , DOM , ThoriumController } from '../../../';
import useState from '/Users/guillaume/Documents/github/Types/States/src';

import './components/app-view';
import ThoriumInput , { areHoverEffect , areaUnHoverEffect , areaSelectEffect , areaUnSelectEffect } from './components/thorium-input';

const AppView = Connector('views-app');

const ViewApp = DesignSystem()
.register('views' , {
    baseName : 'app',
    defaultView : 'home',
    childrens : [{localName : 'slot'}],
    views : {
        'home' : {
            localName : 'div',
            attr : { name : 'dashboard' , text : '/dashboard' }
        }
    }
});

( async () => {

    const { document , body , head , useEffect } = DOM;

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

    // body.appendChild( DOM.render( ThoriumInput({
    //     childrens : [
    //         { localName : 'label' , attr : { text : 'lol : ' } }
    //     ]
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
