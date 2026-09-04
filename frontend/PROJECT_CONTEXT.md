# Legality MVP - Project Context

## 1. Component Registry
- `src/main.jsx`: Application entry point.
- `src/App.jsx`: Main application component, handles routing between Landing and Translate.
- `src/index.css`: Global styles, Tailwind directives, custom CSS variables.
- `src/components/Navbar.jsx`: Top navigation bar (Logo, links, Launch App CTA).
- `src/pages/Landing.jsx`: The minimalist modern landing page.
- `src/pages/Translate.jsx`: The core workspace routing wrapper.
- `src/components/Dropzone.jsx`: Drag-and-drop file upload zone.
- `src/components/ResultViewer.jsx`: Side-by-side original/translated document preview.

## 2. Active Routing & State Contracts
- **Routes**:
  - `/` -> `Landing` component.
  - `/translate` -> `Translate` workspace component.
- **Translate State**:
  - `file`: Selected file object or null.
  - `sourceLang`: Selected source language (default "English").
  - `targetLang`: Selected target language (default "Chinese (Simplified)").
  - `docType`: Segmented control value (Standard, Scanned OCR, Image Translation).
  - `status`: 'idle' | 'uploading' | 'translating' | 'done'.

## 3. Implementation Checklist
- [x] Initialize project (Vite + React)
- [x] Install Tailwind CSS and lucide-react
- [x] Create PROJECT_CONTEXT.md
- [x] Configure `tailwind.config.js` and `index.css`
- [x] Implement Routing in `App.jsx`
- [x] Build `Navbar.jsx`
- [x] Build `Landing.jsx`
- [x] Build `Translate.jsx` (Matching BluTranslate reference image)
  - [x] Build `Dropzone.jsx`
  - [x] Build Configuration controls (Dropdowns, Tabs)
  - [x] Build `ResultViewer.jsx`

## 4. Handoff Snapshot
Initial project setup and all UI components have been successfully built. The application supports routing, has a landing page with mockups, and a fully functional (mocked) translation workspace mirroring the BluTranslate reference. The development server is ready to be started.
