import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  text: string;

  constructor(private system: SystemService) {
    this.text = this.system.warning.value;
  }

  ngOnInit() {
    this.system.warning.subscribe((data) => (this.text = data));
  }

  clear() {
    this.system.warning.next(null);
  }
}
