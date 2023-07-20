import { Connector , DesignSystem , DOM , ThoriumController , PaternArea, CustomElement , DesignPatern , CustomElementPatern , ConnectorTemplate , NodeTemplate , IViewController } from '../..';
import { Button , IButtonOptionsInit } from '..';
import { Header } from '../header';
import { Footer } from '../footer';

import Style from '../main-content/style.module.css';
import background from '../main-content/background.jpeg';


export const Content = () => {

    let getStarted = ( target:HTMLElement , event:Event ) => {
        alert('Get Started');
    }

    return <content>
            <Header/>
            <div class='content-view' style = {`background-image:url(${background});`}>
                <section id='intro'>
                    <h5>ADAPTIVE UI SYSTEM, UTILITIES, & TOOLS</h5>
                    <h3>The adaptive interface system for modern web experiences</h3>
                    <div class='description'>
                        <p>Interfaces built with THORIUM adapt to your design system and can be used with any modern UI Framework by leveraging industry standard Web Components.</p>
                        <Button options = {{ text:"Get Started" }}/>
                    </div>
                </section>
                <section id='intro'>
                    <h5>ADAPTIVE UI SYSTEM, UTILITIES, & TOOLS</h5>
                    <h3>The adaptive interface system for modern web experiences</h3>
                    <div class='description'>
                        <p>Interfaces built with THORIUM adapt to your design system and can be used with any modern UI Framework by leveraging industry standard Web Components.</p>
                        <Button options = {{ text:"Get Started" }}/>
                    </div>
                </section>
                <section id='intro'>
                    <h5>ADAPTIVE UI SYSTEM, UTILITIES, & TOOLS</h5>
                    <h3>The adaptive interface system for modern web experiences</h3>
                    <div class='description'>
                        <p>Interfaces built with THORIUM adapt to your design system and can be used with any modern UI Framework by leveraging industry standard Web Components.</p>
                        <Button options = {{ text:"Get Started" }}/>
                    </div>
                </section>
                <section id='intro'>
                    <h5>ADAPTIVE UI SYSTEM, UTILITIES, & TOOLS</h5>
                    <h3>The adaptive interface system for modern web experiences</h3>
                    <div class='description'>
                        <p>Interfaces built with THORIUM adapt to your design system and can be used with any modern UI Framework by leveraging industry standard Web Components.</p>
                        <Button options = {{ text:"Get Started" }}/>
                    </div>
                </section>
            </div>
        <Footer/>
    </content>

}