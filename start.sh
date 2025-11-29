#!/bin/sh

# Intentar aplicar migraciones
echo "Aplicando migraciones de base de datos..."
npx prisma migrate deploy

# Iniciar la aplicación
echo "Iniciando servidor..."
node server.js
