import { DesignSystem , ConnectorTemplate } from "../../../../../";

// Transactions
import { iconSetUp } from "./transactions/set-up";
// Effects
import { setIcon } from "./effects/set-icon";
import { setType } from "./effects/set-type";

export const IconPatern = DesignSystem().register('thorium' , {
  baseName : 'icon',
  childrens : [
    { localName : 'start' },
    { localName : 'slot' },
    { localName : 'end' }
  ]
})

IconPatern.transactions.set(iconSetUp);

IconPatern.effects.set(setIcon);
IconPatern.effects.set(setType);

export interface IconInitOptions extends ConnectorTemplate{
  path : string,
  type : 'mask' | 'background'
}

export default (options:IconInitOptions) => {
  let connector = IconPatern.connector();
  return connector({
    attr : {
      ['icon-type'] : options.type,
      style : `--icon-path:url(${options.path});`
    }
  });
};