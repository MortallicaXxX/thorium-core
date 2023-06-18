import Thorium , { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement } from '../../../dist';
// import useState from '/Users/guillaume/Documents/github/Types/States/src';

import './components/app-view';
import ThoriumInput , { IThoriumInput , areHoverEffect , areaUnHoverEffect , areaSelectEffect , areaUnSelectEffect } from './components/thorium-input';

import * as ThoriumAnimation from '../../../Thorium@Animation/src';

import Style from './tile.style.module.css';

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

export interface ITile {

}
export type TTile = CustomElement<HTMLElement , ITile>

export let Tile = (options:{name:string}) => {

    return <div 
        class = {Style.Tile}
        name = {options.name}
        _setTime = {(target:TTile , time:Date) => {

            let nbr1 = target.children['nbr1'] as HTMLSpanElement;
            let nbr2 = target.children['nbr2'] as HTMLSpanElement;

            time = new Date(time);

            let hours = time.getHours();
            let minutes = time.getMinutes();
            let secondes = time.getSeconds();

            if(options.name == 'heures'){

                let [timeNbr1 , timeNbr2] = String(hours).padStart(1,'0').split('');

                if(timeNbr1 && nbr1.getAttribute('value') != timeNbr1){
                    ThoriumAnimation.RotateDown( nbr1 );
                    nbr1.setAttribute('value' , timeNbr1);
                    nbr1.innerText = timeNbr1;
                }
                if(timeNbr2 && nbr2.getAttribute('value') != timeNbr2){
                    ThoriumAnimation.RotateDown( nbr2 );
                    nbr2.setAttribute('value' , timeNbr2);
                    nbr2.innerText = timeNbr2;
                }

            }
            if(options.name == 'minutes'){

                let [timeNbr1 , timeNbr2] = String(minutes).padStart(1,'0').split('');

                if(timeNbr1 && nbr1.getAttribute('value') != timeNbr1){
                    ThoriumAnimation.RotateDown( nbr1 );
                    nbr1.setAttribute('value' , timeNbr1);
                    nbr1.innerText = timeNbr1;
                }
                if(timeNbr2 && nbr2.getAttribute('value') != timeNbr2){
                    ThoriumAnimation.RotateDown( nbr2 );
                    nbr2.setAttribute('value' , timeNbr2);
                    nbr2.innerText = timeNbr2;
                }

            }
            if(options.name == 'secondes'){

                let [timeNbr1 , timeNbr2] = String(secondes).padStart(1,'0').split('');

                if(timeNbr1 && nbr1.getAttribute('value') != timeNbr1){
                    ThoriumAnimation.RotateDown( nbr1 );
                    nbr1.setAttribute('value' , timeNbr1);
                    nbr1.innerText = timeNbr1;
                }
                if(timeNbr2 && nbr2.getAttribute('value') != timeNbr2){
                    ThoriumAnimation.RotateDown( nbr2 );
                    nbr2.setAttribute('value' , timeNbr2);
                    nbr2.innerText = timeNbr2;
                }

            }
        }}
    >
        <span
            name = {"nbr1"}
            value = {0}
            text = {'0'}
        />
        <span
            name = {"nbr2"}
            value = {0}
            text = {'0'}
            _onmutation = {(mutation) => {
                console.log(mutation)
            }}
        />
    </div>
}

export interface IClock{
    updateTime : (target:TClock , time:number) => void
}

export type TClock = CustomElement<HTMLElement , IClock>;

export let Clock = () => {

    let clokId = crypto.randomUUID();

    setInterval(() => {
        let clock = document.getElementById(clokId) as TClock;
        if(clock)clock.updateTime( clock , Date.now())
    } , 1000)

    return <div
        id = {clokId}
        class = {Style.Clock}
        _updateTime = {(target:TClock , time:number) => {
            let heures = target.children['heures'];
            let minutes = target.children['minutes'];
            let secondes = target.children['secondes'];
            heures.setTime( heures , time );
            minutes.setTime( minutes , time );
            secondes.setTime( secondes , time );
        }}
    >
        <Tile name={"heures"}/>
        <Tile name={"minutes"}/>
        <Tile name={"secondes"}/>
    </div>;

}

( async () => {

    // const { document , body , head , useEffect } = DOM;

    let cssStyle = await DesignSystem().style( {
        div : { height : 'stretch' }
    } );

    let {token:ContainerStyle} = await DesignSystem().createStyleSheet({
        '#container' : {
            position:'absolute',
            height : 'stretch',
            width : 'stretch',
            top : '0',
            left : '0',
            display : 'flex',
            'align-items' : 'center',
            'justify-content' : 'center'
        }
    })

    let {token:InputStyle} = await DesignSystem().createStyleSheet({
        'thorium-input' : {
            background : 'lightblue'
        }
    });

    // let element = <div><p>hello world !</p></div>;

    // console.warn(element);

    console.log(ThoriumInput);

    // let patern = <patern
    //     type = {"thorium"}
    //     baseName = {"input"}
    //     observedAttibutes = {["loading"]}
    //     childrens = {[]}
    //     __getter__ = {[]}
    //     ___setter__ = {[]}
    //     __transactions__ = {[]}
    //     __initTransation__ = {[]}
    //     __effects__ = {[]}
    // />
    console.log({ clock : <div class={Style.ClockContainer}><Clock/></div> })
    // let element = DOM.render( <Clock/> , document.body );

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

    // console.log(DOM);

    let Message = (options:{message}) => {
        return <p test={"test"}>options.message</p>;
    }

    // let x = <div _onmousedown = {() => {
    //     alert('ici');
    // }}><Message message={'test'}/></div>;
    // console.log(x);
    // DOM.render( x , document.body );

    let element = DOM.render( <div class={Style.ClockContainer}>
        <Clock/>
    </div> , document.body );

    console.log(element);

    // console.log(element , <Clock/>);

})()
