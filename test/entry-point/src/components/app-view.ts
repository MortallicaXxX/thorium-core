import Thorium , { Connector , DesignSystem , DOM , ThoriumController } from '../../../../';
import useState from '/Users/guillaume/Documents/github/Types/States/src';

// import { alertTransaction } from '../transactions/alert-transaction';
// import { hoverTransaction } from '../transactions/hover-transaction';
// import { backgroundTransaction } from '../transactions/background-transaction';

import { init } from '../transactions/init';
import { buttonTransaction } from '../transactions/button-transaction';

import { addUser } from '../effects/add-user';
import { removeUser } from '../effects/remove-user';

const ViewApp = DesignSystem()
.register('views' , {
    baseName : 'app',
    // defaultView : 'dashboard',
    childrens : [{localName : 'slot'}],
    // views : {
    //     'dashboard' : {
    //         localName : 'div',
    //         attr : { name : 'dashboard' , text : '/dashboard' }
    //     },
    //     'user' : {
    //         localName : 'div',
    //         attr : { name : 'user' , text : '/user' }
    //     },
    //     'test' : {
    //         localName : 'div',
    //         attr : { name : 'user' , text : '/test' }
    //     }
    // }
    // 'view-element' : {

    // }
})

// ViewApp.transactions.add(alertTransaction);
// ViewApp.transactions.add(hoverTransaction);
// ViewApp.transactions.add(backgroundTransaction);

ViewApp.transactions.add(init);
ViewApp.transactions.add(buttonTransaction);

ViewApp.effects.set(addUser);
ViewApp.effects.set(removeUser);
// ViewApp.effects.set(removeUser);

export {ViewApp}
