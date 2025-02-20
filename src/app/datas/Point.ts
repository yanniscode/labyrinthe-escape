export class Point {
    x: number;
    y: number;

    // surcharge de constructeur
    constructor(x: number, y: number);
    constructor();

    constructor(x?: number, y?: number) {
        if(x !== undefined && y !== undefined) {
            this.x = x;
            this.y = y;
        } else {
            this.x = 0;
            this.y = 0;
        }
    }

}