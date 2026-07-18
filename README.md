# Ynera

Sitio de Ynera — consultoría de IA, datos y seguridad para PyMEs.
Hero cinematográfico con scroll, fondo vivo con Ys fantasma, carrusel de sistemas en producción.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 3.4 + shadcn/ui
- Tipografías: Geist Sans (cuerpo) + General Sans (display, Fontshare)

## Desarrollo

```bash
npm ci        # instalar dependencias
npm run dev   # servidor de desarrollo (http://localhost:5173)
```

## Build de producción

```bash
npm run build    # compila a dist/
npm run preview  # sirve el build localmente
```

## Deploy en Railway

El proyecto está listo para Railway (sitio estático servido con `serve`).

1. **Conectá el repo** en [railway.app](https://railway.app) → *New Project* → *Deploy from GitHub repo* → elegí `Memu007/ynera4`.
2. Railway detecta la configuración automáticamente:
   - **Build**: `npm ci && npm run build` (vía Nixpacks)
   - **Start**: `npm start` → `serve dist -s -l $PORT`
3. No requiere variables de entorno.

Archivos de configuración incluidos:
- `railway.json` — builder Nixpacks + comandos de build/start
- `nixpacks.toml` — Node 20, install, build, start

### Deploy manual (alternativa con Railway CLI)

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```
