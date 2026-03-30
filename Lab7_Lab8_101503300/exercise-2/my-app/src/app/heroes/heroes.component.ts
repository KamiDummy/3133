import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RemoveSpacesPipe } from '../pipes/remove-spaces.pipe';
import { InputFormatDirective } from '../directives/input-format.directive';
import { HEROES } from './mock-heroes';

export interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, RemoveSpacesPipe, InputFormatDirective],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero: Hero | null = null;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
