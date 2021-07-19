import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 25px;
  }
  `

  ]
})
export class HeroComponent implements OnInit {

  constructor(
    private activatedRoute :ActivatedRoute, 
    private heroesService: HeroesService
  ) { }

  @Input() id!: string ;
  hero!: Hero ;

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(switchMap( ({id}) =>  this.heroesService.getHeroById(id)))
    .subscribe( (hero) => this.hero = hero
      // this.heroesService.getHeroById(id).subscribe( resp => {
      //   this.hero = resp
      // } );
    );


  }

}
