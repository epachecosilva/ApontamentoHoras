import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  router: any;
  date: Date = new Date();
onClick() {
  this.router.navigate(['/saveApont']);
throw new Error('Method not implemented.');
}
  title = 'form-angular';
  selectedDate: Date = new Date();
  datePipe: any;
  onDateChange(event: any) {
    console.log(event);
    console.log(this.datePipe.transform(this.selectedDate, 'dd/MM/yyyy'));
  }
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
