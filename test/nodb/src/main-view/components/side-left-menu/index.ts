import { DesignSystem } from "../../../";

import StickyLeftMenu from './components/side-left-sticky-menu';
export { StickyLeftMenu };

import { FluentCard } from "../../../fluents-component";
import { Icon } from "thorium-toolkit-ui";

const SideLeftMenu = DesignSystem().register('thorium' , {
  baseName : 'left-menu',
  childrens : [
    { localName : 'slot' }
  ]
}) 

export default SideLeftMenu.connector();