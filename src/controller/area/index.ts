import DesignSystem from "../../design-system";
import { ConnectorTemplate } from "../../connector";
import { NodeTemplate } from "../../dom";

// export const ThoriumAreaPatern = DesignSystem().register('thorium' , {
//   baseName : 'area',
//   childrens : [
//     { localName : 'start' },
//     { localName : 'slot' },
//     { localName : 'end' }
//   ]
// });


export const PaternArea = (childrens?:ConnectorTemplate['childrens']):NodeTemplate => {
  return {
    localName : 'thorium-area',
    childrens : [
      { localName : 'start' },
      ...(childrens ? childrens : []),
      { localName : 'slot' },
      { localName : 'end' },
    ]
  }
}