import { CustomElement } from '../../../dist';
import './components/app-view';
/**
 * Description : Comment créer un Custom Element ?
 ```typescript
    // SANS TRANSACTION &/OU EFFECTS
    type MyElement = CustomElement<HTMLElement , {...}>
    // AVEC TRANSACTION &/OU EFFECTS
    type MyElement = CustomElement<HTMLElement , {...} , Transactions , Effects>
 ```
*/
export interface ITile {
}
export type TTile = CustomElement<HTMLElement, ITile>;
export declare let Tile: (options: {
    name: string;
}) => any;
export interface IClock {
    updateTime: (target: TClock, time: number) => void;
}
export type TClock = CustomElement<HTMLElement, IClock>;
export declare let Clock: () => any;
