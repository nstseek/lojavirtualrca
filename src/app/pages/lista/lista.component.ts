import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from 'src/app/routes';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate([Routes.Carrinho]);
  }

}
