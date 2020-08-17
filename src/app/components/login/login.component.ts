import { Component } from '@angular/core';
import { RootService } from 'src/app/services/root.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login = new FormControl('');
  password = new FormControl('');

  constructor(private service: RootService) {}

  logIn(event?: KeyboardEvent) {
    if (event && event.key !== 'Enter') {
      return 1;
    }
    this.service
      .logIn(this.login.value, this.password.value)
      .subscribe(() => {});
  }
}
