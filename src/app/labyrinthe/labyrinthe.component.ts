import { Component } from '@angular/core';
import { MessagesComponent } from "../messages/messages.component";
import { trigger, transition, style } from '@angular/animations';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeBloc } from '../datas/bloc';
import { Labyrinthe } from '../datas/labyrinthe';
import { Point } from '../datas/Point';
import { Cardinalite, Direction, Robot } from '../datas/robot';
import { MessageService } from '../services/message.service';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-labyrinthe',
  imports: [MessagesComponent, NgFor, FormsModule],
  templateUrl: './labyrinthe.component.html',
  styleUrl: './labyrinthe.component.css',
  animations: [
    trigger('labyrintheAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        // animate('100ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
      //   animate('100ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LabyrintheComponent {

  isGameStarted: boolean = false; // pour afficher la div des logs de MessageService
  static labyrinthe: Labyrinthe = new Labyrinthe(12, 11);

  get LabyrintheView() {
    return LabyrintheComponent.labyrinthe;
  }

  robot: Robot = new Robot(new Point(), Direction.AVANCER, Cardinalite.NORD, 0);
  robotLastPosition: Robot = new Robot(new Point(), Direction.AVANCER, Cardinalite.NORD, 0);

  exitPosition: Point = new Point(0, 0);
  startPosition: Point = new Point(0, 0);

  // décompte à 0 en début de trajet:
  compteToursBoucle: number = 0;

  items: number[] = [];
  // nécessaire pour l'animation (écoute d'observable avec rxjs)
  updateSubscription!: Subscription;

  constructor(private messageService: MessageService) {
    this.messageService = messageService;
  }

  ngOnInit(): void {
    this.startIntro();
  }

  startIntro(): void {
    this.isGameStarted = true;
    // construction du labyrinthe
    LabyrintheComponent.labyrinthe = new Labyrinthe(12, 11);
    this.exitPosition = new Point(1, 10);
    this.startPosition = new Point(5, 5);
    this.robot = new Robot(this.startPosition, Direction.AVANCER, Cardinalite.NORD, 0);

    setTimeout(() => {
      // remplace un élément du tableau par le robot et l'affiche
      this.updateLabyrintheWithRobot();
    }, 1000);
  }

  startRobot(): void {
    let finished: boolean = false;
    this.isGameStarted = true;

    this.updateSubscription = interval(250).pipe(
      map(() => {
        if(this.robot.position.x === this.exitPosition.x && this.robot.position.y === this.exitPosition.y) {
          this.log("Game Over");
          this.log("Robot X = "+ this.robot.position.x.toString());
          this.log("Robot Y = "+ this.robot.position.y.toString());
          finished = true;
          // stopper les mises à jour:
          this.updateSubscription.unsubscribe();
          this.startIntro();
        }

        if(finished === false) {
          // méthode de déplacement du robot
          this.sortirDuLabyrinthe();
          this.log("robotAction");
          this.log("Robot X = "+ this.robot.position.x.toString());
          this.log("Robot Y = "+ this.robot.position.y.toString());
        }
      })
    ).subscribe();
  }

  private sortirDuLabyrinthe(): void {
    // à chaque tour, le labyrinthe est réinitialisé, seule la position du robot sera mise à jour

    // raffraichissement de l'affichage du labyrinthe avec le robot à sa nouvelle position
    this.robotLastPosition.position.x = this.robot.position.x;
    this.robotLastPosition.position.y = this.robot.position.y;

    // cas 2: suivre le mur jusqu'au décompte == 0, sauf au premier tour
    if (this.compteToursBoucle !== 0 && this.robot.changementDirectionCpte !== 0) {
      this.log("Le robot suit le mur : changementDirectionCpte = "+ this.robot.changementDirectionCpte);
      this.robot = this.robot.suivreLeMurDeGauche(this.robot);

    // sinon, si décompte == 0 > cas 1: avancer jusqu'au prochain mur et tourner à droite
    } else {
      this.log("Le robot avance tout droit, ou tourne à droite si mur en face, ou se retourne s'il trouve un coin à sa droite");
      this.robot = this.robot.avancerToutDroitOuAllerADroite(this.robot);
    }

    this.updateLabyrintheWithRobot();
    this.afficherLogsRobot();

    this.compteToursBoucle++;
    this.log("*** fin du pas n° "+ this.compteToursBoucle);
  }

  updateLabyrintheWithRobot(): void {
    // l'ancienne position du robot devient un bloc VIDE
    LabyrintheComponent.labyrinthe.blocs[this.robotLastPosition.position.x][this.robotLastPosition.position.y].typeBloc = TypeBloc.VIDE;
    // la nouvelle position devient le bloc ROBOT
    LabyrintheComponent.labyrinthe.blocs[this.robot.position.x][this.robot.position.y].typeBloc = TypeBloc.ROBOT;
  }

  private afficherLogsRobot(): void {
    this.log("Position de la sortie: x = "+ this.exitPosition.x +" / y = "+ this.exitPosition.y);
    this.log("Position de début: x = "+ this.startPosition.x +" / y = "+ this.startPosition.y);
    this.log("Robot position - x ="+ this.robot.position.x +" / y ="+ this.robot.position.y
      + " / Direction ="+ this.robot.direction + " / Cardinalité ="+ this.robot.cardinalite
      +" /changementDirectionCpte = "+ this.robot.changementDirectionCpte);
  }

  private log(message: string) {
    this.messageService.add(`AppComponent: ${message}`);
  }

}
