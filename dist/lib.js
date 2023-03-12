"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.drawText = exports.drawLine = exports.drawPoint = exports.drawRect = exports.drawFilledRect = exports.setColor = exports.open = exports.render = exports.getEvents = exports.minimize = exports.close = exports.getScreen = exports.rgb = void 0;
const node_calls_python_1 = require("node-calls-python");
function rgb(color) {
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
exports.rgb = rgb;
const screen = {
    size: { w: 240, h: 240 },
    position: { x: 0, y: 0 },
};
const pyModule = node_calls_python_1.interpreter.importSync(`${__dirname}/lib.py`);
let color = { r: 255, g: 255, b: 255 };
const getScreen = () => screen;
exports.getScreen = getScreen;
const close = () => { };
exports.close = close;
const minimize = () => { };
exports.minimize = minimize;
const getEvents = () => ({});
exports.getEvents = getEvents;
const render = () => node_calls_python_1.interpreter.callSync(pyModule, 'render');
exports.render = render;
function open(options) {
    if (options?.size) {
        screen.size = options.size;
    }
    node_calls_python_1.interpreter.callSync(pyModule, 'init_display', screen.size.w, screen.size.h);
}
exports.open = open;
function setColor(_color) {
    color = _color;
}
exports.setColor = setColor;
function drawFilledRect(rect) {
    node_calls_python_1.interpreter.callSync(pyModule, 'draw_rect', [rect.position.x, rect.position.y, rect.size.w, rect.size.h], [color.r, color.g, color.b]);
}
exports.drawFilledRect = drawFilledRect;
function drawRect(rect) {
    node_calls_python_1.interpreter.callSync(pyModule, 'draw_rect', [rect.position.x, rect.position.y, rect.size.w, rect.size.h], null, [color.r, color.g, color.b]);
}
exports.drawRect = drawRect;
function drawPoint(position) { }
exports.drawPoint = drawPoint;
function drawLine(position1, position2) { }
exports.drawLine = drawLine;
function drawText(text, position, options) {
    return { size: { w: 0, h: 0 }, position: { x: 0, y: 0 } };
}
exports.drawText = drawText;
function clear(color) { }
exports.clear = clear;
