FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# Usamos install si ci da problemas por cambios de versión
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
