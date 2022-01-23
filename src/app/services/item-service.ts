import {Injectable} from "@angular/core";
import {Item} from "../model/item";


const ITEM_KEY = "_ik"

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public getItem(id: number, idLista: number): any {
    let items = window.sessionStorage.getItem(idLista + ITEM_KEY);
    if (items) {
      let list = JSON.parse(items) as Item[];
      return list.find(value => value.id == id)
    }
    return null;
  }

  public getAllItemsByLista(listaId: number): any {
    let items = window.sessionStorage.getItem(listaId + ITEM_KEY);
    if (items) {
      return JSON.parse(items) as Item[];
    }
    return [];
  }

  public saveItem(item: any, listaId: number): void {
    let key = listaId + ITEM_KEY;
    let items = window.sessionStorage.getItem(key);

    if (items) {
      let list = JSON.parse(items) as Item[];
      if (item.id == null) {
        item.id = list.length;
      }
      if (list.length > 0) {
        let index = list.findIndex(value => value.id == item.id);
        if (index != -1) {
          list.splice(index, 1)
        }

        list.push(item);
        window.sessionStorage.removeItem(key);
        window.sessionStorage.setItem(key, JSON.stringify(list));
        return;
      }
    }
    item.id = 0;
    window.sessionStorage.setItem(key, JSON.stringify([item]));
    return;
  }

  public deleteItem(id: number, listaId: number): void {
    let key = listaId + ITEM_KEY;
    let items = window.sessionStorage.getItem(key);

    if (items) {
      let list = JSON.parse(items) as Item[];
      if (list.length > 0) {
        list.splice(list.findIndex(value => value.id == id), 1)
        window.sessionStorage.removeItem(key);
        window.sessionStorage.setItem(key, JSON.stringify(list));
        return;
      }
    }
    window.sessionStorage.removeItem(key);
    return;
  }

}
