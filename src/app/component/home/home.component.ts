import { Router } from '@angular/router';
import { TransfereService } from './../../service/transfere.service';
import { ApiServiceService } from './../../service/api-service';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';


interface Profissional {
  Nome: string;
  Sistemas: string;
}
interface Demanda {
  Sistema: string;
  Demandas: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {


  //Construtor

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
    this.apontamento.get('agente')?.disable();
    this.apontamento.get('textoObs')?.disable();

  };

  //variáveis inicializadas

  data: Date = new Date();
  jsonData: any;
  title = 'form-angular';
  stateOptionsDem!: any[];
  stateOptionsImp!: any[];
  profList: Profissional[] = []; // lista de profissionais
  selectedProfissional: Profissional | null = null; //profissional Selecionado
  selectedSistema: string | undefined;//sistema Selecionado
  demandaList: string[] = [];
  profissionaisUnicos: string[] = [];
  sistemasFiltrados: string[] = [];
  etapaDemanda = ['Esforço de Entendimento','Esforço de Construção','Esforço de Teste','Esforço de Documentação']
  porquemStatus: boolean = false;
  demList: Demanda[] = [];

  isLoading: boolean = false;
  apontamento: FormGroup; //cria grupo formulário
  sistema = new FormControl('', [Validators.required]);
  profissional = new FormControl('', [Validators.required]);
  date = new FormControl(this.data, [Validators.required]);
  demanda = new FormControl('',[Validators.required]);
  demandaEmer = new FormControl('nao', [Validators.required]);
  etapaDev = new FormControl('', [Validators.required]);
  horasTrab = new FormControl('', [Validators.required]);
  percentual = new FormControl('', [Validators.required]);
  impeObs = new FormControl('nao', [Validators.required]);
  agente = new FormControl('', [Validators.required]);
  textoObs = new FormControl('', [Validators.required]);


//Métodos

 onSubmit(){
  console.log(this.apontamento.value);
 }
  ngOnInit() {
    this.getProfissionais(); // chamando o método para obter a lista de profissionais
    this.getDemandaJSON();
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
  getDemandaJSON(){
    this.apiService.getDemandaJSON().subscribe((response) => {
    this.demList = response;
    const demandaString = this.demList.map(demanda => demanda.Demandas).join(', ');
    const demandaList = demandaString.split(', ');
    this.demandaList = demandaList;
    });
    }


  onChangeImp(value: string = 'nao'): void {
    if (value === 'nao') {
      this.agente.disable(); // desabilitar o FormControl agente
    } else {
      this.agente.enable(); // habilitar o FormControl agente
    }
  }
  onChangeText(value: string = 'nao'): void {
    if (value === 'nao') {
      this.textoObs.disable(); // desabilitar o FormControl agente
    } else {
      this.textoObs.enable(); // habilitar o FormControl agente
    }
  }

  criar(){
    this.isLoading = true;
    console.log(this.apontamento);
    this.apontamento.get('agente')?.enable();
    this.apontamento.get('textoObs')?.enable();
    this.transfereService.setData(this.apontamento);
    this.router.navigateByUrl('/saveApont');
    this.isLoading = false;
  }
}
