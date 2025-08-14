import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { Comprobante, ComprobanteFilter } from '../models/comprobante.model';
import { inferirTipoPersona } from '../utils/persona.util';

@Injectable({ providedIn: 'root' })
export class ComprobantesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/comprobantes';

  getComprobantes(filter?: ComprobanteFilter): Observable<Comprobante[]> {
    return this.http.get<Comprobante[]>(this.apiUrl).pipe(
      map(list =>
        list.map(c => ({
          ...c,
          // Se ignora el tipoPersona del API y se infiere en front:
          tipoPersona: inferirTipoPersona({ ruc: c.ruc, dni: c.dni, cliente: c.cliente })
        }))
      ),
      map(comprobantes => {
        let filtered = [...comprobantes];
        if (filter?.tipoCliente && filter.tipoCliente !== 'todos') {
          const tipo = filter.tipoCliente === 'natural' ? 'Natural' : 'Jurídica';
          filtered = filtered.filter(c => c.tipoPersona === tipo);
        }
        if (filter?.periodo && filter.periodo !== 'todos') {
          filtered = filtered.filter(c => c.periodo === filter.periodo);
        }
        return filtered;
      }),
      catchError(err => {
        console.error('Error al cargar comprobantes desde API:', err);
        return of([]);
      })
    );
  }

  getComprobanteById(id: string): Observable<Comprobante | undefined> {
    return this.http.get<Comprobante>(`${this.apiUrl}/${id}`).pipe(
      map(c => c ? { ...c, tipoPersona: inferirTipoPersona({ ruc: c.ruc, dni: c.dni, cliente: c.cliente }) } : undefined),
      catchError(err => {
        console.error('Error al cargar comprobante desde API:', err);
        return of(undefined);
      })
    );
  }

  getPeriodos(): Observable<string[]> {
    return this.http.get<Comprobante[]>(this.apiUrl).pipe(
      map(items => Array.from(new Set(items.map(i => i.periodo))).sort()),
      catchError(err => {
        console.error('Error al cargar períodos desde API:', err);
        return of([]);
      })
    );
  }
}
