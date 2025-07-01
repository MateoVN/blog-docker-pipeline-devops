# Usa una imagen base de Node
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto (ajustá si tu app corre en otro puerto)
EXPOSE 3000

# Comando por defecto para correr la app
CMD ["node", "app.js"]