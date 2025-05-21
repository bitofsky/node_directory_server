FROM node:24.0.2-slim

WORKDIR /app

COPY /*.json /*.yaml /.env ./
COPY src ./src

RUN npx pnpm install --production --frozen-lockfile

CMD npm start
