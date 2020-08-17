import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserKey } from '../utils/types/sessionStorage';
import { User, CartItem, Game } from '../utils/types/http';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loading = new BehaviorSubject(false);
  user = new BehaviorSubject<User>(
    !!sessionStorage.getItem(UserKey)
      ? JSON.parse(sessionStorage.getItem(UserKey))
      : null
  );
  warning = new BehaviorSubject<string>(null);
  cart = new BehaviorSubject<(CartItem & Game)[]>([]);

  set LoadingState(val) {
    this.loading.next(val);
  }

  get LoadingState() {
    return this.loading.value;
  }
}
