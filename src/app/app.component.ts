import { AuthServiceService } from './auth-service.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'go';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
