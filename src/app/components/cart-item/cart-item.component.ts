import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game, CartItem } from 'src/app/utils/types/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input('game') game: Game & CartItem;
  @Output('changeQuantity') changeQuantity = new EventEmitter();

  get Cover() {
    return `${environment.imgs}/${this.game.pic_id}.png`;
  }

  emit(add: boolean) {
    this.game.quantity += add ? 1 : -1;
    this.changeQuantity.emit(null);
  }
}
