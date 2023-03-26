import { ConnectorTemplate } from "../../../../../";
export declare const IconPatern: import("../../../../../dist/design-system/register").CustomElementPatern;
export interface IconInitOptions extends ConnectorTemplate {
    path: string;
    type: 'mask' | 'background';
}
declare const _default: (options: IconInitOptions) => {
    localName: string;
    attr: Record<string, string>;
    childrens: import("../../../../../").NodeTemplate[];
    proto: Record<string, any>;
};
export default _default;
