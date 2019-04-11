import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  modif_photo: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    console.log("localStorage = ",localStorage);
    this.modif_photo = this.formBuilder.group({
      filetoupload: ['', Validators.required]
  });
  }

}
