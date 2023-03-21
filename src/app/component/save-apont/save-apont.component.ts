import { ApiServiceService } from './../../service/api-service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Profissional {
  Nome: string;
  Sistemas: string;
}

@Component({
  selector: 'app-save-apont',
  templateUrl: './save-apont.component.html',
  styleUrls: ['./save-apont.component.css']
})
export class SaveApontComponent implements OnInit {

  @Input() prof: any;

  router: any;
  date: Date = new Date();
  title = 'form-angular';
  stateOptionsDem!: any[];
  stateOptionsImp!: any[];
  impeObs: string = "Não";
  demandaEmer: string = "Não";
  profList: Profissional[] = []; // lista de profissionais
  selectedProfissional: Profissional | null = null; //profissional Selecionado
  selectedSistema: string | undefined;
  profissionaisUnicos: string[] = []; //sistema Selecionado
  sistemasFiltrados: string[] = [];
  mostrarPorQuem = false;
  mostrarObservacoes = false;

  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });
  isImp = false;
  formGroupImp = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiServiceService // injetando o serviço de API
  ) {
    this.stateOptionsDem = [{label: 'Não', value: 'Não'}, {label: 'Sim', value: 'Sim'}];
    this.stateOptionsImp = [{label: 'Não', value: 'Não'}, {label: 'Sim', value: 'Sim'}];
  }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
  ngOnInit() {
    this.getProfissionais(); // chamando o método para obter a lista de profissionais
  }
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

  onImpedimentoChange() {
    if (this.impeObs === 'Sim') {
      this.mostrarPorQuem = true;
      this.mostrarObservacoes = true;
    } else {
      this.mostrarPorQuem = false;
      this.mostrarObservacoes = false;
    }
  }
}
export class RadioOverviewExample {}
export class FormFieldOverviewExample {}
