import Thorium , { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement } from '../../../dist';
// import useState from '/Users/guillaume/Documents/github/Types/States/src';

import './components/app-view';
import ThoriumInput , { IThoriumInput , areHoverEffect , areaUnHoverEffect , areaSelectEffect , areaUnSelectEffect } from './components/thorium-input';

import * as ThoriumAnimation from '../../../Thorium@Animation/src';

import Style from './tile.style.module.css';

/** Tile interface */
export interface ITile {

}

/** Tile custom element type */
export type TTile = CustomElement<HTMLElement , ITile>

export let Tile = (options:{name:string}):TTile => {

    let setTileTime = (target:TTile , time:Date) => {

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
    }

    return <div 
        class = {Style.Tile}
        name = {options.name}
        _setTime = {setTileTime}>
            <span name = {"nbr1"} value = {0} text = {'0'}/>
            <span name = {"nbr2"} value = {0} text = {'0'}/>
    </div>
}

/** Clock interface */
export interface IClock{
    updateTime : (target:TClock , time:number) => void
}

/** Clock custom element type */
export type TClock = CustomElement<HTMLElement , IClock>;

export let Clock = ():TClock => {

    let clokId = crypto.randomUUID();

    setInterval(() => {
        let clock = document.getElementById(clokId) as TClock;
        if(clock)clock.updateTime( clock , Date.now())
    } , 1000)

    let updateTime = (target:TClock , time:number) => {
        let heures = target.children['heures'];
        let minutes = target.children['minutes'];
        let secondes = target.children['secondes'];
        heures.setTime( heures , time );
        minutes.setTime( minutes , time );
        secondes.setTime( secondes , time );
    }

    return <div
        id = {clokId}
        class = {Style.Clock}
        _updateTime = {updateTime}>
            <Tile name={"heures"}/>
            <Tile name={"minutes"}/>
            <Tile name={"secondes"}/>
    </div>;

}

( async () => {

    let element = DOM.render<HTMLDivElement>( <div class={Style.ClockContainer}>
        <Clock/>
    </div> , document.body );

    console.log(element);

})()
