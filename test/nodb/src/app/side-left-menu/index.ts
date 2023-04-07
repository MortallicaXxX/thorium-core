import { DesignSystem , PaternArea } from "../..";

import StickyLeftMenuSticky from '../side-left-menu-sticky';
export { StickyLeftMenuSticky };

import { FluentCard } from "../../fluents-component";
import { ThoriumIcon } from "../../thorium-components";

import AddIcon from "@fluentui/svg-icons/icons/add_20_filled.svg";
import ArchivesIcon from "@fluentui/svg-icons/icons/archive_20_filled.svg";

const SideLeftMenu = DesignSystem().register('thorium' , {
  baseName : 'left-menu',
  childrens : [PaternArea()]
}) 

export const SideLeftMenuStickyConnector = SideLeftMenu.connector();

export default () => {
  return SideLeftMenuStickyConnector({
    childrens : [
      StickyLeftMenuSticky({
        childrens : [
          {
            localName : 'div',
            attr : { class : 'container' },
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
          }
        ]
      })
    ]
  })
}