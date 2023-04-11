import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  getProfissionais(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}/listaProfissionais`, { headers, withCredentials: true })
  }

  getSistemas(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}/listaSistemas`, { headers, withCredentials: true })
  }

  getProfissionaisJSON(){
    return this.http.get<any>('assets/json/prof-list.json')
  }
  getDemandaJSON(){
    return this.http.get<any>('assets/json/sist-dem.json')
  }


  setResposta(resposta: any){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    let respostaJSON = JSON.parse(JSON.stringify(resposta));
    return this.http.post(`${environment.apiUrl}/resposta`, respostaJSON, {headers});
  }
}
