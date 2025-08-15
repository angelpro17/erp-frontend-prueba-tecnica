# Sistema ERP - Prueba Técnica Frontend

Sistema de gestión de comprobantes desarrollado con Angular 19, Angular Material y JSON Server para fake API.

## 🚀 Características

- **Autenticación simulada** con JWT y AuthGuard
- **Fake API** con JSON Server para consumo real de datos
- **Gestión de comprobantes** con filtros (Lógica)
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

## 📱 Funcionalidades

### 1. Login Simulado
- Formulario reactivo con validaciones
- Simulación de JWT token
- AuthGuard para proteger rutas
- Credenciales de prueba incluidas
- Diseño limpio sin gradientes llamativos

### 2. Gestión de Comprobantes
- Listado con tabla responsive
- Filtros funcionales por tipo de cliente y período
- Diferenciación entre personas naturales y jurídicas
- Navegación a vista detallada
- **Consumo exclusivo de API fake del puerto 3000**

### 3. Detalle de Comprobante
- Información completa del documento
- Vista previa mockup del comprobante
- Identificación automática de tipo de persona
- Acciones de descarga e impresión (simuladas)

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
# Clonar el repositorio
git clone https://github.com/erp-reclutamiento/prueba-frontend-Luis-Angel-Anampa-Lavado.git

# Navegar al directorio del proyecto
cd prueba-frontend-Luis-Angel-Anampa-Lavado/Modulo-ERP
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Instalar JSON Server globalmente
```bash
npm install -g json-server
```

### 4. Ejecutar JSON Server (Puerto 3000 - OBLIGATORIO)
```bash
# Terminal 1 - JSON Server
cd assets
json-server --watch db.json --port 3000
```

### 5. Ejecutar Angular (Puerto 4200)
```bash
# Terminal 2 - Angular
npm run start
```

### Comandos npm alternativos
```bash

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

## 🌐 API Endpoints

JSON Server ejecutándose en `http://localhost:3000`:

- `GET /auth` - Obtener datos de autenticación (contiene array users)
- `GET /comprobantes` - Obtener todos los comprobantes
- `GET /comprobantes/:id` - Obtener comprobante por ID

**IMPORTANTE**: El sistema consume **ÚNICAMENTE** la API fake del puerto 3000, no hay fallback a otros JSON.

## 🔐 Credenciales de Prueba

- **Admin**: `admin@empresa.com` / `admin123`
- **Usuario**: `usuario@empresa.com` / `usuario123`

## 📊 Datos de Prueba

El sistema incluye 5 comprobantes de ejemplo con diferentes:
- Tipos de documento (Factura, Boleta, Nota de crédito)
- Clientes naturales y jurídicos
- Períodos en formato YYYY-MM (2024-11, 2024-12)
- Montos en PEN y USD
- Estados y fechas de emisión

## 🔧 Configuración Técnica

- **Standalone Components** para mejor tree-shaking
- **Lazy Loading** para optimización de carga
- **HTTP Client** configurado para puerto 3000 únicamente
- **Interceptores** para manejo automático de tokens
- **Guards** para protección de rutas
- **Servicios** con inyección moderna usando `inject()`
- **Filtros** que funcionan correctamente

## 🔍 Filtros Funcionales

- **Tipo de Cliente**: Natural, Jurídica, Todos los clientes
- **Período**: Formato YYYY-MM (2024-11, 2024-12, Todos los períodos)
- **Limpiar Filtros**: Botón para resetear todos los filtros

## 🚨 Requisitos

- Node.js 18+
- Angular CLI 19+
- **Puerto 3000 disponible para JSON Server**
- Puerto 4200 disponible para Angular

## 🔧 Pasos de Desarrollo

### 1. Clonar y preparar el entorno
```bash
# Clonar repositorio
git clone https://github.com/erp-reclutamiento/prueba-frontend-Luis-Angel-Anampa-Lavado.git

# Navegar al directorio
cd prueba-frontend-Luis-Angel-Anampa-Lavado/Modulo-ERP

# Instalar dependencias
npm install

# Instalar JSON Server globalmente
npm install -g json-server
```

### 2. Ejecutar JSON Server (OBLIGATORIO)
```bash
# En la raíz del proyecto
cd assets
json-server --watch db.json --port 3000
```

### 3. Ejecutar Angular
```bash
# En otra terminal
npm run start
```

### 4. Acceder a la aplicación
```
http://localhost:4200
```

## 📝 Notas Importantes

- **API Fake**: El sistema consume ÚNICAMENTE del puerto 3000
- **Filtros**: Completamente funcionales
- **Arquitectura**: Angular 19 standalone con mejores prácticas
- **Autenticación**: JWT simulado con localStorage
