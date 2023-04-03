import { ChildProcess } from "child_process";
import { DesignSystem , PaternArea } from "../../../..";

// import MultipleArchiveIcon from '@fluentui/svg-icons/icons/archive_multiple_20_filled.svg'

const StickyLeftMenu = DesignSystem().register('thorium' , {
  baseName : 'sticky-menu',
  childrens : [PaternArea()]
})

export default StickyLeftMenu.connector();