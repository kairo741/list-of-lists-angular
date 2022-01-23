import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../../model/item";
import {ItemService} from "../../../services/item-service";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  form!: FormGroup;
  icon?: string;
  item?: Item;

  id?: number;
  idLista?: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: ItemService,
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
    }

    this.setupForm();

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
