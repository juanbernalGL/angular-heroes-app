import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  term:string = "";
  heroes: Hero[] = [];
  selectedHero!: Hero | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  searching () {
    this.heroesService.getSuggestion(this.term.trim())
    .subscribe(heroes => this.heroes = heroes)
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if( !event.option.value ){
      console.log(`Didn't value`);
      this.selectedHero = undefined;
      return;
    }
    console.log(`event`, event);
    const hero = event.option.value;
    console.log(`hero`, hero);
    this.term = hero.superhero;
    this.heroesService.getHeroById(hero.id)
    .subscribe( hero => {
      this.selectedHero = hero;
      console.log(`this.selectedHero`, this.selectedHero);      
    });

  }
}
