import { DOM } from '../';
import { Button } from '../components/button';
import { MainView } from '../views/view-components';

import style from './app.module.css';
import background from './background.jpeg';




export const App = () => {

    return <app class = {`app-content ${style.App}`}>
        <MainView/>
    </app>;

}