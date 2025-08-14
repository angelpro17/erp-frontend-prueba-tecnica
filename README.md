# Sistema ERP - Prueba Técnica Frontend

Sistema de gestión de comprobantes desarrollado con Angular 19, Angular Material y JSON Server para fake API.

## 🚀 Características

- **Autenticación simulada** con JWT y AuthGuard
- **Fake API** con JSON Server para consumo real de datos
- **Gestión de comprobantes** con filtros avanzados
- **Vista detallada** de comprobantes con preview
- **Arquitectura limpia** con componentes standalone
- **Responsive design** con Angular Material
- **TypeScript** con tipado estricto


## 🛠️ Tecnologías

- **Angular 19** con componentes standalone
- **Angular Material** para UI/UX
- **JSON Server** para fake API REST
- **TypeScript** con configuración estricta
- **RxJS** para programación reactiva
- **Angular Router** con lazy loading
- **CSS** (no SCSS) para estilos

## 📱 Funcionalidades

### 1. Login Simulado
- Formulario reactivo con validaciones
- Simulación de JWT token
- AuthGuard para proteger rutas
- Credenciales de prueba incluidas

### 2. Gestión de Comprobantes
- Listado con tabla responsive
- Filtros por tipo de cliente y período (formato YYYY-MM)
- Diferenciación entre personas naturales y jurídicas
- Navegación a vista detallada
- Consumo de API REST con JSON Server

### 3. Detalle de Comprobante
- Información completa del documento
- Vista previa mockup del comprobante
- Identificación automática de tipo de persona
- Acciones de descarga e impresión (simuladas)

## 🚀 Instalación y Ejecución

\`\`\`bash
# Instalar dependencias
npm install

# Opción 1: Ejecutar Angular y JSON Server por separado
# Terminal 1 - JSON Server (puerto 3001)
npm run json-server

# Terminal 2 - Angular (puerto 4200)
npm start

# Opción 2: Ejecutar ambos simultáneamente
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test
\`\`\`

## 🌐 API Endpoints

JSON Server ejecutándose en `http://localhost:3001`:

- `GET /comprobantes` - Obtener todos los comprobantes
- `GET /comprobantes/:id` - Obtener comprobante por ID
- `GET /auth/users` - Obtener usuarios para autenticación

## 🔐 Credenciales de Prueba

- **Admin**: admin@empresa.com / admin123
- **Usuario**: usuario@empresa.com / usuario123

## 📊 Datos de Prueba

El sistema incluye 5 comprobantes de ejemplo con diferentes:
- Tipos de documento (Factura, Boleta, Nota de crédito)
- Clientes naturales y jurídicos
- Períodos en formato YYYY-MM (2024-11, 2024-12)
- Montos en PEN y USD
- Estados de pago

## 🎨 Diseño

- **Diseño profesional** sin gradientes llamativos
- **Colores corporativos** azul y gris
- **Material Design** con tema personalizado
- **Responsive** para móviles y desktop
- **Accesibilidad** con ARIA labels
- **UX optimizada** con loading states y feedback

## 🔧 Configuración

- **Standalone Components** para mejor tree-shaking
- **Lazy Loading** para optimización de carga
- **HTTP Client** para consumo de API REST
- **Interceptores** para manejo automático de tokens
- **Guards** para protección de rutas
- **Servicios** con inyección de dependencias moderna
- **Fallback** a datos mock si falla JSON Server

## 📝 Scripts Disponibles

- `npm start` - Ejecutar Angular en desarrollo
- `npm run json-server` - Ejecutar JSON Server en puerto 3001
- `npm run dev` - Ejecutar Angular y JSON Server simultáneamente
- `npm run mock:server` - Alias para json-server
- `npm run build` - Construir para producción
- `npm test` - Ejecutar tests unitarios


## 📝 Notas Técnicas

- Uso de `inject()` function en lugar de constructor injection
- Componentes standalone sin NgModules
- Reactive Forms con validaciones
- Observables y async pipe para manejo de estado
- HTTP Client para consumo de API REST
- Manejo de errores con fallback a datos mock
- CSS separado por componente (no SCSS)
- Arquitectura limpia y escalable

## 🚨 Requisitos

- Node.js 18+
- Angular CLI 19+
- Puerto 3001 disponible para JSON Server
- Puerto 4200 disponible para Angular
