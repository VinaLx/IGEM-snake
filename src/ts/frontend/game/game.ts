/// <reference path="./game-control/game-status.ts" />
/// <reference path="./game-control/layer-control.ts" />
/// <reference path="./game-control/layer.ts" />
/// <reference path="./layers/start-layer.ts" />

class Game {
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = Game.OrientCanvasSize(canvas);
        this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
        this.gameStatus = new GameStatus();
        this.DispatchAllEvents();
        this.layers = []
        this.layerControl = new LayerControlImpl(this.layers, this.gameStatus);
        this.layerControl.PushLayer(new StartLayer(this.layerControl));
    }
    private DrawAll(time: number): void {
        // draw layers from bottom to top
        this.Painter().Paint(this.context, time);
    }
    private Painter(): Painter {
        let p = Paint.Noop();
        for (const layer of this.layers) {
            p = p.Then(layer.painter);
        }
        return p.Scale(this.canvas.width, this.canvas.width);
    }
    static OrientCanvasSize(canvas: HTMLCanvasElement): HTMLCanvasElement {
        const wh = window.innerHeight, ww = window.innerWidth, wh_ww = wh / ww;
        let h = wh, w = ww;
        // canvas.height = wh * 2;
        // canvas.width = ww * 2;
        const h_w = SZ.HEIGHT_FACTOR / SZ.WIDTH_FACTOR;
        if (h_w > wh_ww) {
            w = wh / h_w
            // canvas.width = wh / h_w;
        } else {
            h = ww * h_w
            // canvas.height = ww * h_w;
        }
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        canvas.width = w * 2;
        canvas.height = h * 2;
        return canvas;
    }

    private Translate(x: number, y: number): Vector {
        const result = new Vector(
            (x - this.canvas.offsetLeft) / this.canvas.width * 2,
            (y - this.canvas.offsetTop) / this.canvas.width * 2);
        return result;
    }

    // dispatch all events to layer(s)
    private DispatchAllEvents(): void {
        // TODO
        this.DispatchTouchEvent();
        this.DispathMouseEvent();
        this.DispatchKeyboardEvent();
        window.onresize = e =>
            this.canvas = Game.OrientCanvasSize(this.canvas);
    }
    private DispatchTouchEvent(): void {
        const forEachTouch = (touches: TouchList, f: (t: Touch) => void) => {
            for (let i = 0; i < touches.length; ++i) {
                f(touches[i]);
            }
        }
        this.canvas.ontouchmove = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e.touches, t =>
                this.TopLayer().eventDispatcher.MouseMove(
                    this.Translate(t.clientX, t.clientY)))
        };
        this.canvas.ontouchstart = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e.touches, t =>
                this.TopLayer().eventDispatcher.MouseDown(
                    this.Translate(t.clientX, t.clientY)))
        };
        this.canvas.ontouchcancel = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e.changedTouches, t =>
                this.TopLayer().eventDispatcher.MouseUp(
                    this.Translate(t.clientX, t.clientY)))
        }
        this.canvas.ontouchend = (e: TouchEvent) => {
            e.preventDefault();
            forEachTouch(e.changedTouches, t =>
                this.TopLayer().eventDispatcher.MouseUp(
                    this.Translate(t.clientX, t.clientY)))
        }
    }
    private DispathMouseEvent(): void {
        this.canvas.onmousemove = (e: MouseEvent) => {
            // triggered only when holding hthe primary button
            if (!(e.buttons & 1)) return;
            this.TopLayer().eventDispatcher.MouseMove(
                this.Translate(e.clientX, e.clientY));
        }
        this.canvas.onmousedown = (e: MouseEvent) => {
            this.TopLayer().eventDispatcher.MouseDown(
                this.Translate(e.clientX, e.clientY));
        }
        this.canvas.onmouseup = (e: MouseEvent) => {
            this.TopLayer().eventDispatcher.MouseUp(
                this.Translate(e.clientX, e.clientY));
        }
    }
    private DispatchKeyboardEvent(): void {
        window.onkeydown = (e: KeyboardEvent) => {
            this.TopLayer().eventDispatcher.KeyDown(e.key);
        }
        window.onkeypress = (e: KeyboardEvent) => {
            this.TopLayer().eventDispatcher.KeyPress(e.key);
        }
        window.onkeyup = (e: KeyboardEvent) => {
            this.TopLayer().eventDispatcher.KeyUp(e.key);
        }
    }

    private TopLayer(): Layer {
        return this.layers[this.layers.length - 1];
    }

    public Start(): void {
        const callback = (time: number) => {
            this.DrawAll(time);
            window.requestAnimationFrame(callback);
        }
        window.requestAnimationFrame(callback);
        // TODO
    }

    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    layers: Layer[];
    gameStatus: GameStatus;
    layerControl: LayerControl;
}

$(function () {
    const canvas = <HTMLCanvasElement>$("#canvas")[0];
    const game = new Game(canvas);
    game.Start();
})