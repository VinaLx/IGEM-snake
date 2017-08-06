/// <reference path="./abstract-layer.ts" />
/// <reference path="../widgets/close-button.ts" />
/// <reference path="../widgets/slides.ts" />

class StoryLayer extends AbstractLayer {
    constructor(control: LayerControl) {
        super(control, {}, true);
        this.slide = new Slides(IMG.STORY.page);
        this.Init(); // Init from super
    }
    Buttons(): MouseEventCatcher {
        this.back = new CloseButton(
            new RectBound(
                SZ.BACK_X, SZ.BACK_Y, SZ.BACK_W, SZ.BACK_H), this.control);
        this.next = new AnimatedButton(
            new RectBound(
                SZ.STORY.NEXT_X, SZ.STORY.BUTTON_Y,
                SZ.STORY.BUTTON_W, SZ.STORY.BUTTON_H),
            IMG.BIOLOGY.next, IMG.BIOLOGY.nextFocus,
            () => this.slide.Next());
        this.prev = new AnimatedButton(
            new RectBound(
                SZ.STORY.PREV_X, SZ.STORY.BUTTON_Y,
                SZ.STORY.BUTTON_W, SZ.STORY.BUTTON_H),
            IMG.BIOLOGY.prev, IMG.BIOLOGY.prevFocus,
            () => this.slide.Prev());
        return Button.Add(this.back, this.next, this.prev);
    }
    Painter(): Painter {
        return this.slide.Painter()
            .Then(Paint.PositionedImage(this.back.bound, IMG.BTN.back))
            .Then(this.PaintNextButton())
            .Then(this.PaintPrevButton());
    }

    PaintNextButton(): Painter {
        return Paint.If(
            () => this.slide.current === this.slide.images.length - 1,
            Paint.Noop(), this.next.Painter());
    }

    PaintPrevButton(): Painter {
        return Paint.If(
            () => this.slide.current === 0,
            Paint.Noop(), this.prev.Painter());
    }

    back: CloseButton<RectBound>;
    next: AnimatedButton<RectBound>;
    prev: AnimatedButton<RectBound>;

    slide: Slides;
}
