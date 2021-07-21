import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'image',
  pure: true
})
export class ImagePipe implements PipeTransform {

  transform(hero: Hero): unknown {
    console.log(hero);
    // console.log('alt_img', hero.alt_img);
    console.log('superhero', hero.superhero);

    if( !hero.id && !hero.alt_img) {
      return 'assets/no-image.png'
    } else if ( hero.alt_img?.trim().length ){
      // console.log(`hero.alt_img`, hero.alt_img)
      return hero.alt_img;
    }

    return `assets/heroes/${ hero.id }.jpg`;
  }
}
