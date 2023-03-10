import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-meus-apont',
  templateUrl: './meus-apont.component.html',
  styleUrls: ['./meus-apont.component.css']
})


export class MeusApontComponent implements OnInit {

  date: Date = new Date();
  apontamentos = [
    {profissional: 'João', dia_mes: '01/03', demanda: 82859, sistema: 'Sistema A', status: 'Em andamento', horas_dia: 6, percent_conclusao: 70, impedimento_obs: 'Nenhum'},
    {profissional: 'Maria', dia_mes: '02/03', demanda: 82860, sistema: 'Sistema B', status: 'Concluído', horas_dia: 7, percent_conclusao: 100, impedimento_obs: 'Nenhum'},
    {profissional: 'Pedro', dia_mes: '02/03', demanda: 82861, sistema: 'Sistema C', status: 'Em andamento', horas_dia: 5, percent_conclusao: 50, impedimento_obs: 'Falta de informações'},
    {profissional: 'Ana', dia_mes: '03/03', demanda: 82862, sistema: 'Sistema A', status: 'Concluído', horas_dia: 8, percent_conclusao: 100, impedimento_obs: 'Nenhum'}
  ];

  selectedApontamento: any;

  apontamentoForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.apontamentoForm = this.fb.group({
      profissional: ['', Validators.required],
      dia_mes: ['', Validators.required],
      demanda: ['', Validators.required],
      sistema: ['', Validators.required],
      status: ['', Validators.required],
      horas_dia: ['', Validators.required],
      percent_conclusao: ['', Validators.required],
      impedimento_obs: ['']
    });
    // Configuração global da PrimeNG
    this.primengConfig.ripple = true;
  }

  onRowEditInit(event: any) {
    console.log('Row edit initialized');
  }

  onRowEditSave(event: any) {
    console.log('Row edit saved');
  }

  onRowEditCancel(event: any) {
    console.log('Row edit cancelled');
  }

}
