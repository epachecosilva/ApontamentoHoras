import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
