import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Item} from "../../../model/item";

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

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
  ) {
    this.setupForm();
  }

  setupForm() {
    // todo - pegar o valor certo para a comparação
    this.form = this.fb.group({
      name: [null, [this.differentValueValidator(this.item?.name)]],
    });
  }

  save() {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let param = params['id'];
      if (param != null) {
        this.id = parseInt(params['id']);
      } else {
        this.id = undefined;
      }
    });

  }


  back() {
    this.router.navigate(['/list/' + this.item?.idList]);
  }

  differentValueValidator(value?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value == value;
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
