import { ApiServiceService } from './../../service/api-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';


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

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiServiceService // injetando o serviço de API
  ) {
    this.stateOptionsDem = [{label: 'Não', value: 'Não'}, {label: 'Sim', value: 'Sim'}];
    this.stateOptionsImp = [{label: 'Não', value: 'Não'}, {label: 'Sim', value: 'Sim'}];
  }

  router: any;
  date: Date = new Date();
  title = 'form-angular';
  stateOptionsDem!: any[];
  stateOptionsImp!: any[];
  imp: string | undefined;
  impeObs: string = "Não";
  demandaEmer: string = "Não";
  profList: Profissional[] = []; // lista de profissionais
  selectedProfissional: Profissional | null = null; //profissional Selecionado
  selectedSistema: string | undefined;
  profissionaisUnicos: string[] = []; //sistema Selecionado
  sistemasFiltrados: string[] = [];
  mostrarPorQuem = false;
  mostrarObservacoes = false;

  apontamento = new FormGroup({
    prof: new FormControl('')
  })
 onSubmit(){
  console.log(this.apontamento.value);
 }
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
