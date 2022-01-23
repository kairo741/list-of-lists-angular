import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListsScreenComponent} from "./lists-screen/lists-screen.component";

const routes: Routes = [
  { path: 'lists', component: ListsScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
