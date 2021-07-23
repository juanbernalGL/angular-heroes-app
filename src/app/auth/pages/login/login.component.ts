import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private router:Router,
    private authService: AuthService) { }

  login(){
    // go to backend and log user
    // navigate to hero
    this.authService.login()
    .subscribe( resp => {
      console.log(`resp`, resp);
      if ( resp.id ){
        this.router.navigate(['./heroes']);
      }

    })

  }

}
