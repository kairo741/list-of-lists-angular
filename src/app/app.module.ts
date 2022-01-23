import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ListsScreenComponent} from './lists-screen/lists-screen.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {AppMaterialModule} from "./app-material/app-material.module";
import {DialogNewList} from "./lists-screen/dialog-new-list/dialog-new-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditListComponent} from './lists-screen/edit-list/edit-list.component';
import {DialogEditIcon} from "./lists-screen/edit-list/dialog-edit-icon/dialog-edit-icon";
import {DialogDeleteComponent} from "./dialogs/dialog.delete.component";

@NgModule({
  declarations: [
    AppComponent,
    ListsScreenComponent,
    DialogNewList,
    EditListComponent,
    DialogEditIcon,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
