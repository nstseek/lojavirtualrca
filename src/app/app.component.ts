import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Routes } from './routes';
import { SystemService } from './services/system.service';
import { ActivatedRoute } from '@angular/router';
import { RootService } from './services/root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('loginButton', { static: false }) loginButton: ElementRef;
  title = 'RCA';
  user: string;
  loginOpen: boolean;

  constructor(
    private system: SystemService,
    private activatedRoute: ActivatedRoute,
    private service: RootService
  ) {
    this.user = this.system.user.value ? this.system.user.value.name : null;
  }

  get Routes() {
    return Routes;
  }

  ngOnInit() {
    this.system.user.subscribe((data) => (this.user = data ? data.name : null));
    this.activatedRoute.queryParams.subscribe(
      (data) => (this.loginOpen = data.login)
    );
  }

  openLogin(event: MouseEvent) {
    if (event.target === this.loginButton.nativeElement) {
      this.loginOpen = !this.loginOpen;
    }
  }

  logOut() {
    this.service.logOut();
    this.system.user.next(null);
  }
}
