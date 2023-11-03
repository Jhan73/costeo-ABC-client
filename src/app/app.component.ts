import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoged: boolean = true
  constructor (private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.logIn()
  }
  
  logIn(){
    this.authService.isLoged.subscribe(res => {
      this.isLoged = res
      this.router.navigate(['/site/elements/activities'])
    })
  }
}
