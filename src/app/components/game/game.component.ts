import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/utils/types/http';
import { environment } from 'src/environments/environment';
import { RootService } from 'src/app/services/root.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  @Input('game') game: Game;
  @Output('addGame') addGame = new EventEmitter();

  get Cover() {
    return `${environment.imgs}/${this.game.pic_id}.png`;
  }

  emit() {
    this.addGame.emit(this.game);
  }
}
