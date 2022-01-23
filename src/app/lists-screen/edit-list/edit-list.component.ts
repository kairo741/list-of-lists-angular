import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditIcon} from "./dialog-edit-icon/dialog-edit-icon";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  form!: FormGroup;
  icon?: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
  ) {
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

  differentValueValidator(value?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value == value;
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
