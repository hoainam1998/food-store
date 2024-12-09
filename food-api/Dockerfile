FROM node:22-alpine

WORKDIR /food

ARG NAME='start:dev'
ARG TSCONFIG
ARG CLI

ENV ENV_NAME $NAME
ENV ENV_TSCONFIG $TSCONFIG
ENV ENV_CLI $CLI

COPY prisma ./
COPY package.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run ${ENV_NAME} -- ${ENV_CLI} ${ENV_TSCONFIG} --watch"]
