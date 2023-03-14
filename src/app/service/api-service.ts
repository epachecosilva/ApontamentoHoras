import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  getProfissionais(){
    return this.http.get(`${environment.apiUrl}/listaProfissionais`)
  }

  getSistemas(){
    return this.http.get(`${environment.apiUrl}/listaSistemas`)
  }

  getProfissionaisJSON(){
    return this.http.get<any>('assets/json/prof-list.json')
  }

  setResposta(resposta: any){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let respostaJSON = JSON.parse(JSON.stringify(resposta));
    return this.http.post(`${environment.apiUrl}/resposta`, respostaJSON, {headers});
  }
}
