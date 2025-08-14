import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ComprobantesService } from "../../../../core/services/comprobantes.service";
import type { Comprobante } from "../../../../core/models/comprobante.model";

@Component({
  selector: "app-comprobante-detail",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./comprobante-detail.component.html",
  styleUrl: "./comprobante-detail.component.css",
})
export class ComprobanteDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private comprobantesService = inject(ComprobantesService);

  comprobante: Comprobante | null = null;
  isLoading = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.loadComprobante(id);
    }
  }

  loadComprobante(id: string): void {
    this.isLoading = true;
    this.comprobantesService.getComprobanteById(id).subscribe({
      next: (data) => {
        this.comprobante = data || null;
        this.isLoading = false;
      },
      error: () => {
        this.comprobante = null;
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(["/dashboard/comprobantes"]);
  }

  getDocumentChipClass(tipoDocumento: string): string {
    switch (tipoDocumento) {
      case "Factura": return "chip-factura";
      case "Boleta": return "chip-boleta";
      case "Nota de crédito": return "chip-nota";
      default: return "";
    }
  }

  getStatusChipClass(estado: string): string {
    switch (estado) {
      case "Pendiente": return "chip-pendiente";
      case "Pagado": return "chip-pagado";
      case "Vencido": return "chip-vencido";
      default: return "";
    }
  }

  generatePDF(): void {
    const DATA = document.getElementById('pdf-content') as HTMLElement;

    html2canvas(DATA, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      ignoreElements: (el) => {
        const style = getComputedStyle(el);
        return style.color.includes('color('); // Evita error de color()
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`comprobante_${this.comprobante?.id}.pdf`);
    });
  }

  printPage(): void {
    window.print();
  }
}
