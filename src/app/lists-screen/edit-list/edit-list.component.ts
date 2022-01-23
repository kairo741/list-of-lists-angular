import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditIcon} from "./dialog-edit-icon/dialog-edit-icon";
import {Lista} from "../../model/lista";
import {ListaService} from "../../services/lista-service";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  form!: FormGroup;
  icon?: string;
  lista?: Lista;
  id?: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private service: ListaService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  setupForm() {
    this.form = this.fb.group({
      name: [this.lista!.name!, [this.differentValueValidator(this.lista!.name!)]],
      createdDate: [{value: new Date().toLocaleString(), disabled: true}, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });

    this.lista = this.service.getLista(this.id!);
    this.setupForm();
  }

  editIcon() {
    const dialogRef = this.dialog.open(DialogEditIcon, {
      width: '500px', disableClose: true,
    });
    dialogRef.afterClosed().subscribe(
      (icon: string) => {
        if (icon != null && icon != "") {
          this.icon = icon;
        }
      });
  }

  back() {
    this.router.navigate(['/lists']);
  }

  save() {
    if (this.form?.valid!) {
      this.lista!.name = this.form.value.name;
      this.service.saveLista(this.lista);
      this.back();
    }
  }

  differentValueValidator(value?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value == value;
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
