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


export const PaternArea = (patern?:ConnectorTemplate):NodeTemplate => {
  return {
    localName : 'thorium-area',
    attr : (patern && patern.attr ? patern.attr : {}),
    childrens : [
      { localName : 'start' },
      ...(patern && patern.childrens ? patern.childrens : []),
      { localName : 'slot' },
      { localName : 'end' },
    ]
  }
}