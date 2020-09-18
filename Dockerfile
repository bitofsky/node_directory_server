# typescript compile
FROM node:14.10.1-alpine as tsc

WORKDIR /app

COPY /*.json ./
COPY src src 

RUN npm ci
RUN npm run build

# nodejs runtime build
FROM node:14.10.1-alpine

WORKDIR /app

COPY --from=tsc /app/dist ./dist
COPY /*.json /.env ./

RUN npm ci --production

CMD npm start
