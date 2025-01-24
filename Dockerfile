FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY web/remix/package*.json ./web/remix/
RUN cd web/remix && npm install

COPY . .

RUN npm run build

ENV PORT=3042
ENV API_URL=http://127.0.0.1:3042/api

EXPOSE 3000

CMD ["npm", "run", "dev"]