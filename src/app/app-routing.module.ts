import { NgModule } from '@angular/core';
import { Routes as AngularRoutes, RouterModule } from '@angular/router';
import { Routes } from './routes';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ListaComponent } from './pages/lista/lista.component';

const routes: AngularRoutes = [
  {
    path: Routes.Carrinho,
    component: CarrinhoComponent
  },
  {
    path: Routes.Lista,
    component: ListaComponent
  },
  {
    path: '**',
    redirectTo: Routes.Lista
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
