/// <reference path="./abstract-layer.ts" />

class PauseLayer extends AbstractLayer {
    constructor(restart: () => void, game: GameLayer, control: LayerControl) {
        super(control, {}, true);
        this.restartCallback = restart;
        this.Init();
        this.game = game;
        this.control = control;
    }
    Painter(): Painter {
        return Paint.Picture(
            IMG.PAUSE.background, SZ.PAUSE.BACKGROUND_X, SZ.PAUSE.BACKGROUND_Y,
            SZ.PAUSE.BACKGROUND_W, SZ.PAUSE.BACKGROUND_H)
            .Then(this.resume.Painter())
            .Then(this.restart.Painter())
            .Then(this.mainMenu.Painter());
    }
    Buttons(): MouseEventDispatcher {
        this.resume = new AnimatedButton(
            new RectBound(
                SZ.PAUSE.BUTTON_X, SZ.PAUSE.RESUME_Y,
                SZ.PAUSE.BUTTON_W, SZ.PAUSE.BUTTON_H),
            IMG.PAUSE.resume, IMG.PAUSE.resumeFocus, () => this.Resume());
        this.restart = new AnimatedButton(
            new RectBound(
                SZ.PAUSE.BUTTON_X, SZ.PAUSE.RESTART_Y,
                SZ.PAUSE.BUTTON_W, SZ.PAUSE.BUTTON_H),
            IMG.PAUSE.restart, IMG.PAUSE.restartFocus, () => this.Restart());
        this.mainMenu = new AnimatedButton(
            new RectBound(
                SZ.PAUSE.BUTTON_X, SZ.PAUSE.MAINMENU_Y,
                SZ.PAUSE.BUTTON_W, SZ.PAUSE.BUTTON_H),
            IMG.PAUSE.mainMenu, IMG.PAUSE.mainMenuFocus, () => this.MainMenu());
        return Button.Add(this.resume, this.restart, this.mainMenu);
    }
    Resume(): void {
        this.control.PopLayer();
        this.game.Start();
    }
    Restart(): void {
        this.control.PopLayer(); // itself
        this.control.PopLayer(); // the game
        this.restartCallback();
    }
    MainMenu(): void {
        for (; this.control.LayerSize() !== 1;) {
            this.control.PopLayer();
        }
    }
    game: GameLayer;
    resume: AnimatedButton<RectBound>;
    restart: AnimatedButton<RectBound>;
    mainMenu: AnimatedButton<RectBound>;
    restartCallback: () => void;
}