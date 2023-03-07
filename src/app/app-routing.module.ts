import { HomeComponent } from './component/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveApontComponent } from './component/save-apont/save-apont.component';


const routes: Routes = [
 { path: '', component: HomeComponent},
 { path: 'saveApont', component: SaveApontComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
