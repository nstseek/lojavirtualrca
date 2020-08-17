import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, User, CartHttp, CartItem } from '../utils/types/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SystemService } from './system.service';
import { UserSS, UserKey } from '../utils/types/sessionStorage';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  constructor(private http: HttpClient, private system: SystemService) {}

  getProducts(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.api}/games`);
  }

  logIn(login: string, password: string): Observable<User> {
    const sub = new Subject<User>();
    this.http.get<User[]>(`${environment.api}/users`).subscribe((data) => {
      const serverUser = data.find(
        (user) => user.password === password && user.login === login
      );
      if (serverUser) {
        sessionStorage.setItem(UserKey, JSON.stringify(serverUser));
        sub.next(serverUser);
        this.system.user.next(serverUser);
      } else {
        this.system.warning.next('Credenciais de login inválidas.');
      }
      sub.complete();
    });
    return sub;
  }

  getCartQuantity(): Observable<number> {
    return this.http
      .get<CartHttp>(`${environment.api}/cart`, {
        params: { id_user: String(this.system.user.value.id) }
      })
      .pipe((obs) => {
        const sub = new Subject<number>();
        obs.subscribe((data) => {
          sub.next(data.items.length);
          sub.complete();
        });
        return sub;
      });
  }

  getCartItems(): Observable<(Game & CartItem)[]> {
    const sub = new Subject<(Game & CartItem)[]>();
    this.http
      .get<CartHttp[]>(`${environment.api}/cart`, {
        params: { id_user: String(this.system.user.value.id) }
      })
      .subscribe(([cartIds]) => {
        if (cartIds && cartIds.items && cartIds.items.length) {
          const idsToFetch = [];
          cartIds.items.forEach((item) => {
            if (idsToFetch.findIndex((id) => id === item.id) === -1) {
              idsToFetch.push(item.id);
            }
          });
          const requests: Observable<Game[]>[] = [];
          idsToFetch.forEach((id) => {
            requests.push(
              this.http.get<Game[]>(`${environment.api}/games`, {
                params: { id }
              })
            );
          });
          forkJoin(...requests).subscribe((items: Game[]) => {
            const cartItems = cartIds.items.map((item) => {
              return {
                ...item,
                ...items.find((game) => game[0].id === item.id)[0]
              };
            });
            sub.next(cartItems);
            sub.complete();
          });
        } else {
          sub.next([]);
          sub.complete();
        }
      });
    return sub;
  }

  addItemToCart(item: Game) {
    const sub = new Subject<(Game & CartItem)[]>();
    const cart = this.system.cart.value;
    const cartGame = cart.find((game) => game.id === item.id);
    if (cartGame) {
      cartGame.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    const newCart: CartHttp = {
      id_user: this.system.user.value.id,
      items: cart.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity
      }))
    };
    this.http
      .put(`${environment.api}/cart/${this.system.user.value.id}`, newCart)
      .subscribe(() =>
        this.getCartItems().subscribe((data) => {
          sub.next(data);
          sub.complete();
        })
      );
    return sub;
  }

  changeQuantity(cartItem: Game & CartItem) {
    const sub = new Subject<(Game & CartItem)[]>();
    const cart = this.system.cart.value;
    const cartGame = cart.find((game) => game.id === cartItem.id);
    cartGame.quantity = cartItem.quantity;
    const newCart: CartHttp = {
      id_user: this.system.user.value.id,
      items: cart
        .filter((item) => item.quantity > 0)
        .map((item) => ({
          id: item.id,
          quantity: item.quantity
        }))
    };
    this.http
      .put(`${environment.api}/cart/${this.system.user.value.id}`, newCart)
      .subscribe(() => {
        this.getCartItems().subscribe((data) => {
          sub.next(data);
          sub.complete();
        });
      });
    return sub;
  }

  logOut() {
    sessionStorage.clear();
    this.system.cart.next([]);
    this.system.user.next(null);
  }
}
