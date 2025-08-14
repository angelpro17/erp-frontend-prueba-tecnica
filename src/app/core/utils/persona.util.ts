import type { Persona } from '../models/comprobante.model';

export function inferirTipoPersona(opts: { ruc?: string; dni?: string; cliente?: string }): Persona {
  const { ruc, dni, cliente } = opts;
  if (ruc && /^\d{11}$/.test(ruc)) return 'Jurídica';
  if (cliente && /(S\.A\.|SAC|S\.R\.L\.|SRL|EIRL|S\.A\.C\.|S\.A|S\.R\.L)/i.test(cliente)) return 'Jurídica';
  if (dni && /^\d{8}$/.test(dni)) return 'Natural';
  return 'Natural';
}
