import {Component, OnInit} from '@angular/core';
import {Lista} from "../model/lista";
import {DialogNewList} from "./dialog-new-list/dialog-new-list";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogDeleteComponent} from "../dialogs/dialog.delete.component";
import {ListaService} from "../services/lista-service";
import {initializeApp} from "firebase/app";
import {Firestore, collection, setDoc } from "@angular/fire/firestore";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lists-screen',
  templateUrl: './lists-screen.component.html',
  styleUrls: ['./lists-screen.component.css']
})
export class ListsScreenComponent implements OnInit {

  listaList: Lista[] = []

  constructor(private dialog: MatDialog, private router: Router, private service: ListaService, private firestore: Firestore, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // Initialize Firebase
    // Import the functions you need from the SDKs you need

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBNqNr78YB1sOY_JRGFDgm-LGdyFWM3RW8",
      authDomain: "list-of-lists-bbcd9.firebaseapp.com",
      projectId: "list-of-lists-bbcd9",
      storageBucket: "list-of-lists-bbcd9.appspot.com",
      messagingSenderId: "1022757798561",
      appId: "1:1022757798561:web:b48ffcc285d5f2e8d326e0"
    };
    // const app = initializeApp(firebaseConfig);
    let listas = this.service.getAllListas();
    if (listas) {
      this.listaList = listas;
    }
  }

  sendToFirestore(){
    const collectionLista = collection(this.firestore, "lista");
    this.snackBar.open("Listas enviadas ao Firestore", "ok", {
      duration: 6000,
    });
    console.log(collectionLista);
  }

  edit(id: number) {
    this.router.navigate(['/edit-list/' + id]);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '500px', disableClose: true, data: {
        title: "Tem certeza? ",
        message: "Essa ação excluirá a lista \"" + this.getListaById(id)?.name! + "\"",
      },
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.service.deleteLista(id);
        this.listaList = this.service.getAllListas();
      }
    });
  }

  getListaById(id: number): Lista | undefined {
    return this.listaList.find(value => value.id == id);
  }

  goToItems(id: number) {
    this.router.navigate(['/list/' + id]);
  }

  addLista() {
    const dialogRef = this.dialog.open(DialogNewList, {
      width: '500px', disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      (lista: Lista) => {
        if (lista != null && lista != "") {
          this.service.saveLista(lista);
          this.listaList = this.service.getAllListas();
        }
      });
  }
}
