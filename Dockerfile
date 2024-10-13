# Etapa 1: Construir el cliente (Vite)
FROM node:16 AS build-client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Etapa 2: Configurar el servidor (Node.js + Express)
FROM node:16 AS build-server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
COPY --from=build-client /app/client/dist ./public

# Exponer el puerto que el servidor utilizará
EXPOSE 3000

# Iniciar el servidor
CMD ["npm", "run", "start"]