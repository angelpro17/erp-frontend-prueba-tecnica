import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ComprobantesService } from '../../../../core/services/comprobantes.service';
import type { Comprobante, ComprobanteFilter } from '../../../../core/models/comprobante.model';

@Component({
  selector: 'app-comprobantes-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './comprobantes-list.component.html',
  styleUrls: ['./comprobantes-list.component.css'],
})
export class ComprobantesListComponent implements OnInit {
  private comprobantesService = inject(ComprobantesService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  comprobantes: Comprobante[] = [];
  periodos: string[] = [];
  isLoading = false;

  filterForm: FormGroup = this.fb.group({
    tipoCliente: ['todos'],
    periodo: ['todos'],
  });

  displayedColumns: string[] = [
    'cliente',
    'tipoDocumento',
    'monto',
    'periodo',
    'fechaEmision',
    'tipoPersona',
    'acciones',
  ];

  ngOnInit(): void {
    this.loadPeriodos();
    this.loadComprobantes();
    this.filterForm.valueChanges.subscribe(() => this.loadComprobantes());
  }

  loadComprobantes(): void {
    this.isLoading = true;
    const v = this.filterForm.value;
    const filters: ComprobanteFilter = {
      tipoCliente: v.tipoCliente === 'todos' ? undefined : v.tipoCliente,
      periodo: v.periodo === 'todos' ? undefined : v.periodo,
    };
    this.comprobantesService.getComprobantes(filters).subscribe({
      next: data => { this.comprobantes = data; this.isLoading = false; },
      error: () => { this.comprobantes = []; this.isLoading = false; }
    });
  }

  loadPeriodos(): void {
    this.comprobantesService.getPeriodos().subscribe({ next: ps => this.periodos = ps });
  }

  clearFilters(): void {
    this.filterForm.patchValue({ tipoCliente: 'todos', periodo: 'todos' });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/dashboard/comprobantes', id]);
  }

  getDocumentChipClass(tipoDocumento: string): string {
    switch (tipoDocumento) {
      case 'Factura': return 'chip-factura';
      case 'Boleta': return 'chip-boleta';
      case 'Nota de crédito': return 'chip-nota';
      default: return '';
    }
  }
}
