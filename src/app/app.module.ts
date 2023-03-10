import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {MatRadioModule} from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SaveApontComponent } from './component/save-apont/save-apont.component';
import { MeusApontComponent } from './component/meus-apont/meus-apont.component';
import {CalendarModule} from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table'; // importa o módulo TableModule

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SaveApontComponent,
    MeusApontComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    MatMomentDateModule,
    MatRadioModule,
    AppRoutingModule,
    MatSlideToggleModule,
    CalendarModule,
    EditorModule,
    TableModule
  ],
  providers: [{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
