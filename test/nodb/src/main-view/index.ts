import { DesignSystem , Connector } from "../";
import SideLeftMenu , { StickyLeftMenu } from './components/side-left-menu';
import { FluentCard } from "../fluents-component";
import { ThoriumIcon } from '../thorium-components'

import AddIcon from "@fluentui/svg-icons/icons/add_20_filled.svg";
import ArchivesIcon from "@fluentui/svg-icons/icons/archive_20_filled.svg";

console.log({ArchivesIcon})

console.log(AddIcon);

const MainView = DesignSystem()
.register('views' , {
    baseName : 'app',
    defaultView : 'home',
    childrens : [{localName : 'slot'}],
    views : {
        'home' : {
            localName : 'div',
            attr : { name : 'home' },
            childrens : [
              SideLeftMenu({
                childrens : [
                  StickyLeftMenu({
                    childrens : [
                      FluentCard({
                        attr : { name : 'projects' },
                        childrens : [
                          ThoriumIcon({ path : AddIcon , type : 'background' })
                        ]
                      }),
                      FluentCard({
                        attr : { name : 'databases' },
                        childrens : [
                          ThoriumIcon({ path : ArchivesIcon , type : 'background' })
                        ]
                      }),
                      FluentCard({
                        attr : { name : 'databases' },
                        childrens : [
                          ThoriumIcon({ path : ArchivesIcon , type : 'background' })
                        ]
                      }),
                      FluentCard({
                        attr : { name : 'databases' },
                        childrens : [
                          ThoriumIcon({ path : ArchivesIcon , type : 'background' })
                        ]
                      }),
                      FluentCard({
                        attr : { name : 'databases' },
                        childrens : [
                          ThoriumIcon({ path : ArchivesIcon , type : 'background' })
                        ]
                      }),
                      FluentCard({
                        attr : { name : 'databases' },
                        childrens : [
                          ThoriumIcon({ path : ArchivesIcon , type : 'background' })
                        ]
                      }),
                      FluentCard({
                        attr : { name : 'databases' },
                        childrens : [
                          ThoriumIcon({ path : ArchivesIcon , type : 'background' })
                        ]
                      }),
                    ]
                  })
                ]
              }),
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
