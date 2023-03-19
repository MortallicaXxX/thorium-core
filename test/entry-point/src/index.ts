import Thorium , { Connector , DesignSystem , DOM , ThoriumController } from '../../../';
import useState from '/Users/guillaume/Documents/github/Types/States/src';

// type t = ['test', 'test2'];
// const array:t = ['test', 'test2'];
// type X = typeof array[number];
// // Erreur: Type '"lol"' is not assignable to type '"test" | "test2"'
// const z: X = 'test2';

// type UnionFromArray<T extends string[]> = T[number];

// const array:string[] = ['test', 'test2'];
// type X = UnionFromArray<typeof array>;
// let z: X = 'test'; // OK
// let y: X = 'lol'; // Erreur: Type '"lol"' is not assignable to type '"test" | "test2"'

DesignSystem()
.register('views' , {
    baseName : 'app',
    defaultView : 'dashboard',
    childrens : [{localName : 'slot'}],
    views : {
        'dashboard' : {
            localName : 'div',
            attr : { name : 'dashboard' , text : '/dashboard' }
        },
        'user' : {
            localName : 'div',
            attr : { name : 'user' , text : '/user' }
        },
        'test' : {
            localName : 'div',
            attr : { name : 'user' , text : '/test' }
        }
    }
})

const AppView = Connector('views-app');

// DesignSystem()
// .register( 'thorium' , {
//     baseName : 'container',
//     // attr : { text : 'hello' },
//     childrens : [
//         { localName : 'input' , attr : { text : inputState.value  } , proto : {
//             onchange(e){
//                 console.log(this.value);
//                 setInputValue(this.value);
//                 console.log(inputState.value)
//             }
//         }},
//         { localName : 'p' , attr : { name : "text" , text : inputState.value } },
//         { localName : 'button' , attr : { text : 'ajouer le state' } , proto : {
//             onmousedown( event ){
//                 const text = this.parentNode.children['text'];
//                 let shadow = this.parentNode;

//                 eventId = addEvent( shadow.host , ( value ) => {
//                     text.innerHTML = value;
//                 } )

//             }
//         } },
//         { localName : 'button' , attr : { text : 'supprimer state' } , proto : {
//             onmousedown( event ){
//                 inputState.removeMutationListener(eventId);
//                 eventId = "";
//             }
//         } },
//         { localName : 'slot' }
//     ],
//     proto : {
//         onmutation(mutation){
//             console.log('mutation :',mutation);
//         },
//         prompt( ){ alert('prompt container'); }
//     }
// } );

const Container = Connector('thorium-container');

DesignSystem()
.register('thorium' , { baseName : 'button' , proto : {
    onunmount(){ alert('unmount') },
    onmousedown(){ alert('Je suis un bouton thorium') }
}});

const ThoriumButton = Connector('thorium-button');

DesignSystem()
.register('local' , { baseName : 'button' , proto : {
    onunmount(){ alert('i will be unmount') },
    onmousedown(){ alert('Je suis un bouton local'); }
}});

const LocalButton = Connector('local-button');


// const AppPage = Thorium.CreatePage( 'app' , {
//     attr:{},
//     childrens : [
//         {
//             localName : 'div',
//             attr:{id:'content'},
//             childrens : [
//                 // Container({
//                 //     attr : { class : 'container' },
//                 //     childrens : [
//                 //         {
//                 //             localName : 'p',
//                 //             attr:{text : 'hello'}
//                 //         }
//                 //     ]
//                 // })
//             ]
//         }
//     ],
//     proto:{}
// } );

( async () => {

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

    // document.body.appendChild( DOMRender( AppView({
    //     attr : { context : 'dashboard' }
    // }) ) )

    let virtualElement = DOM.virtual.body.attatch( 
        [
            AppView({
                attr : { context : 'dashboard' }
            }),
            AppView({
                attr : { context : 'user' }
            })
        ]
    )

    console.log(virtualElement)

    // render();

})()
