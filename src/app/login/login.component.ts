import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../shared/models/user';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = new User();

  constructor(private authService: AuthServiceService,
    private renderer: Renderer2, private router: Router) { }

  onSubmit(f: NgForm) {

    if (f.valid) {
      this.authService.login(this.user).then((dados: any) => {
        if (dados.success) {

          this.authService.setLogin();
          this.authService.isLoggedIn.subscribe(data => {
            if(data) {
              f.reset();
              this.renderer.removeClass((<HTMLInputElement>document.getElementById("routerlistproduct")), 'disabled');
              this.renderer.removeClass((<HTMLInputElement>document.getElementById("routercreateproduct")), 'disabled');
              this.router.navigate(['/create-product', 0]);
            }
          });
        }
        else
          alert(dados.error);
      },
      (error: any) => alert('Internal Server Error'))
    }
  }

}
