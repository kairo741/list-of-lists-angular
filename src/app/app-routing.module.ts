import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListsScreenComponent} from "./lists-screen/lists-screen.component";
import {EditListComponent} from "./lists-screen/edit-list/edit-list.component";
import {ItemsListComponent} from "./lists-screen/items-list/items-list.component";
import {EditItemComponent} from "./lists-screen/items-list/edit-item/edit-item.component";

const routes: Routes = [
  {path: 'lists', component: ListsScreenComponent},
  {path: 'edit-list/:id', component: EditListComponent},
  {path: 'edit-item/:id', component: EditItemComponent},
  {path: 'new-item', component: EditItemComponent},
  {path: 'list/:id', component: ItemsListComponent},
  {path: 'item/:id', component: EditListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
