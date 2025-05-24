# syntax=docker/dockerfile:1.16.0-labs
FROM node:22.14.0-slim

ENV APP_HOME=/home/app

RUN mkdir -p $APP_HOME/node_modules && chown -R node:node $APP_HOME

WORKDIR $APP_HOME

COPY package.json ./
COPY --parents web/*/package.json .

RUN npm install

COPY watt.json ./
COPY web ./web

RUN npm run build

COPY docker-run-all.sh ./
RUN chmod +x ./docker-run-all.sh

EXPOSE 3042 4042

CMD [ "./docker-run-all.sh" ]

# EXPOSE 3042
# CMD [ "npm", "start" ]
