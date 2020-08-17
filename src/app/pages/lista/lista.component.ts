import { Component, DoCheck } from '@angular/core';
import { RootService } from 'src/app/services/root.service';
import { Game } from 'src/app/utils/types/http';
import { SystemService } from 'src/app/services/system.service';
import { Routes } from 'src/app/routes';
import { Router } from '@angular/router';

let lastLogged = null;

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements DoCheck {
  cartQuantity = 0;
  products: Game[];
  logged: boolean;

  constructor(
    private service: RootService,
    private system: SystemService,
    private router: Router
  ) {
    this.logged = !!this.system.user.value;
    this.system.user.subscribe((data) => (this.logged = !!data));
    this.service.getProducts().subscribe((data) => (this.products = data));
    if (this.logged) {
      lastLogged = this.logged;
      this.cartQuantity = 0;
      this.service.getCartItems().subscribe((data) => {
        data.forEach((item) => (this.cartQuantity += item.quantity));
        this.system.cart.next(data);
      });
    }
  }

  navigate() {
    this.router.navigate([Routes.Carrinho]);
  }

  ngDoCheck() {
    if (this.logged !== lastLogged && this.logged) {
      lastLogged = this.logged;
      this.cartQuantity = 0;
      this.service.getCartItems().subscribe((data) => {
        data.forEach((item) => (this.cartQuantity += item.quantity));
        this.system.cart.next(data);
      });
    } else if (this.logged !== lastLogged && !this.logged) {
      lastLogged = this.logged;
      this.cartQuantity = 0;
    }
  }

  addGame(game: Game) {
    if (!this.system.user.value) {
      this.router.navigate([Routes.Lista], { queryParams: { login: true } });
      document
        .querySelector('div#root')
        .scrollTo({ behavior: 'smooth', top: 0, left: 0 });
      return;
    }
    this.service.addItemToCart(game).subscribe((data) => {
      this.cartQuantity = 0;
      data.forEach((item) => (this.cartQuantity += item.quantity));
      this.system.cart.next(data);
    });
  }
}
