FROM node:14.17.0-alpine3.10

WORKDIR /usr/src/app


COPY package.json ./
RUN yarn global add cross-env

RUN yarn install
COPY . .
RUN yarn run build

RUN yarn global add serve
CMD [ "serve", "-l", "3000","-s" ,"build"]