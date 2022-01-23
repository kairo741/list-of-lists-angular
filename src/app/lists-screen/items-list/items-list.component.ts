import {Component, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsList: Item[] = []


  constructor(private router: Router) {
    for (let i = 0; i < 4; i++) {
      let itemTeste: Item = {
        id: i,
        // icon: "edit",
        name: "Lista " + i,
      }
      this.itemsList.push(itemTeste)
    }

  }

  ngOnInit(): void {
  }

  addItem() {
  }

  goToDetails() {
  }

  back() {
    this.router.navigate(['/lists']);
  }


}
