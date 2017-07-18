namespace Func {
    export function Noop(): void {}
    export function foldl<A, B>(as: A[], z: B, f: (b: B, a: A) => B): B {
        let res = z;
        for (let a of as) {
            res = f(res, a);
        }
        return res;
    }
    export function seq<A>(
        lhs: (a: A) => void, rhs: (b: A) => void): (a: A) => void {
        return a => {
            lhs(a);
            rhs(a);
        }
    }
}