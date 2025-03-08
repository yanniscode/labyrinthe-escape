import { Bloc, TypeBloc } from "./bloc";
import { Point } from "./Point";

export class Labyrinthe {
    dimX: number;
    dimY: number;
    blocs: Bloc[][] = [];

    constructor(dimX: number, dimY: number) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.construireLabyrinthe(this.dimX, this.dimY);
    }

    private construireLabyrinthe(dimX: number, dimY: number): Bloc[][] {

        // TAB de 11, 12 = idx max = 10, 11
        this.blocs = new Array(dimX);
        for (let i = 0; i < this.blocs.length; i++) {
          this.blocs[i] = new Array(dimY);
        }

        this.blocs[0][0] = new Bloc(new Point(0, 0), TypeBloc.MUR);
        this.blocs[0][1] = new Bloc(new Point(0, 1), TypeBloc.MUR);
        this.blocs[0][2] = new Bloc(new Point(0, 2), TypeBloc.MUR);
        this.blocs[0][3] = new Bloc(new Point(0, 3), TypeBloc.MUR);
        this.blocs[0][4] = new Bloc(new Point(0, 4), TypeBloc.MUR);
        this.blocs[0][5] = new Bloc(new Point(0, 5), TypeBloc.MUR);
        this.blocs[0][6] = new Bloc(new Point(0, 6), TypeBloc.MUR);
        this.blocs[0][7] = new Bloc(new Point(0, 7), TypeBloc.MUR);
        this.blocs[0][8] = new Bloc(new Point(0, 8), TypeBloc.MUR);
        this.blocs[0][9] = new Bloc(new Point(0, 9), TypeBloc.MUR);
        this.blocs[0][10] = new Bloc(new Point(0, 10), TypeBloc.MUR);

        this.blocs[1][0] = new Bloc(new Point(1, 0), TypeBloc.MUR);
        this.blocs[1][1] = new Bloc(new Point(1, 1), TypeBloc.VIDE);
        this.blocs[1][2] = new Bloc(new Point(1, 2), TypeBloc.VIDE);
        this.blocs[1][3] = new Bloc(new Point(1, 3), TypeBloc.VIDE);
        this.blocs[1][4] = new Bloc(new Point(1, 4), TypeBloc.VIDE);
        this.blocs[1][5] = new Bloc(new Point(1, 5), TypeBloc.VIDE);
        this.blocs[1][6] = new Bloc(new Point(1, 6), TypeBloc.VIDE);
        this.blocs[1][7] = new Bloc(new Point(1, 7), TypeBloc.VIDE);
        this.blocs[1][8] = new Bloc(new Point(1, 8), TypeBloc.VIDE);
        this.blocs[1][9] = new Bloc(new Point(1, 9), TypeBloc.VIDE);
        this.blocs[1][10] = new Bloc(new Point(1, 10), TypeBloc.SORTIE);

        this.blocs[2][0] = new Bloc(new Point(2, 0), TypeBloc.MUR);
        this.blocs[2][1] = new Bloc(new Point(2, 1), TypeBloc.VIDE);
        this.blocs[2][2] = new Bloc(new Point(2, 2), TypeBloc.MUR);
        this.blocs[2][3] = new Bloc(new Point(2, 3), TypeBloc.MUR);
        this.blocs[2][4] = new Bloc(new Point(2, 4), TypeBloc.MUR);
        this.blocs[2][5] = new Bloc(new Point(2, 5), TypeBloc.MUR);
        this.blocs[2][6] = new Bloc(new Point(2, 6), TypeBloc.MUR);
        this.blocs[2][7] = new Bloc(new Point(2, 7), TypeBloc.MUR);
        this.blocs[2][8] = new Bloc(new Point(2, 8), TypeBloc.MUR);
        this.blocs[2][9] = new Bloc(new Point(2, 9), TypeBloc.MUR);
        this.blocs[2][10] = new Bloc(new Point(2, 10), TypeBloc.MUR);

        this.blocs[3][0] = new Bloc(new Point(3, 0), TypeBloc.MUR);
        this.blocs[3][1] = new Bloc(new Point(3, 1), TypeBloc.VIDE);
        this.blocs[3][2] = new Bloc(new Point(3, 2), TypeBloc.VIDE);
        this.blocs[3][3] = new Bloc(new Point(3, 3), TypeBloc.VIDE);
        this.blocs[3][4] = new Bloc(new Point(3, 4), TypeBloc.VIDE);
        this.blocs[3][5] = new Bloc(new Point(3, 5), TypeBloc.VIDE);
        this.blocs[3][6] = new Bloc(new Point(3, 6), TypeBloc.VIDE);
        this.blocs[3][7] = new Bloc(new Point(3, 7), TypeBloc.VIDE);
        this.blocs[3][8] = new Bloc(new Point(3, 8), TypeBloc.MUR);
        this.blocs[3][9] = new Bloc(new Point(3, 9), TypeBloc.MUR);
        this.blocs[3][10] = new Bloc(new Point(3, 10), TypeBloc.MUR);

        this.blocs[4][0] = new Bloc(new Point(4, 0), TypeBloc.MUR);
        this.blocs[4][1] = new Bloc(new Point(4, 1), TypeBloc.VIDE);
        this.blocs[4][2] = new Bloc(new Point(4, 2), TypeBloc.MUR);
        this.blocs[4][3] = new Bloc(new Point(4, 3), TypeBloc.MUR);
        this.blocs[4][4] = new Bloc(new Point(4, 4), TypeBloc.MUR);
        this.blocs[4][5] = new Bloc(new Point(4, 5), TypeBloc.MUR);
        this.blocs[4][6] = new Bloc(new Point(4, 6), TypeBloc.MUR);
        this.blocs[4][7] = new Bloc(new Point(4, 7), TypeBloc.MUR);
        this.blocs[4][8] = new Bloc(new Point(4, 8), TypeBloc.MUR);
        this.blocs[4][9] = new Bloc(new Point(4, 9), TypeBloc.MUR);
        this.blocs[4][10] = new Bloc(new Point(4, 10), TypeBloc.MUR);

        this.blocs[5][0] = new Bloc(new Point(5, 0), TypeBloc.MUR);
        this.blocs[5][1] = new Bloc(new Point(5, 1), TypeBloc.VIDE);
        this.blocs[5][2] = new Bloc(new Point(5, 2), TypeBloc.MUR);
        this.blocs[5][3] = new Bloc(new Point(5, 3), TypeBloc.VIDE);
        this.blocs[5][4] = new Bloc(new Point(5, 4), TypeBloc.VIDE);
        this.blocs[5][5] = new Bloc(new Point(5, 5), TypeBloc.VIDE);
        this.blocs[5][6] = new Bloc(new Point(5, 6), TypeBloc.VIDE);
        this.blocs[5][7] = new Bloc(new Point(5, 7), TypeBloc.VIDE);
        this.blocs[5][8] = new Bloc(new Point(5, 8), TypeBloc.MUR);
        this.blocs[5][9] = new Bloc(new Point(5, 9), TypeBloc.MUR);
        this.blocs[5][10] = new Bloc(new Point(5, 10), TypeBloc.MUR);

        this.blocs[6][0] = new Bloc(new Point(6, 0), TypeBloc.MUR);
        this.blocs[6][1] = new Bloc(new Point(6, 1), TypeBloc.VIDE);
        this.blocs[6][2] = new Bloc(new Point(6, 2), TypeBloc.MUR);
        this.blocs[6][3] = new Bloc(new Point(6, 3), TypeBloc.VIDE);
        this.blocs[6][4] = new Bloc(new Point(6, 4), TypeBloc.MUR);
        this.blocs[6][5] = new Bloc(new Point(6, 5), TypeBloc.MUR);
        this.blocs[6][6] = new Bloc(new Point(6, 6), TypeBloc.MUR);
        this.blocs[6][7] = new Bloc(new Point(6, 7), TypeBloc.VIDE);
        this.blocs[6][8] = new Bloc(new Point(6, 8), TypeBloc.MUR);
        this.blocs[6][9] = new Bloc(new Point(6, 9), TypeBloc.MUR);
        this.blocs[6][10] = new Bloc(new Point(6, 10), TypeBloc.MUR);

        this.blocs[7][0] = new Bloc(new Point(7, 0), TypeBloc.MUR);
        this.blocs[7][1] = new Bloc(new Point(7, 1), TypeBloc.VIDE);
        this.blocs[7][2] = new Bloc(new Point(7, 2), TypeBloc.MUR);
        this.blocs[7][3] = new Bloc(new Point(7, 3), TypeBloc.VIDE);
        this.blocs[7][4] = new Bloc(new Point(7, 4), TypeBloc.VIDE);
        this.blocs[7][5] = new Bloc(new Point(7, 5), TypeBloc.VIDE);
        this.blocs[7][6] = new Bloc(new Point(7, 6), TypeBloc.MUR);
        this.blocs[7][7] = new Bloc(new Point(7, 7), TypeBloc.VIDE);
        this.blocs[7][8] = new Bloc(new Point(7, 8), TypeBloc.MUR);
        this.blocs[7][9] = new Bloc(new Point(7, 9), TypeBloc.MUR);
        this.blocs[7][10] = new Bloc(new Point(7, 10), TypeBloc.MUR);

        this.blocs[8][0] = new Bloc(new Point(8, 0), TypeBloc.MUR);
        this.blocs[8][1] = new Bloc(new Point(8, 1), TypeBloc.VIDE);
        this.blocs[8][2] = new Bloc(new Point(8, 2), TypeBloc.MUR);
        this.blocs[8][3] = new Bloc(new Point(8, 3), TypeBloc.VIDE);
        this.blocs[8][4] = new Bloc(new Point(8, 4), TypeBloc.VIDE);
        this.blocs[8][5] = new Bloc(new Point(8, 5), TypeBloc.VIDE);
        this.blocs[8][6] = new Bloc(new Point(8, 6), TypeBloc.MUR); // si VIDE ici, test du départ du robot en circuit fermé (raison du choix de cet algo !)
        this.blocs[8][7] = new Bloc(new Point(8, 7), TypeBloc.VIDE);
        this.blocs[8][8] = new Bloc(new Point(8, 8), TypeBloc.MUR);
        this.blocs[8][9] = new Bloc(new Point(8, 9), TypeBloc.MUR);
        this.blocs[8][10] = new Bloc(new Point(8, 10), TypeBloc.MUR);

        this.blocs[9][0] = new Bloc(new Point(9, 0), TypeBloc.MUR);
        this.blocs[9][1] = new Bloc(new Point(9, 1), TypeBloc.VIDE);
        this.blocs[9][2] = new Bloc(new Point(9, 2), TypeBloc.MUR);
        this.blocs[9][3] = new Bloc(new Point(9, 3), TypeBloc.MUR);
        this.blocs[9][4] = new Bloc(new Point(9, 4), TypeBloc.MUR);
        this.blocs[9][5] = new Bloc(new Point(9, 5), TypeBloc.MUR);
        this.blocs[9][6] = new Bloc(new Point(9, 6), TypeBloc.MUR);
        this.blocs[9][7] = new Bloc(new Point(9, 7), TypeBloc.VIDE);
        this.blocs[9][8] = new Bloc(new Point(9, 8), TypeBloc.MUR);
        this.blocs[9][9] = new Bloc(new Point(9, 9), TypeBloc.MUR);
        this.blocs[9][10] = new Bloc(new Point(9, 10), TypeBloc.MUR);

        this.blocs[10][0] = new Bloc(new Point(10, 0), TypeBloc.MUR);
        this.blocs[10][1] = new Bloc(new Point(10, 1), TypeBloc.VIDE);
        this.blocs[10][2] = new Bloc(new Point(10, 2), TypeBloc.VIDE);
        this.blocs[10][3] = new Bloc(new Point(10, 3), TypeBloc.VIDE);
        this.blocs[10][4] = new Bloc(new Point(10, 4), TypeBloc.VIDE);
        this.blocs[10][5] = new Bloc(new Point(10, 5), TypeBloc.VIDE);
        this.blocs[10][6] = new Bloc(new Point(10, 6), TypeBloc.VIDE);
        this.blocs[10][7] = new Bloc(new Point(10, 7), TypeBloc.VIDE);
        this.blocs[10][8] = new Bloc(new Point(10, 8), TypeBloc.MUR);
        this.blocs[10][9] = new Bloc(new Point(10, 9), TypeBloc.MUR);
        this.blocs[10][10] = new Bloc(new Point(10, 10), TypeBloc.MUR);

        this.blocs[11][0] = new Bloc(new Point(11, 0), TypeBloc.MUR);
        this.blocs[11][1] = new Bloc(new Point(11, 1), TypeBloc.MUR);
        this.blocs[11][2] = new Bloc(new Point(11, 2), TypeBloc.MUR);
        this.blocs[11][3] = new Bloc(new Point(11, 3), TypeBloc.MUR);
        this.blocs[11][4] = new Bloc(new Point(11, 4), TypeBloc.MUR);
        this.blocs[11][5] = new Bloc(new Point(11, 5), TypeBloc.MUR);
        this.blocs[11][6] = new Bloc(new Point(11, 6), TypeBloc.MUR);
        this.blocs[11][7] = new Bloc(new Point(11, 7), TypeBloc.MUR);
        this.blocs[11][8] = new Bloc(new Point(11, 8), TypeBloc.MUR);
        this.blocs[11][9] = new Bloc(new Point(11, 9), TypeBloc.MUR);
        this.blocs[11][10] = new Bloc(new Point(11, 10), TypeBloc.MUR);

        return this.blocs;
      }
}
