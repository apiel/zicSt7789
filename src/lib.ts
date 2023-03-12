import { interpreter as py } from 'node-calls-python';

// TODO move this to a common interface
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

export function rgb(color: string): Color {
    const rgb = color
        .replace(/#/, '')
        .match(/.{1,2}/g)
        ?.map((x) => parseInt(x, 16));
    if (!rgb) {
        throw new Error(`Invalid color: ${color}. Must be in the format #RRGGBB`);
    }
    const [r, g, b] = rgb;
    return { r, g, b };
}

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

const screen: Screen = {
    size: { w: 240, h: 240 },
    position: { x: 0, y: 0 },
};

const pyModule = py.importSync(`${__dirname}/lib.py`);
let color: Color = { r: 255, g: 255, b: 255 };

export const getScreen = () => screen;
export const close = () => {};
export const minimize = () => {};
export const getEvents: () => Events = () => ({});

export const render = () => py.callSync(pyModule, 'render');

export function open(options?: ScreenOptions) {
    if (options?.size) {
        screen.size = options.size;
    }
    py.callSync(pyModule, 'init_display', screen.size.w, screen.size.h);
}

export function setColor(_color: Color) {
    color = _color;
}

export function drawFilledRect(rect: Rect) {
    py.callSync(
        pyModule,
        'draw_rect',
        [rect.position.x, rect.position.y, rect.size.w, rect.size.h],
        [color.r, color.g, color.b],
    );
}

export function drawRect(rect: Rect) {
    py.callSync(
        pyModule,
        'draw_rect',
        [rect.position.x, rect.position.y, rect.size.w, rect.size.h],
        null,
        [color.r, color.g, color.b],
    );
}

export function drawPoint(position: Point) {}

export function drawLine(position1: Point, position2: Point) {
    py.callSync(
        pyModule,
        'draw_line',
        [position1.x, position1.y, position2.x, position2.y],
        [color.r, color.g, color.b],
    );
}

export function drawText(text: string, position: Point, options?: TextOptions): TextReturn {
    return { size: { w: 0, h: 0 }, position: { x: 0, y: 0 } };
}
export function clear(color?: Color) {}
