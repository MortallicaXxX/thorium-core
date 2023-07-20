import { CustomElement, ConnectorTemplate, NodeTemplate, IViewController } from '../';
export type TMainView = CustomElement<HTMLDivElement, IViewController>;
export declare const MainView: (connectorTemplate?: ConnectorTemplate<unknown> | undefined) => NodeTemplate<unknown>;
