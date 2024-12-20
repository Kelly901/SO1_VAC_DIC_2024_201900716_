# Usar la imagen oficial de MySQL como base
FROM mysql:8.0

# Establecer la contraseña del usuario root (esto también puede pasarse como variable de entorno)
ENV MYSQL_ROOT_PASSWORD=1234

# Copiar tu script SQL de inicialización al directorio de inicialización de MySQL
# Esto ejecutará automáticamente el script cuando se inicie el contenedor por primera vez
COPY ./Script.sql /docker-entrypoint-initdb.d/

# Exponer el puerto de MySQL
EXPOSE 3306

# El contenedor MySQL ya viene con un entrypoint predefinido, así que no es necesario hacerlo explícitamente
# El entrypoint de MySQL se encargará de iniciar el servidor de MySQL
