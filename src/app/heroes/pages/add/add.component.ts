import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 25px;
    }
  `]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC Comics publisher'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics publisher'
    }
  ]

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  save(){
    console.log(`this.hero`, this.hero);
    if( !this.hero.superhero.trim().length) return;

    if( this.hero.id ){
      this.showSnackbar('Hero Updated');
      this.heroesService.editHero( this.hero )
      .subscribe( hero => console.log(`updating Hero`, hero) );
    } else {
      this.heroesService.addHero( this.hero )
      .subscribe( hero=> {
        console.log(`Create resp`, hero);
        this.showSnackbar('Hero Created');
        this.router.navigate(['/heroes/edit/', hero.id]);
      })
    }

  }

  deleteHero(){
    console.log(`delete Hero`, this.hero.id);

    const dialog = this.dialog.open(ConfirmComponent, {
      width: '350px',
      height: '300px',
      data: {...this.hero},

    });
   
    dialog.afterClosed().subscribe(
      (result) => {
        console.log(`result`, result)
        if(result){
          this.heroesService.deleteHero(this.hero.id!).subscribe((hero) => {
            console.log(`Delete resp`, hero);
            this.showSnackbar('Hero Deleted');
            this.router.navigate(['/heroes/']);
          });
        }
      }
    );

  }

  showSnackbar(msj: string) {
    this.snackbar.open(msj, 'close!', {
      duration: 5000
    })
  }

  constructor( private heroesService: HeroesService, 
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    console.log(`this.router.url`, this.router.url)

    this.router.url.includes('edit') && 
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    )
    .subscribe(hero => this.hero = hero)

  }

}
