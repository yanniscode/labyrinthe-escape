import { Component } from '@angular/core';
import { LabyrintheComponent } from './labyrinthe/labyrinthe.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Labyrinthe } from './datas/labyrinthe';
import { Point } from './datas/Point';
import { Cardinalite, Direction, Robot } from './datas/robot';
import { MessageService } from './services/message.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [LabyrintheComponent, NgFor, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Escape the Lab';

  isGameStarted: boolean = false;
  labyrinthe: Labyrinthe = new Labyrinthe(12, 11);
  robot: Robot = new Robot(new Point(), Direction.AVANCER, Cardinalite.NORD, 0);

  constructor(private messageService: MessageService) {
    this.messageService = messageService;
  }

  startGame(): void {
    this.isGameStarted = true;

    // construction du labyrinthe
    this.labyrinthe = new Labyrinthe(12, 11);
    let exitPosition: Point = new Point(9, 1);
    let startPosition: Point = new Point(5, 5);

    // méthode de déplacement du robot
    this.sortirDuLabyrinthe(exitPosition, startPosition).subscribe();
  }
  
  private sortirDuLabyrinthe(exitPosition: Point, startPosition: Point): Observable<void> {
    // décompte à 0 en début de trajet:
    this.robot = new Robot(startPosition, Direction.AVANCER, Cardinalite.NORD, 0);

    let compteToursBoucle: number = 0;

    do {
      // cas 2: suivre le mur jusqu'au décompte == 0, sauf au premier tour
      if (compteToursBoucle !== 0 && this.robot.changementDirectionCpte !== 0) {
        this.log("Le robot suit le mur : changementDirectionCpte = "+ this.robot.changementDirectionCpte);
        this.robot = this.robot.suivreLeMurDeGauche(this.labyrinthe, this.robot);
      
      // sinon, si décompte == 0 > cas 1: avancer jusqu'au prochain mur et tourner à droite
      } else {
        this.log("Le robot avance tout droit, ou tourne à droite si mur en face, ou se retourne s'il trouve un coin à sa droite");
        this.robot = this.robot.avancerToutDroitOuAllerADroite(this.labyrinthe, this.robot);
      }

      this.log("Robot position - x ="+ this.robot.position.x +" / y ="+ this.robot.position.y
        + " / Direction ="+ this.robot.direction + " / Cardinalité ="+ this.robot.cardinalite 
        +" /changementDirectionCpte = "+ this.robot.changementDirectionCpte);
      // console.log("Robot position - x ="+ this.robot.position.x +" / y ="+ this.robot.position.y
      //   + " / Direction ="+ this.robot.direction + " / Cardinalité ="+ this.robot.cardinalite 
      //   +" /changementDirectionCpte = "+ this.robot.changementDirectionCpte);
      compteToursBoucle++;
      this.log("*** fin du pas n° "+ compteToursBoucle);

    } while(this.robot.position.x !== exitPosition.x || this.robot.position.y !== exitPosition.y);

    // fin: si le robot a trouvé la sortie: 
    this.log("*** Le robot s'est échappé ! ***");

    return of<void>(undefined);
  }

  private log(message: string) {
    this.messageService.add(`AppComponent: ${message}`);
  }
}
