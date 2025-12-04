# 🧬 LIS - FASE I: Hematología, Inmunología y Bioquímica

Proyecto web basado en **Next.js** para la implementación de la Fase I de un  
**Sistema de Información de Laboratorio (LIS)**, cubriendo el flujo completo
desde la admisión del paciente hasta la emisión de reportes, para las áreas de:

- Hematología  
- Inmunología  
- Bioquímica  

---

## 🎯 Objetivo de la Fase I

Implementar un LIS que permita:

- Registrar pacientes y emitir órdenes de laboratorio.
- Gestionar el flujo de muestras y su trazabilidad.
- Ingresar y validar resultados (manuales y por integración HL7).
- Generar reportes clínicos formales en PDF.
- Proveer reportes gerenciales para la toma de decisiones.

---

## 🧩 Módulos Funcionales

### 1. ⚙️ Configuración Maestra

Base de datos de configuración del LIS:

- **Catálogo de Analitos**  
  - Código único, nombre, unidad estándar, área (BIOQUÍMICA, HEMATOLOGÍA, etc.), tipo de muestra.  
- **Catálogo de Perfiles**  
  - Agrupación de analitos (p.ej. PERFIL LIPÍDICO, HEMOGRAMA COMPLETO).  
- **Valores de Referencia Condicionales**  
  - Rangos por sexo, edad, condición (ayuno, etc.).  
- **Catálogo de Instrumentos**  
  - Equipos, protocolos de comunicación (HL7), puertos, etc.

### 2. 📋 Admisión y Órdenes

Gestión de la solicitud de exámenes:

- Registro de pacientes y datos demográficos.
- Emisión de órdenes con número único y fecha de ingreso.
- Selección de exámenes y perfiles desde el catálogo maestro.
- Registro de procedencia, servicio y cobertura.
- Impresión de etiquetas con código de barras (número de orden, paciente, muestra).

### 3. 🧪 Gestión de Muestras y Trazabilidad

- Registro de recepción de muestra (fecha/hora, escaneo de código de barras).
- Vista de trazabilidad tipo “semáforo” (pendiente, en proceso, validado, etc.).
- Gestión de rechazo de muestras con motivo (ej. muestra hemolizada).

### 4. 💻 Resultados (Módulo Analítico)

- Ingreso manual de resultados con validación automática vs. valores de referencia.
- Importación de resultados via HL7 desde equipos automatizados.
- Edición controlada de resultados antes de la validación.
- Pista de auditoría (usuario, fecha/hora, valor anterior/nuevo).
- Validación técnica por bioquímico / supervisor.

### 5. 🖨️ Reportes y Documentos

- Generación de **Reporte Final en PDF**:
  - Datos del paciente, resultados, unidades, rangos de referencia aplicados.
  - Datos del profesional autorizador (CMP, CTMP, etc.).
- Resaltado automático de resultados anormales.
- Histórico integrado de resultados por paciente.
- Reportes gerenciales por fecha, servicio, médico, tipo de estudio, etc.

### 6. 🛡️ Seguridad y Permisos

Perfiles de usuario:

- **Recepcionista / Admisión**: crear órdenes, imprimir etiquetas, consultar órdenes.  
- **Analista**: recepción de muestra, ingreso de resultados, edición pre-validación.  
- **Bioquímico / Supervisor**: validación técnica, gestión de catálogos, reportes gerenciales, anulación/corrección de reportes.

---

## 🛠️ Stack Tecnológico

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- React
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimización de fuentes
- Otras librerías a definir para:
  - Manejo de formularios
  - Grillas de datos
  - Generación de PDF
  - Integración con API/LIS backend

---

## 🚀 Puesta en marcha (Desarrollo)

Primero, instala las dependencias:

```bash
npm install
# o
yarn
# o
pnpm install
# o
bun install
