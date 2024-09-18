// index.tsx
import './letra.css'
import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './App'; // Asegúrate de que la ruta es correcta y el archivo se llame AppRoutes.tsx

// Encuentra el elemento raíz en el DOM
const rootElement = document.getElementById('root');

if (rootElement) {
  // Crea el root y renderiza el componente
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </StrictMode>
  );
} else {
  console.error('El elemento raíz no se encontró.');
}
