import { ApiServiceService } from './../../service/api-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Profissional {
  Nome: string;
  Sistemas: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  router: any;
  date: Date = new Date();
  title = 'form-angular';
  isChecked: boolean = false;
  isChecked2: boolean = false;
  profList: Profissional[] = []; // lista de profissionais
  selectedProfissional: Profissional | null = null; //profissional Selecionado
  selectedSistema: string | undefined;
  profissionaisUnicos: string[] = []; //sistema Selecionado
  sistemasFiltrados: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiServiceService // injetando o serviço de API
  ) {}

  ngOnInit() {
    this.getProfissionais(); // chamando o método para obter a lista de profissionais
  }

  onClick() {
    this.router.navigate(['/saveApont']);
    throw new Error('Method not implemented.');
  }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }

  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  isImp = false;

  formGroupImp = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  getProfissionais() {
    this.apiService.getProfissionaisJSON().subscribe((response) => {
      this.profList = response;
      const profissionaisUnicos = this.profList.reduce(
        (nomes: string[], profissional) => {
          if (!nomes.includes(profissional.Nome)) {
            nomes.push(profissional.Nome);
          }
          return nomes;
        },
        []
      );
      this.profissionaisUnicos = profissionaisUnicos;

      const sistemas = this.profList.flatMap(p => p.Sistemas).filter((item, index, self) => self.indexOf(item) === index);
      this.sistemasFiltrados = Array.from(new Set(sistemas));
    });
  }

  selecionarProfissional() {
    const profissionalSelecionado = this.profList.find(p => p.Nome === this.selectedProfissional?.Nome);
    this.sistemasFiltrados = profissionalSelecionado ? profissionalSelecionado.Sistemas.split(', ') : [];
    this.selectedSistema = undefined;
  }
}
