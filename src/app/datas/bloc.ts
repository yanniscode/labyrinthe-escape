import { Point } from "./Point";

export class Bloc {
    position: Point;
    typeBloc: TypeBloc;

    constructor(position: Point, typeBloc: TypeBloc) {
        this.position = position;
        this.typeBloc = typeBloc;
    }
}

export enum TypeBloc {
    MUR = "X",
    VIDE = " ",
    SORTIE = "S"
}