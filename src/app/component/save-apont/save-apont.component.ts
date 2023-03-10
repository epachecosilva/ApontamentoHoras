import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-save-apont',
  templateUrl: './save-apont.component.html',
  styleUrls: ['./save-apont.component.css']
})
export class SaveApontComponent {
  title = 'form-angular';
  date: Date = new Date();
  isChecked = false;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });
  isImp = false;
  formGroupImp = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  constructor(private _formBuilder: FormBuilder) {}

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
export class RadioOverviewExample {}
export class FormFieldOverviewExample {}
