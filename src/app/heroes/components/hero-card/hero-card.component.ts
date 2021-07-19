import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: []
})
export class HeroCardComponent implements OnInit {

  @Input() hero!: Hero ;

  constructor() { }

  ngOnInit(): void {
  }

}
