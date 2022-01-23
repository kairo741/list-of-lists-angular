import {Component, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {ActivatedRoute, Router} from "@angular/router";
import {Lista} from "../../model/lista";
import {ItemService} from "../../services/item-service";
import {ListaService} from "../../services/lista-service";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsList: Item[] = []
  idLista?: number;
  lista?: Lista;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private service: ItemService, private listaService: ListaService) {
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
      this.idLista = parseInt(params['id']);
    });

    this.lista = this.listaService.getLista(this.idLista!);

    this.itemsList = this.service.getAllItemsByLista(this.idLista!);

  }

  addItem() {
    this.router.navigate(['/edit-item/' + this.idLista]);
  }

  edit(id: number) {
    this.router.navigate(['/edit-item/' + this.idLista + "/" + id]);
  }

  back() {
    this.router.navigate(['/lists']);
  }

}
