import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vet_pet_frontend';
  hideMainButton:boolean = false;
  constructor(private router: Router,
    private authService: AuthService) {
      this.authService.isLoggedIn().subscribe({
        next:  value => {
              this.hideMainButton = value;

        }
      })
  }

  public goToLoginPage() {
    this.router.navigateByUrl("/userLoginForm");
  }

  public goToRegisterPage() {
    this.router.navigateByUrl("/userRegistrationPage");
  }

  public logout() {
    this.authService.logout();
  }

}
