import { Point } from "./Point";
import { Bloc, TypeBloc } from "./bloc";
import { Labyrinthe } from "./labyrinthe";

export class Robot {
    position: Point;
    direction: Direction;       // GAUCHE, AVANCER, DROITE
    cardinalite: Cardinalite;   // NORD, EST, SUD, OUEST
    changementDirectionCpte: number;    // selon le virage choisi

    constructor(position: Point, direction: Direction, cardinalite: Cardinalite, changementDirectionCpte: number) {
        this.position = position;
        this.direction = direction;
        this.cardinalite = cardinalite;
        this.changementDirectionCpte = changementDirectionCpte;
    }

    // ss-methode principale 1
    public avancerToutDroitOuAllerADroite(labyrinthe: Labyrinthe, robot: Robot): Robot {
        let positionMurADroite: Point = robot.trouverPositionMurADroite(robot.position, robot.cardinalite);
        let murDeDroiteBloc = labyrinthe.blocs[positionMurADroite.x][positionMurADroite.y];
        // si le robot trouve un coin à sa droite, il se retourne
        if (TypeBloc.MUR === robot.getElementEnFace(labyrinthe, robot).typeBloc && TypeBloc.MUR === murDeDroiteBloc.typeBloc) {
            console.log("Le robot a pris un coin à sa droite ! il se retourne.");
            robot.changementDirectionCpte -= 2;
            return robot.seRetourner(robot, Direction.DROITE, robot.cardinalite);
        // si un mur en face, tourner à droite:
        } else if(TypeBloc.MUR === robot.getElementEnFace(labyrinthe, robot).typeBloc) {
            console.log("Le robot a pris un mur ! Il tourne à droite.");
            robot.changementDirectionCpte -= 1;
            return robot.seDeplacer(robot, Direction.DROITE, robot.cardinalite);
        } 
        else {
        // sinon, avancer tout droit
            console.log("Le robot avance tout droit jusqu'au prochain mur");
            return robot.seDeplacer(robot, robot.direction, robot.cardinalite);
        }
    }

    // ss-methode principale 2 
    public suivreLeMurDeGauche(labyrinthe: Labyrinthe, robot: Robot): Robot {
        // scanner le mur:
        let positionMurAGauche: Point = this.trouverPositionMurAGauche(robot.position, robot.cardinalite);
        let murDeGaucheBloc = labyrinthe.blocs[positionMurAGauche.x][positionMurAGauche.y];
        let positionMurADroite: Point = this.trouverPositionMurADroite(robot.position, robot.cardinalite);
        let murDeDroiteBloc: Bloc = labyrinthe.blocs[positionMurADroite.x][positionMurADroite.y];

        // si pas de bloc à la gauche du robot:
        if(TypeBloc.MUR !== murDeGaucheBloc.typeBloc) {
            // tourner à gauche
            robot.changementDirectionCpte += 1;
            return this.seDeplacer(robot, Direction.GAUCHE, robot.cardinalite);

        // si cul de sac devant le robot: (test de mur de gauche, face et droite, cette fois)
        } else if(TypeBloc.MUR === murDeGaucheBloc.typeBloc
            && TypeBloc.MUR === this.getElementEnFace(labyrinthe, robot).typeBloc
            && TypeBloc.MUR === murDeDroiteBloc.typeBloc) {
            // demi-tour = 2 fois tourner à droite:
            robot.changementDirectionCpte -= 2;
            return this.seRetourner(robot, Direction.DROITE, robot.cardinalite);
        
        } else if(TypeBloc.MUR === this.getElementEnFace(labyrinthe, robot).typeBloc
        ) {
            // tourner à droite:
            robot.changementDirectionCpte -= 1;
            return this.seDeplacer(robot, Direction.DROITE, robot.cardinalite);
        }
        else {
            // avancer tout droit
            return this.seDeplacer(robot, Direction.AVANCER, robot.cardinalite);
        }
    }

    private seDeplacer(robot: Robot,  dir: Direction, card: Cardinalite): Robot {

        let nvCard: Cardinalite = this.utiliserCardinalite(dir, card);

        return this.avancer(nvCard, robot);
    }

    private utiliserCardinalite(dir: Direction, card: Cardinalite): Cardinalite {
        if(dir === Direction.AVANCER) {
            return card;
        } else if(dir === Direction.DROITE) {
            return this.changeCardinalite(1, card);
        // } else if(dir === Direction.RECULER) {
        //                 // pas utilisé
        //     return this.changeCardinalite(1, card);
        } else {
            // si dir gauche
            return this.changeCardinalite(-1, card);
        }
    }

