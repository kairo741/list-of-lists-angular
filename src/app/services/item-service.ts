import {Injectable} from "@angular/core";
import {Item} from "../model/item";


const ITEM_KEY = "_ik"

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public getItem(id: number): any {
    let items = window.sessionStorage.getItem(ITEM_KEY);
    if (items) {
      let list = JSON.parse(items) as Item[];
      return list.find(value => value.id == id)
    }
    return null;
  }

  public getAllItems(): any {
    return window.sessionStorage.getItem(ITEM_KEY);
  }

  public saveItem(item: any): void {
    let items = window.sessionStorage.getItem(ITEM_KEY);

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
        window.sessionStorage.removeItem(ITEM_KEY);
        window.sessionStorage.setItem(ITEM_KEY, JSON.stringify(list));
        return;
      }
    }
    item.id = 0;
    window.sessionStorage.setItem(ITEM_KEY, JSON.stringify([item]));
    return;
  }

  public deleteItem(id: number): void {
    let items = window.sessionStorage.getItem(ITEM_KEY);

    if (items) {
      let list = JSON.parse(items) as Item[];
      if (list.length > 0) {
        list.splice(list.findIndex(value => value.id == id), 1)
        window.sessionStorage.removeItem(ITEM_KEY);
        window.sessionStorage.setItem(ITEM_KEY, JSON.stringify(list));
        return;
      }
    }

    window.sessionStorage.removeItem(ITEM_KEY);
    return;
  }

}
