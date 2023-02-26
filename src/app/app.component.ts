import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'form-angular';
  selectedDate: Date = new Date();
  datePipe: any;
  onDateChange(event: any) {
    console.log(event);
    console.log(this.datePipe.transform(this.selectedDate, 'dd/MM/yyyy'));
  }
}
export class RadioOverviewExample {}
export class FormFieldOverviewExample {}


