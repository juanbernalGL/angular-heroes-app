import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [`
    margin-top: 20px;
  `
  ]
})
export class ListComponent implements OnInit {

  constructor( private heroesService: HeroesService) { }

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe( resp => {
      this.heroes = resp
    } );
  }

}
