import {Component, OnInit} from '@angular/core';
import {Lista} from "../model/lista";
import {DialogNewList} from "./dialog-new-list/dialog-new-list";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-lists-screen',
  templateUrl: './lists-screen.component.html',
  styleUrls: ['./lists-screen.component.css']
})
export class ListsScreenComponent implements OnInit {

  listaList: Lista[] = []

  constructor(private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      let listaTeste: Lista = {
        icon: "edit",
        name: "Lista " + i,
      }
      this.listaList.push(listaTeste)
    }
  }

  addLista() {

    const dialogRef = this.dialog.open(DialogNewList, {
      width: '500px', disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      (lista: Lista) => {
        if (lista != null && lista != "") {
          this.listaList.push(lista)
        }
      });
  }
}
