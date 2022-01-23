import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Lista} from "../../model/lista";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,) {
    this.setupForm();
  }

  setupForm() {
    // todo - pegar o valor certo para a comparação
    this.form = this.fb.group({
      name: [null, [this.differentValueValidator("!")]],
      createdDate: [{value: new Date().toLocaleString(), disabled: true}, [Validators.required]],
    });
  }

  save() {
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['/lists']);
  }

  differentValueValidator(value?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value == value;
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
