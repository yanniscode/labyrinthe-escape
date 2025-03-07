import { Component } from "@angular/core";
import { LabyrintheComponent } from "./labyrinthe/labyrinthe.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [LabyrintheComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
  title = 'Escape the Lab';
}
