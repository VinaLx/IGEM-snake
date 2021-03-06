/// <reference path="../../util/bound.ts" />
/// <reference path="../parameters.ts" />
/// <reference path="../images.ts" />
/// <reference path="./progress-bar.ts" />
/// <reference path="../../util/enum.ts" />

namespace food {
    export enum Color {
        RED = 0,     // acceleration
        GREEN = 1,   // vision
        YELLOW = 2   // score
    }
    export enum Part {
        PROM = 0,  // the angled arrow
        RBS = 1,   // the semi-circle
        CDS = 2,   // the polygon
        TERM = 3   // the T shaped
    }
    export function GetPart(
        color: Color, part: Part, pos: Vector,
        machine: FoodMachine, callback: () => void) {
        return new ColorPart(
            pos.X, pos.Y, SZ.GAME.PART_W, SZ.GAME.PART_H, part, color,
            machine, callback);
    }

    export function GetEnergy(
        pos: Vector, pb: EnergyBar, callback: () => void): Energy {
        return new Energy(pos.X, pos.Y, SZ.GAME.ENERGY_R, pb, callback);
    }
}

abstract class Food implements Positioned, Sized {
    constructor(bound: PositionedBound, callback: () => void) {
        this.bound = bound;
        this.callback = callback;
    }

    Eat(): void {
        this.callback();
        this.RegularEat();
    }
    abstract RegularEat(): void;
    abstract Image(): HTMLImageElement;

    Reachable(pos: Vector): Boolean {
        return V.Distance(pos, this.bound.Center()) < SZ.GAME.SNAKE_HEAD_R * 1.1;
    }
    Width(): number { return this.bound.Width(); }
    Height(): number { return this.bound.Height(); }
    X(): number { return this.bound.X(); }
    Y(): number { return this.bound.Y(); }
    Center(): Vector { return this.bound.Center(); }
    Position(): Vector { return this.bound.Position(); }

    bound: PositionedBound;
    callback: () => void;
}

class Energy extends Food {
    constructor(
        x: number, y: number, r: number, pb: EnergyBar,
        callback: () => void = Func.Noop) {
        super(new CircleBound(x, y, r), callback);
        this.pb = pb;
    }
    RegularEat(): void {
        this.pb.increment();
    }
    Image(): HTMLImageElement {
        return IMG.FOOD.energy;
    }
    pb: EnergyBar;
}

/**
 * first dim is color
 * second is type(part)
 */
const foodTable: HTMLImageElement[][] = [
    [IMG.FOOD.prom_r, IMG.FOOD.rbs_r, IMG.FOOD.cds_r, IMG.FOOD.term_r],
    [IMG.FOOD.prom_g, IMG.FOOD.rbs_g, IMG.FOOD.cds_g, IMG.FOOD.term_g],
    [IMG.FOOD.prom_y, IMG.FOOD.rbs_y, IMG.FOOD.cds_y, IMG.FOOD.term_y]];

interface FoodMachine {
    Consume(type: food.Part, color: food.Color): void;
    Complete(color: food.Color): void;
}

class ColorPart extends Food {
    constructor(
        x: number, y: number, w: number, h: number,
        type: food.Part, color: food.Color,
        machine: FoodMachine, callback: () => void = Func.Noop) {
        super(new RectBound(x, y, w, h), callback);
        this.type = type;
        this.color = color;
        this.machine = machine;
    }
    RegularEat(): void {
        this.machine.Consume(this.type, this.color);
    }
    Image(): HTMLImageElement {
        return foodTable[this.color][this.type];
    }
    type: food.Part;
    color: food.Color;
    machine: FoodMachine;
}
