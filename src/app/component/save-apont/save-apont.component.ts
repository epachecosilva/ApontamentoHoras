import { TransfereService } from './../../service/transfere.service';
import { Router } from '@angular/router';
import { ApiServiceService } from './../../service/api-service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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


  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiServiceService, // injetando o serviço de API
    private transfereService: TransfereService,
    private router: Router
  ) {
    this.stateOptionsDem = [{label: 'Não', value: 'Não'}, {label: 'Sim', value: 'Sim'}];
    this.stateOptionsImp = [{label: 'Não', value: 'Não'}, {label: 'Sim', value: 'Sim'}];
    this.apontamento = this._formBuilder.group({
      profissional: this.profissional,
      sistema: this.sistema,
      date: this.date,
      demandaEmer: this.demandaEmer,
      etapaDev: this.etapaDev,
      horasTrab: this.horasTrab,
      percentual: this.percentual,
      impeObs: this.impeObs,
      agente: this.agente,
      textoObs: this.textoObs
  });
    this.apontRev = this.apontamento;
  }

  data: Date = new Date();
  title = 'form-angular';
  stateOptionsDem!: any[];
  stateOptionsImp!: any[];
  imp: string | undefined;
  profList: Profissional[] = []; // lista de profissionais
  selectedProfissional: Profissional | null = null; //profissional Selecionado
  selectedSistema: string | undefined;
  profissionaisUnicos: string[] = []; //sistema Selecionado
  sistemasFiltrados: string[] = [];
  mostrarPorQuem = false;
  mostrarObservacoes = false;
  etapaDemanda = ['Esforço de Entendimento','Esforço de Construção','Esforço de Teste','Esforço de Documentação']


  isLoading: boolean = false;
  apontamento: FormGroup;
  apontRev: FormGroup;
  sistema = new FormControl('', [Validators.required]);
  profissional = new FormControl('', [Validators.required]);
  date = new FormControl(this.data, [Validators.required]);
  demandaEmer = new FormControl('Não', [Validators.required]);
  etapaDev = new FormControl('', [Validators.required]);
  horasTrab = new FormControl('', [Validators.required]);
  percentual = new FormControl('', [Validators.required]);
  impeObs = new FormControl('Não', [Validators.required]);
  agente = new FormControl('spassu', [Validators.required]);
  textoObs = new FormControl('', [Validators.required]);

 onSubmit(){
  console.log(this.apontamento.value);
 }
  ngOnInit() {
    this.getProfissionais(); // chamando o método para obter a lista de profissionais
    this.apontRev = this.transfereService.getData();
    this.apontamento.setValue(this.apontRev.value);
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
  onImpedimentoChange() {
    if (this.impeObs.value === 'Sim') {
      this.mostrarPorQuem = true;
      this.mostrarObservacoes = true;
    } else {
      this.mostrarPorQuem = false;
      this.mostrarObservacoes = false;
    }
  }

  criar(){
    this.isLoading = true;
    console.log(this.apontamento);
    this.transfereService.setData(this.apontamento);
    this.router.navigateByUrl('/saveApont');
    this.isLoading = false;
  }
}

export class RadioOverviewExample {}
export class FormFieldOverviewExample {}
