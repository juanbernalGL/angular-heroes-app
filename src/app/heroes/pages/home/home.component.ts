import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `
  ]
})
export class HomeComponent implements OnInit {

  get auth(): Auth {
    return this.authService.auth;
  }

  constructor(private activatedRoute :ActivatedRoute, 
    private router:Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (resp ) => console.log(`id`, resp));
  }


  logout(){
    // go to backend and log user
    // navigate to hero
    this.router.navigate(['./auth']);
  }
}
