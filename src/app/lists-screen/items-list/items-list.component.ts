import {Component, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {ActivatedRoute, Router} from "@angular/router";
import {Lista} from "../../model/lista";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsList: Item[] = []

  id?: number;
  lista?: Lista;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,) {
    for (let i = 0; i < 4; i++) {
      let itemTeste: Item = {
        id: i,
        // icon: "edit",
        name: "Item " + i,
      }
      this.itemsList.push(itemTeste)
    }

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
  }

  addItem() {
  }

  edit(id: number) {
    this.router.navigate(['/edit-item/' + id]);
  }

  back() {
    this.router.navigate(['/lists']);
  }

}
