import {Component, OnInit} from '@angular/core';
import {Lista} from "../model/lista";

@Component({
  selector: 'app-lists-screen',
  templateUrl: './lists-screen.component.html',
  styleUrls: ['./lists-screen.component.css']
})
export class ListsScreenComponent implements OnInit {

  listList: Lista[] = []

  constructor() {
  }

  ngOnInit(): void {

    for (let i = 0; i < 10; i++) {
      let listaTeste: Lista = {
        icon: "edit",
        name: "Lista " + i,
      }
      this.listList.push(listaTeste)

    }


  }

}