    private changeCardinalite(operateur: number, card: number): Cardinalite {
        // si dir vers la gauche (op = -1) et enum 0 > enum 3 choisie
        if(operateur === -1 && card === 0) {
            return Number(Object.keys(Cardinalite)[3]); // key = "3"
        // si dir vers la droite et enum 3 > enum 0 choisie
        } else if(operateur === 1 && card === 3) {
            return Number(Object.keys(Cardinalite)[0]);
        } else {
            return Number(Object.keys(Cardinalite)[card + operateur]);
        }
    }

    private seRetourner(robot: Robot,  dir: Direction, card: Cardinalite): Robot {
        let nvCard: Cardinalite = this.utiliserCardinalitePourSeDeplacer(dir, card);

        return this.avancer(nvCard, robot);
    }

    private avancer(card: Cardinalite, robot: Robot): Robot {
        // ensuite, méthode commune à avancer (à refacto ici)
        if(card === Cardinalite.NORD) {
            robot.position.y -= 1;
            robot.cardinalite = card;
            return robot;
        }
        else if(card === Cardinalite.EST) {
            robot.position.x += 1;
            robot.cardinalite = card;
            return robot;
        }
        else if(card === Cardinalite.SUD) {
            robot.position.y += 1;
            robot.cardinalite = card;
            return robot;
        }
        else {
            // sinon: dir = Ouest
            robot.position.x -= 1;
            robot.cardinalite = card;
            return robot;
        }
    }

    private utiliserCardinalitePourSeDeplacer(dir: Direction, card: Cardinalite): Cardinalite {
        if(dir === Direction.AVANCER) {
            return card;
        } else if(dir === Direction.DROITE) {
            return this.changeCardinalitePourSeRetourner(2, card);
        // } else if(dir === Direction.RECULER) {
        //     // pas utilisé
        //     return this.changeCardinalitePourSeRetourner(2, card);
        } else {
            // si dir gauche
            return this.changeCardinalitePourSeRetourner(-2, card);
        }
    }

    private changeCardinalitePourSeRetourner(operateur: number, card: number): Cardinalite {
        if(operateur === -2 && card === 0) {
            return Number(Object.keys(Cardinalite)[2]);
        }
        else if(operateur === -2 && card === 1) {
            return Number(Object.keys(Cardinalite)[3]);
        } 
        else if(operateur === 2 && card === 2) {
            return Number(Object.keys(Cardinalite)[0]);
        }
        else if(operateur === 2 && card === 3) {
            return Number(Object.keys(Cardinalite)[1]);
        }
        else {
            return Number(Object.keys(Cardinalite)[card + operateur]);
        }
    }

    private trouverPositionMurAGauche(point: Point, card: Cardinalite): Point {
        if( card === Cardinalite.NORD) {
            return new Point(point.x-1, point.y);
        }
        else if(card === Cardinalite.EST) {
            return new Point(point.x, point.y-1);
        }
        else if( card === Cardinalite.SUD) {
            return new Point(point.x+1, point.y);
        }
        else {
            // sinon: dir Ouest
            return new Point(point.x, point.y+1);
        }    
    }
    
    private trouverPositionMurADroite(point: Point, card: Cardinalite): Point {
        if( card === Cardinalite.NORD) {
            return new Point(point.x+1, point.y);
        }
        else if(card === Cardinalite.EST) {
            return new Point(point.x, point.y+1);
        }
        else if( card === Cardinalite.SUD) {
            return new Point(point.x-1, point.y);
        }
        else {
            // sinon: dir Ouest
            return new Point(point.x, point.y-1);
        }    
    }

    // rechercher un obstacle devant
    private getElementEnFace(labyrinthe: Labyrinthe, robot: Robot): Bloc {
        let positionElementEnFace: Point = this.trouverPositionMurEnFace(robot.position, robot.cardinalite);
        let murBlocEnFace: Bloc = labyrinthe.blocs[positionElementEnFace.x][positionElementEnFace.y];
        
        return murBlocEnFace;
    }

    private trouverPositionMurEnFace(point: Point, card: Cardinalite): Point {
        if( card === Cardinalite.NORD) {
            return new Point(point.x, point.y-1);
        }
        else if(card === Cardinalite.EST) {
            return new Point(point.x+1, point.y);
        }
        else if( card === Cardinalite.SUD) {
            return new Point(point.x, point.y+1);
        }
        else {
            // sinon: dir Ouest
            return new Point(point.x-1, point.y);
        }    
    }
}

export enum Direction {
    AVANCER = "A",
    DROITE = "D",
    RECULER ="R",
    GAUCHE = "G"
}

export enum Cardinalite {
    NORD = 0,
    EST = 1,
    SUD = 2,
    OUEST = 3
}