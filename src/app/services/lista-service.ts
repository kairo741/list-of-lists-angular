import {Injectable} from "@angular/core";
import {Item} from "../model/item";
import {Lista} from "../model/lista";


const LISTA_KEY = "_lk"

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public getLista(id: number): any {
    let listas = window.sessionStorage.getItem(LISTA_KEY);
    if (listas) {
      let list = JSON.parse(listas) as Lista[];
      return list.find(value => value.id == id)
    }
    return null;
  }

  public getAllListas(): any {
    let listas = window.sessionStorage.getItem(LISTA_KEY);

    if (listas) {
      return JSON.parse(listas) as Lista[];
    }
    return null;
  }

  public saveLista(lista: any): void {
    let listas = window.sessionStorage.getItem(LISTA_KEY);

    if (listas) {
      let list = JSON.parse(listas) as Lista[];
      if (lista.id == null) {
        lista.id = list.length;
      }
      if (list.length > 0) {
        let index = list.findIndex(value => value.id == lista.id);
        if (index != -1) {
          list.splice(index, 1)
        }

        list.push(lista);
        window.sessionStorage.removeItem(LISTA_KEY);
        window.sessionStorage.setItem(LISTA_KEY, JSON.stringify(list));
        return;
      }
    }
    lista.id = 0;
    window.sessionStorage.setItem(LISTA_KEY, JSON.stringify([lista]));
    return;
  }

  public deleteLista(id: number): void {
    let listas = window.sessionStorage.getItem(LISTA_KEY);

    if (listas) {
      let list = JSON.parse(listas) as Lista[];
      if (list.length > 0) {
        list.splice(list.findIndex(value => value.id == id), 1)
        window.sessionStorage.removeItem(LISTA_KEY);
        window.sessionStorage.setItem(LISTA_KEY, JSON.stringify(list));
        return;
      }
    }

    window.sessionStorage.removeItem(LISTA_KEY);
    return;
  }

}
