import { TransfereService } from './../../service/transfere.service';
import { Router } from '@angular/router';
import { ApiServiceService } from './../../service/api-service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

interface Profissional {
  Nome: string;
  Sistemas: string;
}
interface Demanda {
  Sistema: string;
  Demandas: string;
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
    this.stateOptionsDem = [{label: 'Não', value: 'nao'}, {label: 'Sim', value: 'sim'}];
    this.stateOptionsImp = [{label: 'Não', value: 'nao'}, {label: 'Sim', value: 'sim'}];
    this.apontamento = this._formBuilder.group({
      profissional: this.profissional,
      sistema: this.sistema,
      date: this.date,
      demanda: this.demanda,
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
  profList: Profissional[] = []; // lista de profissionais
  selectedProfissional: Profissional | null = null; //profissional Selecionado
  selectedSistema: string | undefined;
  profissionaisUnicos: string[] = []; //sistema Selecionado
  sistemasFiltrados: string[] = [];
  etapaDemanda = ['Esforço de Entendimento','Esforço de Construção','Esforço de Teste','Esforço de Documentação']
  demList: Demanda[] = [];
  demandaList: string[] = [];

  isLoading: boolean = false;

  apontamento: FormGroup;
  apontRev: FormGroup;
  sistema = new FormControl('', [Validators.required]);
  profissional = new FormControl('', [Validators.required]);
  date = new FormControl(this.data, [Validators.required]);
  demanda = new FormControl('',[Validators.required]);
  demandaEmer = new FormControl('', [Validators.required]);
  etapaDev = new FormControl('', [Validators.required]);
  horasTrab = new FormControl('', [Validators.required,Validators.maxLength(5),Validators.min(1),Validators.max(12)]);
  percentual =  new FormControl('', [Validators.required,Validators.maxLength(3),Validators.max(100)]);
  impeObs = new FormControl('', [Validators.required]);
  agente = new FormControl('', [Validators.required]);
  textoObs = new FormControl('', [Validators.required]);

 onSubmit(){
  console.log(this.apontamento.value);
 }
  ngOnInit() {
    this.getProfissionais(); // chamando o método para obter a lista de profissionais
    this.apontRev = this.transfereService.getData();
    this.getDemanda(this.apontRev.get('sistema')?.value);
    this.apontamento.setValue(this.apontRev.value);
    console.log(this.apontamento.value);
    if(this.apontamento.get('impeObs')?.value === 'nao'){
      this.apontamento.get('agente')?.disable();
      this.apontamento.get('textoObs')?.disable();
    }
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

  getSistemas(nome: string) {
    this.apiService.getProfissionaisJSON().subscribe((response) => {
      let sistemas = response.filter( function (e: any) {
      return e.Nome == nome
    });
    sistemas = sistemas.reduce(
      (sistemas: string[], profissional:any) => {
        if (!sistemas.includes(profissional.Sistemas)) {
          sistemas.push(profissional.Sistemas);

        }
        return sistemas;
          },
          []
        );
        this.sistemasFiltrados = sistemas;
        if(this.sistemasFiltrados.length > 0){
          this.apontamento.get('sistema')?.enable();
        }
    });
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
    getDemanda(sistema: string){
      this.apiService.getDemandaJSON().subscribe((response) => {
        let demandas = response.filter( function (e: any) {
        return e.Sistema == sistema
      });
      demandas = demandas.reduce(
        (demandas: string[], demanda:any) => {
          if (!demandas.includes(demanda.Demandas)) {
            demandas.push(demanda.Demandas);

          }
          return demandas;
            },
            []
          );
          this.demandaList = demandas;
          if(this.demandaList.length > 0){
            this.apontamento.get('demanda')?.enable();
          }
      });
    }
  onChangeImp(value: string = 'nao'): void {
    if (value === 'nao') {
      this.agente.disable(); // desabilitar o FormControl agente
      this.agente.reset('');
    } else {
      this.agente.enable(); // habilitar o FormControl agente
    }
  }
  onChangeText(value: string = 'nao'): void {
    if (value === 'nao') {
      this.textoObs.disable(); // desabilitar o FormControl agente
      this.textoObs.reset('');
    } else {
      this.textoObs.enable(); // habilitar o FormControl agente
    }
  }

  selectedProf(evento: MatSelectChange){
    this.getSistemas(evento.value);
    this.apontamento.get('sistema')?.reset();
    this.apontamento.get('demanda')?.reset()
  }
  selectedSist(evento: MatSelectChange){
    this.getDemanda(evento.value);
  }

  salvar(){
    if(this.apontamento.invalid){
      return;
    }
    this.router.navigateByUrl('/');
  }
}

export class RadioOverviewExample {}
export class FormFieldOverviewExample {}
