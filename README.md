# Linkd - Tarjetas Digitales NFC

Aplicación web para administrar tarjetas de presentación digitales NFC.

## Características

- **Admin Panel**: Crear nuevas tarjetas con códigos de acceso únicos
- **Portal Cliente**: Los clientes ingresan con su código de 3 caracteres
- **Editor Visual**: Personalizar foto, datos de contacto y degradado de fondo
- **Tarjeta Pública**: Vista optimizada para móvil con botones de contacto
- **Exportar VCF**: Botón "Guardar Contacto" genera archivo vCard

## Stack Tecnológico

- **Frontend**: Next.js 16 con App Router
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Estilos**: CSS Vanilla con diseño premium
- **Deployment**: Docker (Dockploy)

## Despliegue en Dockploy

### 1. Crear Base de Datos PostgreSQL

En Dockploy, crea un nuevo servicio de base de datos PostgreSQL.

### 2. Crear Aplicación desde GitHub

1. Conecta tu repositorio de GitHub
2. Selecciona este proyecto
3. Dockploy detectará automáticamente el `Dockerfile`

### 3. Configurar Variables de Entorno

En la configuración de la aplicación, agrega:

```
DATABASE_URL=postgresql://usuario:password@host:5432/nombre_db
```

Usa la URL de conexión interna que te proporciona Dockploy para tu base de datos PostgreSQL.

### 4. Desplegar

Haz clic en "Deploy". El script `start.sh` se encargará de:
- Aplicar las migraciones de base de datos automáticamente
- Iniciar el servidor

## Desarrollo Local

Para desarrollo local, necesitas PostgreSQL instalado o usar Docker:

```bash
# Instalar dependencias
npm install

# Configurar variable de entorno
echo 'DATABASE_URL="postgresql://usuario:password@localhost:5432/linkd"' > .env

# Generar cliente Prisma
npx prisma generate

# Aplicar migraciones
npx prisma migrate dev

# Iniciar servidor de desarrollo
npm run dev
```

## Rutas

- `/` - Página principal
- `/admin` - Panel de administración (crear tarjetas)
- `/login` - Portal de acceso para clientes
- `/edit` - Editor de tarjeta (requiere login)
- `/card/[slug]` - Vista pública de la tarjeta

## Estructura del Proyecto

```
├── src/
│   ├── app/
│   │   ├── admin/          # Panel admin
│   │   ├── login/          # Login de clientes
│   │   ├── edit/           # Editor de tarjeta
│   │   ├── card/[slug]/    # Vista pública
│   │   ├── actions.ts      # Server Actions
│   │   └── globals.css     # Estilos globales
│   └── lib/
│       └── prisma.ts       # Cliente Prisma
├── prisma/
│   └── schema.prisma       # Schema de base de datos
├── Dockerfile              # Configuración Docker
└── start.sh                # Script de inicio
```

## Licencia

MIT
