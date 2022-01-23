import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-photo',
  templateUrl: './dialog-edit-photo.component.html',
  styleUrls: ['./dialog-edit-photo.component.css']
})
export class DialogEditPhotoComponent implements OnInit {
  form!: FormGroup;

  valid: boolean = true;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<string>) {
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.fb.group({
      url: [null, [Validators.required]],
    });
  }

  save() {
    if (this.form.valid) {
      if (this.validURL(this.form.value.url!)) {
        this.dialogRef.close(this.form.value.url!);
      } else {
        this.valid = false;
      }
    }
  }


  validURL(url: string): boolean {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
  }

}
