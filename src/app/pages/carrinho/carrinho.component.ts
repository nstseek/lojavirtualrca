import { Component, OnInit, DoCheck } from '@angular/core';
import { RootService } from 'src/app/services/root.service';
import { SystemService } from 'src/app/services/system.service';
import { Router } from '@angular/router';
import { Routes } from 'src/app/routes';
import { CartItem, Game } from 'src/app/utils/types/http';

let lastLogged = null;

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements DoCheck {
  logged: boolean;
  cartItems: (Game & CartItem)[];
  total = 0;

  constructor(
    private service: RootService,
    private system: SystemService,
    private router: Router
  ) {
    this.logged = !!this.system.user.value;
    this.system.user.subscribe((data) => (this.logged = !!data));
    lastLogged = this.logged;
    this.service.getCartItems().subscribe((data) => {
      this.total = 0;
      this.cartItems = data;
      data.forEach((item) => {
        this.total += item.price * item.quantity;
      });
      this.system.cart.next(data);
    });
  }

  ngDoCheck() {
    if (this.logged !== lastLogged && this.logged) {
      lastLogged = this.logged;
      this.service.getCartItems().subscribe((data) => {
        this.total = 0;
        this.cartItems = data;
        data.forEach((item) => (this.total += item.price * item.quantity));
        this.system.cart.next(data);
      });
    } else if (this.logged !== lastLogged && !this.logged) {
      lastLogged = this.logged;
      this.total = 0;
      this.router.navigate([Routes.Lista]);
    }
  }

  changeQuantity(game: Game & CartItem) {
    this.service.changeQuantity(game).subscribe((data) => {
      this.total = 0;
      this.cartItems = data;
      data.forEach((item) => (this.total += item.price * item.quantity));
      this.system.cart.next(data);
    });
  }
}
