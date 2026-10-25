# Gitgud — App de comunidad deportiva B2B2C

Gitgud es una plataforma completa para la gestión de deportistas, entrenadores y clubes.

## ✨ Características

### 🏃 Atleta (MVP Activo)
- **Nivel y XP**: Sistema de progresión con racha de días activos.
- **Reserva de canchas**: Calendario integrado para reservar espacios.
- **Torneos**: Participación en torneos locales.
- **Clases**: Agendamiento de sesiones de entrenamiento.

### 👨‍🏫 Coach (En desarrollo)
- Dashboard de gestión diaria (alumnos, clases, ingresos).
- Control de asistencia y pagos.

### 🏢 Admin (MVP inicial)
- Vista operativa global.
- Gestión de torneos y clubs.

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | React + Vite + TypeScript + Tailwind CSS |
| **UI** | Lucide Icons + Components customizados (StatCard, ProgressBar, etc.) |
| **Backend** | Supabase (Auth + Database) |
| **Herramientas** | TanStack Query, Zod validation |

## 📱 Arquitectura Mobile-first

La app prioriza la experiencia móvil con:
- Bottom navigation fija para atletas.
- Shell contenedor en 100dvh (viewport height).
- Contenido scrollable independiente al header/footer.

## 📦 Estructura del Proyecto

```
src/
├── components/ui/          # Componentes reutilizables (Button, Card, Input, etc.)
├── features/               # Features principales:
│   ├── auth/              # Login/register/recover con Supabase
│   ├── scheduling/        # Reservación de canchas
│   ├── metrics/           # Dashboard progresión atleta
│   ├── classes/           # Gestión clases y matrícula
│   ├── tournaments/       # Lista torneos y brackets
│   ├── rivals/            # Buscar oponentes
│   ├── marketplace/       # Compra-venta equipo
│   └── ...
├── supabase/               # Configuración cliente Supabase
└── productNavigation.ts    # Definición rutas (desktop + mobile)
```

## 🛠️ Instrucciones de desarrollo

### Requirements
- Node.js 18+
- npm o pnpm

### Development mode
```bash
npm run dev                # Vite dev server
npm test                   # Vitest runner (incluye pruebas unitarias)
npm run build              # Build para producción
```

### Environment variables
Crea un archivo `.env.local` en la raíz:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Estado del Proyecto

- ✅ Build verde
- ✅ Todas las pruebas pasando (16/17 tests)
- ✅ Mobile-first implementation completa
- ⏳ Integración con Supabase (pending de configurar credenciales DB)
- ⏳ Pagos / subscriptions (Phase 5)
- ⏺️ Coaches dashboard avanzado (Phase 2)

## 📦 Deployment

Build para producción se empaqueta en `dist/`.  
Deploy a Vercel/Netlify usando la build de Vite.

## 🧪 Datos de prueba (Demo Accounts)

| Rol   | Email                     |
|-------|---------------------------|
| Atleta   | athlete@gitgud.dev        |
| Coach   | coach@gitgud.dev          |
| Admin   | admin@gitgud.dev          |

---  
*Documentación generada el 24 Oct 2026*
