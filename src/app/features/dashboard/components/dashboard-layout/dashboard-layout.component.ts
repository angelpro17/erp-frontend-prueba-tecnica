import { Component, inject } from "@angular/core"
import { Router, RouterOutlet } from "@angular/router"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import { CommonModule } from "@angular/common"

import { AuthService } from "../../../../core/services/auth.service"

@Component({
  selector: "app-dashboard-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: "./dashboard-layout.component.html",
  styleUrl: "./dashboard-layout.component.css",
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService)

  currentUser = this.authService.getCurrentUser()

  logout(): void {
    this.authService.logout()
  }
}
