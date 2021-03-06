namespace IMG {
    function image(src: string): HTMLImageElement {
        const img = new Image(600, 600);
        img.src = src;
        return img;
    }
    export namespace BG {
        export const start = image("images/start/background.png");
        export const help = image("images/help/background.png");
        export const mode = image("images/mode/background.png");
    }
    export namespace STORY {
        export const page = [
            image("images/story/0.png"),
            image("images/story/1.png"),
            image("images/story/2.png"),
            image("images/story/3.png"),
            image("images/story/4.png")
        ];
        export const prev = image("images/story/prev.png");
        export const next = image("images/story/next.png");
    }
    export namespace BIOLOGY {
        export const page = [
            image("images/biology/0.png"),
            image("images/biology/1.png"),
            image("images/biology/2.png"),
            image("images/biology/3.png"),
            image("images/biology/4.png"),
            image("images/biology/5.png"),
            image("images/biology/6.png"),
            image("images/biology/7.png"),
            image("images/biology/8.png")
        ];
        export const prev = image("images/biology/prev.png");
        export const prevFocus = image("images/biology/prev-focus.png");
        export const next = image("images/biology/next.png");
        export const nextFocus = image("images/biology/next-focus.png");
    }
    export namespace BTN {
        export const start = image("images/start/play-white.png");
        export const startFocus = image("images/start/play-gray.png");
        export const help = image("images/start/help-white.png");
        export const helpFocus = image("images/start/help-gray.png");
        export const back = image("images/help/back.png");
        export const easy = image("images/mode/easy.png");
        export const easyFocus = image("images/mode/easy-focus.png");
        export const normal = image("images/mode/normal.png");
        export const normalFocus = image("images/mode/normal-focus.png");
        export const hard = image("images/mode/hard.png");
        export const hardFocus = image("images/mode/hard-focus.png");
        export const tutorial = image("images/mode/tutorial.png");
        export const tellStory = image("images/help/tell-me-story.png");
        export const tellStoryFocus = image("images/help/tell-me-story-focus.png");
        export const how2play = image("images/help/how-to-play.png");
        export const how2playFocus = image("images/help/how-to-play-focus.png");
        export const learnBio = image("images/help/synthetic-bio.png");
        export const learnBioFocus = image("images/help/synthetic-bio-focus.png");
        export const pause = image("images/game/pause.png");
        export const pauseFocus = image("images/game/pause-focus.png");
        export const restart = image("images/pause/restart.png");
        export const restartFocus = image("images/pause/restart-focus.png");
        export const mainMenu = image("images/pause/main-menu.png");
        export const mainMenuFocus = image("images/pause/main-menu-focus.png");
    }
    export namespace GAME {
        export const rockerBack = image("images/game/rocker-back.png");
        export const rockerDot = image("images/game/rocker-dot.png");
        export const acceleration = image("images/game/acceleration.png");
        export const progressBars = image("images/game/progress-bars.png");
        export const geneticCircuits = image("images/game/genetic-circuit.png");
        export const brownHead = image("images/game/brown-head.png");
        export const brownBody = image("images/game/brown-body.png");
        export const lightHead = image("images/game/light-head.png");
        export const lightBody = image("images/game/light-body.png");
    }
    export namespace FOOD {
        export const prom_r = image("images/food/prom-r.png");
        export const rbs_r = image("images/food/rbs-r.png");
        export const cds_r = image("images/food/cds-r.png");
        export const term_r = image("images/food/term-r.png");
        export const prom_g = image("images/food/prom-g.png");
        export const rbs_g = image("images/food/rbs-g.png");
        export const cds_g = image("images/food/cds-g.png");
        export const term_g = image("images/food/term-g.png");
        export const prom_y = image("images/food/prom-y.png");
        export const rbs_y = image("images/food/rbs-y.png");
        export const cds_y = image("images/food/cds-y.png");
        export const term_y = image("images/food/term-y.png");
        export const energy = image("images/food/energy.png");
    }
    export namespace PAUSE {
        export const background = image("images/pause/back.png");
        export const resume = image("images/pause/resume.png");
        export const resumeFocus = image("images/pause/resume-focus.png");
    }
    export namespace GAMEOVER {
        export const fail = image("images/gameover/fail.png");
        export const success = image("images/gameover/success.png");
        export const learn = image("images/gameover/learn.png");
        export const learnFocus = image("images/gameover/learn-focus.png");
        export const share = image("images/gameover/share.png");
        export const shareFocus = image("images/gameover/share-focus.png")
    }
    export namespace TUTORIAL {
        export const start = image("images/tutorial/start.png");
        export const move = image("images/tutorial/move.png");
        export const energy = image("images/tutorial/energy.png");
        export const energyPost = image("images/tutorial/energy-post.png");
        export const energyPost2 = image("images/tutorial/energy-post-2.png");
        export const geneticCircuits = image("images/tutorial/genetic-circuits.png");
        export const geneticCircuits2 = image("images/tutorial/genetic-circuits-2.png");
        export const red = image("images/tutorial/red.png");
        export const redPost = image("images/tutorial/red-post.png");
        export const green = image("images/tutorial/green.png");
        export const greenPost = image("images/tutorial/green-post.png");
        export const yellow = image("images/tutorial/yellow.png");
        export const yellowPost = image("images/tutorial/yellow-post.png");
        export const end = image("images/tutorial/end.png");
        export const tap = image("images/tutorial/tap.png");
    }
}
