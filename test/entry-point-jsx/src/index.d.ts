import { CustomElement } from '../../../dist';
import './components/app-view';
/** Tile interface */
export interface ITile {
}
/** Tile custom element type */
export type TTile = CustomElement<HTMLElement, ITile>;
export declare let Tile: (options: {
    name: string;
}) => TTile;
/** Clock interface */
export interface IClock {
    updateTime: (target: TClock, time: number) => void;
}
/** Clock custom element type */
export type TClock = CustomElement<HTMLElement, IClock>;
export declare let Clock: () => TClock;
