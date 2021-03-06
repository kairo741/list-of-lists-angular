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
import { ItemsListComponent } from './lists-screen/items-list/items-list.component';
import {EditItemComponent} from "./lists-screen/items-list/edit-item/edit-item.component";
import {
  DialogEditPhotoComponent
} from "./lists-screen/items-list/edit-item/dialog-edit-photo/dialog-edit-photo.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    ListsScreenComponent,
    DialogNewList,
    EditListComponent,
    EditItemComponent,
    DialogEditIcon,
    DialogDeleteComponent,
    ItemsListComponent,
    DialogEditPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
