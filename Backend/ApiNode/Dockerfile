# Usa una imagen oficial de Node.js
FROM node:alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install


# Copia el resto de los archivos de la aplicación
COPY app.js ./

# Expone el puerto en el que corre la app (opcional dependiendo de la app)
EXPOSE 5002

# Define el comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
