export type TipoDocumento = 'Factura' | 'Boleta' | 'Nota de crédito';
export type Moneda = 'PEN' | 'USD';
export type Estado = 'Pendiente' | 'Pagado' | 'Vencido';
export type Persona = 'Natural' | 'Jurídica';

export interface Comprobante {
  id: string;
  cliente: string;
  ruc?: string;
  dni?: string;
  tipoDocumento: TipoDocumento;
  monto: number;
  moneda: Moneda;
  periodo: string;       // 'YYYY-MM'
  fechaEmision: string;  // libre
  estado: Estado;
  /** Se infiere en front; el API puede traerlo pero no se confía en ello */
  tipoPersona?: Persona;
  /** Vista previa (PDF o imagen) */
  urlPreview?: string;
}

export interface ComprobanteFilter {
  tipoCliente?: 'todos' | 'natural' | 'juridica';
  periodo?: string;
}
