import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/components/login/login.component").then(
        (m) => m.LoginComponent
      ),
    title: "Iniciar Sesión",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./features/dashboard/components/dashboard-layout/dashboard-layout.component").then(
        (m) => m.DashboardLayoutComponent
      ),
    canActivate: [authGuard],
    title: "Dashboard",
    children: [
      {
        path: "",
        redirectTo: "comprobantes",
        pathMatch: "full",
      },
      {
        path: "comprobantes",
        loadComponent: () =>
          import("./features/comprobantes/components/comprobantes-list/comprobantes-list.component").then(
            (m) => m.ComprobantesListComponent
          ),
        title: "Lista de Comprobantes",
      },
      {
        path: "comprobantes/:id",
        loadComponent: () =>
          import("./features/comprobantes/components/comprobante-detail/comprobante-detail.component").then(
            (m) => m.ComprobanteDetailComponent
          ),
        title: "Detalle de Comprobante",
      },
    ],
  },
  {
    path: "page-not-found-404",
    loadComponent: () =>
      import("./features/dashboard/components/page-not-found/page-not-found.component").then(
        (m) => m.PageNotFoundComponent
      ),
    title: "404 - Página no encontrada | ERP Game",
  },
  {
    path: "**",
    redirectTo: "/page-not-found-404", // Cambiado para ir a la página 404 con el juego
  },
];

