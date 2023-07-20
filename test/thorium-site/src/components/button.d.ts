import { CustomElement } from '../';
export interface IButtonOptionsInit {
    text: string;
    name?: string;
    class?: string;
    action?: (event: Event) => void;
}
export type TButton = CustomElement<HTMLButtonElement, {}>;
export declare const Button: (args: {
    options: IButtonOptionsInit;
}) => any;
