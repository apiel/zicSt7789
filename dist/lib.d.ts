export interface Events {
    exit?: boolean;
    keysDown?: number[];
    keysUp?: number[];
}
export interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}
export interface Point {
    x: number;
    y: number;
}
export interface Size {
    w: number;
    h: number;
}
export interface Rect {
    position: Point;
    size: Size;
}
export interface TextOptions {
    color?: Color;
    size?: number;
    font?: string;
}
export declare function rgb(color: string): Color;
export interface Screen {
    size: Size;
    position: Point;
}
export interface ScreenOptions {
    size?: Size;
    position?: Point;
}
export interface TextReturn {
    size: Size;
    position: Point;
}
export declare const getScreen: () => Screen;
export declare const close: () => void;
export declare const minimize: () => void;
export declare const getEvents: () => Events;
export declare const render: () => unknown;
export declare function open(options?: ScreenOptions): void;
export declare function setColor(_color: Color): void;
export declare function drawFilledRect(rect: Rect): void;
export declare function drawRect(rect: Rect): void;
export declare function drawPoint(position: Point): void;
export declare function drawLine(position1: Point, position2: Point): void;
export declare function drawText(text: string, position: Point, options?: TextOptions): TextReturn;
export declare function clear(color?: Color): void;
//# sourceMappingURL=lib.d.ts.map