# Frontend del E-commerce "MercadoFake"

Este es el repositorio del frontend para el proyecto de e-commerce "MercadoFake". Este frontend permite a los usuarios navegar, buscar productos, gestionar sus compras y más. Está construido utilizando React y tecnologías modernas para una experiencia rápida y responsiva.

## Tecnologías utilizadas

Este frontend se desarrolló utilizando las siguientes tecnologías:

- **React**: Biblioteca para la creación de interfaces de usuario.
- **React Router DOM**: Manejo de rutas dinámicas en la aplicación.
- **Vite**: Herramienta de desarrollo rápida para proyectos de frontend.
- **FontAwesome**: Iconos y gráficos vectoriales personalizables.
- **Netlify**: Plataforma para el despliegue del frontend.

## Características principales

- Diseño responsivo para dispositivos móviles y de escritorio.
- Navegación entre distintas categorías de productos.
- Carrito de compras dinámico.
- Conexión con el backend para autenticación, manejo de productos y órdenes.
- Uso de íconos modernos con FontAwesome.

## Estructura del proyecto

```
frontend/
├── src/
│   ├── assets/          # Archivos estáticos como imágenes y estilos
│   ├── components/      # Componentes reutilizables de la UI
│   ├── pages/           # Páginas principales de la aplicación
│   ├── router/          # Configuración de rutas de React Router
│   ├── styles/          # Archivos de estilo (CSS o CSS-in-JS)
│   └── main.jsx         # Punto de entrada principal
├── public/              # Archivos estáticos públicos
├── .env                 # Variables de entorno (no incluido en el repositorio)
├── package.json         # Dependencias y scripts
└── README.md            # Documentación del frontend
```

## URL del Frontend Desplegado

El frontend de este proyecto está desplegado y accesible públicamente en la siguiente URL:

**[https://melifakecommerce.netlify.app/](https://melifakecommerce.netlify.app/)**

Utiliza esta URL para interactuar con el frontend.

## Configuración inicial

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/mercadofake-frontend.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:
   ```env
   VITE_API_URL=https://mercadofake-backend.onrender.com
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Accede a la aplicación en [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run preview`: Previsualiza la aplicación optimizada.

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Puedes ver más detalles en el archivo `LICENSE` incluido en este repositorio.

---

¡Gracias por usar el frontend de MercadoFake! Si tienes preguntas o problemas, no dudes en abrir un issue en el repositorio o contactarnos.
