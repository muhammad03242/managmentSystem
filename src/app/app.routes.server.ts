import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes - can be prerendered at build time
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'employees',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'employees/add',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'attendance',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'attendance/mark',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'leave',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'leave/apply',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'transfers',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'transfers/add',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'reports',
    renderMode: RenderMode.Prerender
  },
  // Dynamic routes - use SSR (Server-Side Rendering) at request time
  {
    path: 'employees/edit/:id',
    renderMode: RenderMode.Server
  },
  // Fallback for any other routes
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
