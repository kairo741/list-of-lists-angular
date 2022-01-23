import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../../model/item";
import {ItemService} from "../../../services/item-service";
import {DialogDeleteComponent} from "../../../dialogs/dialog.delete.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditPhotoComponent} from "./dialog-edit-photo/dialog-edit-photo.component";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  form!: FormGroup;
  icon?: string;
  item?: Item;
  urlPhoto?: string;

  id?: number;
  idLista?: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: ItemService,
              private dialog: MatDialog
  ) {
  }

  setupForm() {
    this.form = this.fb.group({
      name: [this.item?.name, [this.differentValueValidator(this.item?.name)]],
    });
  }

  save() {
    let newItem: Item = {
      id: this.id,
      name: this.form.value.name,
      urlPhoto: this.urlPhoto,
      status: "A",
      createDate: new Date()
    }
    this.service.saveItem(newItem, this.idLista!);
    this.back();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.idLista = parseInt(params['idList']);
      let param = params['idItem'];
      if (param != null) {
        this.id = parseInt(params['idItem']);
      } else {
        this.id = undefined;
      }
    });

    if (this.id != null) {
      this.item = this.service.getItem(this.id, this.idLista!)
      this.urlPhoto = this.item?.urlPhoto;
    }

    this.setupForm();

  }

  addPhoto() {
    const dialogRef = this.dialog.open(DialogEditPhotoComponent, {
      width: '500px', disableClose: true,
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value && value != "") {
        this.urlPhoto = value
      }
    });

  }

  delete() {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '500px', disableClose: true, data: {
        title: "Tem certeza? ",
        message: "Essa ação excluirá o item \"" + this.item?.name + "\"",
      },
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.service.deleteItem(this.id!, this.idLista!);
        this.back();
      }
    });
  }

  back() {
    this.router.navigate(['/list/' + this.idLista]);
  }

  differentValueValidator(value?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value == value;
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
