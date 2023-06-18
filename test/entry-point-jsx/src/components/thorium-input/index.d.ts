import { CustomElement } from '../../../../../dist';
export type IThoriumInput = CustomElement<HTMLInputElement, {
    'child-area': CustomElement<Element, {}>;
    'child-start': CustomElement<Element, {}>;
    'child-slot': CustomElement<HTMLSlotElement, {}>;
    'child-input': CustomElement<HTMLInputElement, {}>;
    'child-end': CustomElement<Element, {}>;
    value: string;
}, IThoriumInputTransactions, IThoriumInputEffects>;
export type IThoriumInputTransactions = 'init-input-transaction';
export type IThoriumInputEffects = 'area-hovered' | 'area-selected' | 'area-unhovered' | 'area-unselected' | 'magic';
/** Transaction pour mettre en place l'initialisation de l'input  */
export declare const InitInputTransaction: string;
/** Effect qui ajoute l'attribut area-hovered et la class hover */
export declare const areHoverEffect: string;
/** Effect qui retire l'attribut area-hovered et la class hover */
export declare const areaUnHoverEffect: string;
/** Effect qui ajoute l'attribut area-selected et la class select */
export declare const areaSelectEffect: string;
/** Effect qui retire l'attribut area-selected et la class select */
export declare const areaUnSelectEffect: string;
declare const _default: (connectorTemplate?: import("../../../../../dist").ConnectorTemplate<IThoriumInput> | undefined) => import("../../../../../dist").NodeTemplate<IThoriumInput>;
export default _default;
