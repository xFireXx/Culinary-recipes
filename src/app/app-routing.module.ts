import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from '../app/detail/detail.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'details/:id', component: DetailComponent },
  { path: 'edit-product/:id', component: EditDishComponent },
  { path: 'add', component: AddComponent, pathMatch: 'full'},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
