import { DesignSystem , Connector , PaternArea } from "..";
import SideLeftMenu from './side-left-menu';
import { HomeView } from "./home";
import { FluentCard } from "../fluents-component";
import { ThoriumIcon } from '../thorium-components';

import AddIcon from "@fluentui/svg-icons/icons/add_20_filled.svg";
import ArchivesIcon from "@fluentui/svg-icons/icons/archive_20_filled.svg";

const MainView = DesignSystem()
.register('views' , {
    baseName : 'app',
    defaultView : 'home',
    childrens : [PaternArea()],
    views : {
        'home' : {
            localName : 'div',
            attr : { name : 'home' },
            childrens : [
              SideLeftMenu(),
              HomeView()
            ]
        }
    },
    proto : {
      beforeMounting(){
        alert('beforeMounting')
      },
      afterMounting(){
        alert('afterMounting')
      }
    }
});

export default (() => { return Connector('views-app') })()
